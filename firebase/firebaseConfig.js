import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVz1iI5z_l0f30mg0IS3oye-twxd4p1OA",
  authDomain: "mamatienda-a7d3c.firebaseapp.com",
  projectId: "mamatienda-a7d3c",
  storageBucket: "mamatienda-a7d3c.appspot.com",
  messagingSenderId: "125627252310",
  appId: "1:125627252310:web:a3eef4451045a60a5685f7",
  measurementId: "G-FRJ4SRF1QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app)
const auth = getAuth(app);


export {db, storage,auth}