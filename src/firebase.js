import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Every value below is read from your .env file (copy .env.example to .env
// and fill these in from Firebase Console → Project Settings → General →
// "Your apps" → SDK setup and configuration). Nothing here is a secret that
// needs hiding from the browser — Firebase web config is meant to be public;
// your actual security lives in Firebase Auth settings + Firestore/Storage
// rules, not in keeping this object private.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
// Forces the account chooser every time instead of silently reusing the
// last Google account signed into the browser — clearer for shared machines.
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
