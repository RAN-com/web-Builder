// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase Config (Replace with your Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyAmLlHeOgH573DVu_jaUHUyt1sGrQL97gc",
    authDomain: "lavanya-608c2.firebaseapp.com",
    projectId: "lavanya-608c2",
    storageBucket: "lavanya-608c2.firebasestorage.app",
    messagingSenderId: "600900008122",
    appId: "1:600900008122:web:7a34ecb32ceca127e36a83",
    measurementId: "G-FYKK0SW1C7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firebase utilities
export { db, collection, addDoc, getDocs };
