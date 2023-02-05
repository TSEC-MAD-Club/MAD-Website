// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRmX3Gcob7mb3ig8bIetO5lMIuz7Fr-JY",
  authDomain: "tsec-app.firebaseapp.com",
  databaseURL: "https://tsec-app.firebaseio.com",
  projectId: "tsec-app",
  storageBucket: "tsec-app.appspot.com",
  messagingSenderId: "1045382333142",
  appId: "1:1045382333142:web:ad507705bd64d313",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// const analytics = getAnalytics(app);
