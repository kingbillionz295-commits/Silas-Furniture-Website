// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

// Firebase Services
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


// ==============================
// Firebase Configuration
// Replace with YOUR new config
// ==============================
const firebaseConfig = {
    apiKey: "AIzaSyAPwwHeHbWYTMmb4QAKThUYZaooHeVK8W8",
    authDomain: "furniture-website-7fb1c.firebaseapp.com",
    projectId: "furniture-website-7fb1c",
    storageBucket: "furniture-website-7fb1c.firebasestorage.app",
    messagingSenderId: "248552960273",
    appId: "1:248552960273:web:02683e114cd8d300d99cb0"
  };
// ==============================
// Initialize Firebase
// ==============================
const app = initializeApp(firebaseConfig);

// ==============================
// Export Services
// ==============================
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

console.log("✅ MGE v1.0 Firebase Engine Connected");