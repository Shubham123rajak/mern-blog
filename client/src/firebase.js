// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-adae9.firebaseapp.com",
    projectId: "mern-blog-adae9",
    storageBucket: "mern-blog-adae9.appspot.com",
    messagingSenderId: "163109354917",
    appId: "1:163109354917:web:d13bfcfed3f7aeaa2d7c4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);