// Import the functions you need from the SDKs you need
import { initializeApp,get } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-ON83xakqP2u-YTkIdOuDHM_QCEJdgJo",
  authDomain: "bookstore-64555.firebaseapp.com",
  projectId: "bookstore-64555",
  storageBucket: "bookstore-64555.appspot.com",
  messagingSenderId: "924622826157",
  appId: "1:924622826157:web:ee37a39d6e6af9f3a83424",
  measurementId: "G-0FKMP19ZMC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;