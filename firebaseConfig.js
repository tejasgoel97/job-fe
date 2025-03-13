// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEENQF8zCnR-ZlgfHEpH30czKqdGWvwDs",
  authDomain: "job-project-15ec5.firebaseapp.com",
  projectId: "job-project-15ec5",
  storageBucket: "job-project-15ec5.firebasestorage.app",
  messagingSenderId: "364953955759",
  appId: "1:364953955759:web:6a45e07aee42e01441135a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
