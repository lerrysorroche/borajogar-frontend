import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxUnc5_QRNuSb-qEF-85uXue2eD_11YgE",
  authDomain: "bora-jogar-ba221.firebaseapp.com",
  projectId: "bora-jogar-ba221",
  storageBucket: "bora-jogar-ba221.firebasestorage.app",
  messagingSenderId: "229944269493",
  appId: "1:229944269493:web:6326ef230b84384dc33cfc",
  measurementId: "G-4W9M3L4SEW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();