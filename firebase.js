import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// Reuse the existing BakaCrew Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyDo97is_j55hGgFgFF11eWOy_7-CFTZfbk",
  authDomain: "bakacrew-community-9493d.firebaseapp.com",
  projectId: "bakacrew-community-9493d",
  storageBucket: "bakacrew-community-9493d.firebasestorage.app",
  messagingSenderId: "917477162093",
  appId: "1:917477162093:web:d4e8510d79aac308c99364",
  measurementId: "G-GX4S63W2W6"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, serverTimestamp };