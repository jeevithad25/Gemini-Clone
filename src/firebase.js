import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAz9HNP9t1ANniMQGwn66SzHY5EVKEwQ8c",
  authDomain: "gemini-clone-535a1.firebaseapp.com",
  projectId: "gemini-clone-535a1",
  storageBucket: "gemini-clone-535a1.firebasestorage.app",
  messagingSenderId: "400337052682",
  appId: "1:400337052682:web:3e5ef8f948dd01c8552bf3",
  measurementId: "G-N006WCY8JT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };