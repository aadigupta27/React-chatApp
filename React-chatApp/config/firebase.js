import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD3yak9OvhBvT-4oDZhWR-PJ3Rj7Q_qxNQ",
  authDomain: "chatapp-f6ba1.firebaseapp.com",
  projectId: "chatapp-f6ba1",
  storageBucket: "chatapp-f6ba1.appspot.com",
  messagingSenderId: "967758399637",
  appId: "1:967758399637:web:7cfe778ca3ac83b737339c",
  measurementId: "G-5K2CTN1RB3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
