// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAARCaYd3eagX1hpc7uBhGq2ogy_yKzM_g",
  authDomain: "find-roomate-app-d0fce.firebaseapp.com",
  projectId: "find-roomate-app-d0fce",
  storageBucket: "find-roomate-app-d0fce.firebasestorage.app",
  messagingSenderId: "876283756861",
  appId: "1:876283756861:web:f0f0bdad11e4640c954554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);