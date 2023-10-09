// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCqpioWQzz2jKbJBETAL9EiMymgroyJdrg",
	authDomain: "notes-app-2128b.firebaseapp.com",
	projectId: "notes-app-2128b",
	storageBucket: "notes-app-2128b.appspot.com",
	messagingSenderId: "383683100709",
	appId: "1:383683100709:web:f29925837cf2436d7dffcc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
