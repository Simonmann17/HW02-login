// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn-8qkDruNvYTubNogEfvSTlxTdwksc14",
  authDomain: "hw02-simon.firebaseapp.com",
  projectId: "hw02-simon",
  storageBucket: "hw02-simon.appspot.com",
  messagingSenderId: "749908178592",
  appId: "1:749908178592:web:0f06d08a5a8763158efbc5",
  measurementId: "G-DC6PK03EQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

