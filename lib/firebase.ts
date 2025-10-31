// Import Firebase core functionality
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase configuration
function getFirebaseConfig() {
  const requiredVars = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  } as const;

  const missing = Object.entries(requiredVars)
    .filter(([_, v]) => !v || String(v).trim().toLowerCase() === 'undefined')
    .map(([k]) => k);

  if (missing.length > 0) {
    throw new Error(
      `Firebase env faltando/invalidos: ${missing.join(', ')}. ` +
      `Defina-os nas variáveis de ambiente da Vercel (Project Settings → Environment Variables) e faça novo deploy.`
    );
  }

  return {
    apiKey: requiredVars.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: requiredVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: requiredVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: requiredVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: requiredVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: requiredVars.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

const firebaseConfig = getFirebaseConfig();

// Initialize Firebase only once (avoids "app already exists" errors)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
