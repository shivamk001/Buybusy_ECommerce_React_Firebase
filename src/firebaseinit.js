// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6UQe52mTLj4waKlXHS6VNKdzWG1bjelk",
  authDomain: "busybuy-36db2.firebaseapp.com",
  projectId: "busybuy-36db2",
  storageBucket: "busybuy-36db2.appspot.com",
  messagingSenderId: "990632854760",
  appId: "1:990632854760:web:47e6e5e988fe264716755d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);