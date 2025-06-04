import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwzF7mytB3PELSwvy_VO5uhUxmZGXysGg",
  authDomain: "reactlinks-334bb.firebaseapp.com",
  projectId: "reactlinks-334bb",
  storageBucket: "reactlinks-334bb.firebasestorage.app",
  messagingSenderId: "342998044635",
  appId: "1:342998044635:web:760426f45e74d1c16721fe"
};


const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)
const db = getFirestore(app)

export {Auth, db}