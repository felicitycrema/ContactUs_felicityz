import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDl7TmQrFPSq0du-Y6A7h1V-_Sd34-LdJA",
  authDomain: "q3contacts-3b8ad.firebaseapp.com",
  projectId: "q3contacts-3b8ad",
  storageBucket: "q3contacts-3b8ad.appspot.com",
  messagingSenderId: "288505507371",
  appId: "1:288505507371:web:1191fb7fc574c978f3c46e",
  measurementId: "G-EYMVBH77CQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };