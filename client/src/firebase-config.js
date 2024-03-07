import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9vrfItcmilWJOn8apSIygVtYspB9UhH8",
  authDomain: "item-scanner-1705171203367.firebaseapp.com",
  projectId: "item-scanner-1705171203367",
  storageBucket: "item-scanner-1705171203367.appspot.com",
  messagingSenderId: "702156266692",
  appId: "1:702156266692:web:80a42939cbd3249b02fd91",
  measurementId: "G-BCP0X15L8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
