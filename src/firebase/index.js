// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX93x4fLrn4Mj30pr3obdazQs-0k_dfyM",
  authDomain: "turtle-chat256.firebaseapp.com",
  projectId: "turtle-chat256",
  storageBucket: "turtle-chat256.appspot.com",
  messagingSenderId: "591652714873",
  appId: "1:591652714873:web:1618486601d606ad9c97a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage =  getStorage(app)

export {auth, db, storage}