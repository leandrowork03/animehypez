// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwzF7mytB3PELSwvy_VO5uhUxmZGXysGg",
  authDomain: "reactlinks-334bb.firebaseapp.com",
  projectId: "reactlinks-334bb",
  storageBucket: "reactlinks-334bb.firebasestorage.app",
  messagingSenderId: "342998044635",
  appId: "1:342998044635:web:760426f45e74d1c16721fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
const db = getFirestore(app)

export {Auth, db}