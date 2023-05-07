// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNda3Rh6TiM71rro71gXhWDrHCTNoW1IM",
  authDomain: "fir-task-6e0a7.firebaseapp.com",
  projectId: "fir-task-6e0a7",
  storageBucket: "fir-task-6e0a7.appspot.com",
  messagingSenderId: "1009250513456",
  appId: "1:1009250513456:web:b3b2914385ff85239f73f5",
  measurementId: "G-YH3W69S2V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
