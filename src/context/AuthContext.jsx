import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
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
  };
  return map[code] || 'Something went wrong. Please try again.';
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

  const value = {
    currentUser,
    authLoading,
    signup,
    login,
    loginWithGoogle,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an <AuthProvider>');
  return ctx;
}
