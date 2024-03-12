// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCFdJm5TSSg8ecbz5mYY8ozrCkFOkyY-c",
  authDomain: "social-login-56b3c-e4784.firebaseapp.com",
  projectId: "social-login-56b3c",
  storageBucket: "social-login-56b3c.appspot.com",
  messagingSenderId: "838045300967",
  appId: "1:838045300967:web:8b43f4e60ee7ca9c1eca42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); //a variável auth contém toda info do user logado
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);