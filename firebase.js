
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// BAKACREW FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyDo97is_j55hGgFgFF11eWOy_7-CFTZfbk",
  authDomain: "bakacrew-community-9493d.firebaseapp.com",
  projectId: "bakacrew-community-9493d",
  storageBucket: "bakacrew-community-9493d.firebasestorage.app",
  messagingSenderId: "917477162093",
  appId: "1:917477162093:web:d4e8510d79aac308c99364",
  measurementId: "G-GX4S63W2W6"
};

// INITIALIZE FIREBASE
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// SERVICES
const auth = getAuth(app);
const db = getFirestore(app);

// EXPORT FIREBASE SERVICES
export {
  app,
  auth,
  db,

  // Authentication
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,

  // Firestore
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment
};
