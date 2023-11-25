// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB045m-nVQpEQhYwVAzprRe_0zArQrMnN4",
  authDomain: "e-commerce-e515a.firebaseapp.com",
  projectId: "e-commerce-e515a",
  storageBucket: "e-commerce-e515a.appspot.com",
  messagingSenderId: "461037220463",
  appId: "1:461037220463:web:e3fc346fedbb3c6e57939a",
  measurementId: "G-5MHYDWPPPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const Storage=getStorage(app);


export {
    auth,Storage
}