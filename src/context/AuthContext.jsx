import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, deleteDoc, serverTimestamp,
  collection, query, where, getDocs,
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

// Makes sure every signed-in user has a matching public member profile
// doc (members/{uid}). Runs on every auth state change; it's a single
// read plus a write only the first time, so it's cheap after that.
async function ensureMemberProfile(user) {
  if (!user) return;
  const ref = doc(db, 'members', user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  const name = user.displayName || 'HR Wall Member';
  await setDoc(ref, {
    uid: user.uid,
    name,
    designation: '',
    company: '',
    city: '',
    domain: '',
    experienceYears: '',
    bio: '',
    skills: [],
    experienceList: [],
    badges: ['Community Member'],
    verified: false,
    forHire: false,
    // New profiles are hidden from the public directory until an
    // admin approves them — see HrMemberDirectory / AdminPanel.
    status: 'pending',
    reputationScore: 750,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

const AuthContext = createContext(null);

// Turns Firebase's error codes into copy a person actually wants to read.
function friendlyAuthError(error) {
  const code = error?.code || '';
  const map = {
    'auth/invalid-email': 'That email address doesn\u2019t look right.',
    'auth/user-disabled': 'This account has been disabled. Contact support if that seems wrong.',
    'auth/user-not-found': 'No account found with that email. New here? Use "Sign up" below.',
    'auth/wrong-password': 'That password doesn\u2019t match this email.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/email-already-in-use': 'An account already exists with that email. Try signing in instead.',
    'auth/weak-password': 'Use at least 6 characters for your password.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/popup-closed-by-user': 'Google sign-in was closed before finishing.',
    'auth/network-request-failed': 'Network error — check your connection and try again.',
    'auth/requires-recent-login': 'For your security, please re-authenticate and try again.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

// Deletes everything owned by a member doc — their profile, plus any
// feed posts and job listings they created — so nothing is left
// orphaned under a uid that no longer has an account.
async function deleteOwnedData(uid) {
  const postsSnap = await getDocs(query(collection(db, 'posts'), where('authorId', '==', uid)));
  const jobsSnap = await getDocs(query(collection(db, 'jobs'), where('postedBy', '==', uid)));
  await Promise.all([
    ...postsSnap.docs.map((d) => deleteDoc(d.ref)),
    ...jobsSnap.docs.map((d) => deleteDoc(d.ref)),
  ]);
  await deleteDoc(doc(db, 'members', uid));
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user) ensureMemberProfile(user);
    });
    return unsubscribe;
  }, []);

  async function signup(name, email, password) {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(user, { displayName: name });
      }
      return { user };
    } catch (error) {
      return { error: friendlyAuthError(error) };
    }
  }

  async function login(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return { user };
    } catch (error) {
      return { error: friendlyAuthError(error) };
    }
  }

  async function loginWithGoogle() {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      return { user };
    } catch (error) {
      // Silently ignore the user just closing the popup — not a real error.
      if (error?.code === 'auth/popup-closed-by-user') return {};
      return { error: friendlyAuthError(error) };
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { error: friendlyAuthError(error) };
    }
  }

  async function logout() {
    await signOut(auth);
  }

  // Permanently deletes the signed-in user's account: their profile
  // doc, their posts/job listings, and their Firebase Auth account.
  // Firebase requires a *recent* login before it will allow account
  // deletion, so we re-authenticate first — via a fresh Google popup
  // for Google users, or the user's password for email/password users.
  async function deleteAccount({ password } = {}) {
    const user = auth.currentUser;
    if (!user) return { error: 'You need to be signed in to do that.' };

    const providerId = user.providerData?.[0]?.providerId;

    try {
      if (providerId === 'google.com') {
        await reauthenticateWithPopup(user, googleProvider);
      } else {
        if (!password) return { error: 'Enter your password to confirm.' };
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      }
    } catch (error) {
      if (error?.code === 'auth/popup-closed-by-user') {
        return { error: 'Re-authentication was cancelled — your account was not deleted.' };
      }
      return { error: friendlyAuthError(error) };
    }

    try {
      await deleteOwnedData(user.uid);
      await deleteUser(user);
      return { success: true };
    } catch (error) {
      return { error: friendlyAuthError(error) };
    }
  }

  const value = {
    currentUser,
    authLoading,
    signup,
    login,
    loginWithGoogle,
    resetPassword,
    logout,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an <AuthProvider>');
  return ctx;
}
