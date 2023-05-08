// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlPgnxaUiKvMfbjZudpWL27rRDSFLt3do",
  authDomain: "station-manage.firebaseapp.com",
  projectId: "station-manage",
  storageBucket: "station-manage.appspot.com",
  messagingSenderId: "158477470500",
  appId: "1:158477470500:web:66aef670fae5891ce9c1b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
