import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// firebase config
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyDmVrPe3VCS8s2Lg5t9HYM4SNkyLpe6PFM",
  authDomain: "task-management-f44b1.firebaseapp.com",
  projectId: "task-management-f44b1",
  storageBucket: "task-management-f44b1.appspot.com",
  messagingSenderId: "1008121154750",
  appId: "1:1008121154750:web:117ae3841e156294b8a2ef",
  measurementId: "G-LS2G9CMCJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Firebase storage reference
export const storage = getStorage(app);

// firebase db
const db = getFirestore(app);

export default db;