// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAzqnZeuWcbgqOGTyfCCX2Ei0Mddl_pDs",
  authDomain: "heavenly-af777.firebaseapp.com",
  projectId: "heavenly-af777",
  storageBucket: "heavenly-af777.firebasestorage.app",
  messagingSenderId: "146463304963",
  appId: "1:146463304963:web:bbcb91758bfb6da1328d36",
  measurementId: "G-7ET12WLMJJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
