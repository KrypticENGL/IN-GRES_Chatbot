import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC3EI_yEbB0RDUzpdvAzVRAUZhjFe-7nyM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "productionproject-24d93.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "productionproject-24d93",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "productionproject-24d93.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "464762957605",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:464762957605:web:ccdf154d9f372527c6b4cc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-05XMBDH07P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;


