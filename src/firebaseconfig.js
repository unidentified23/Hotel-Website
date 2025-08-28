// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_zpaEkCxbxC2b8jU2B1tG583Mc3lpe1M",
  authDomain: "space-paradise.firebaseapp.com",
  projectId: "space-paradise",
  storageBucket: "space-paradise.firebasestorage.app",
  messagingSenderId: "92754463453",
  appId: "1:92754463453:web:daba64c4e41e0aaf02e934",
  measurementId: "G-ETGQ93W0LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);