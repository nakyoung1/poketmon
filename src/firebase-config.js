// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyBLuaKPUsG3zw-jVVWZ_Csid8qP3zj7LPU",
     authDomain: "pokemon-cc95e.firebaseapp.com",
     projectId: "pokemon-cc95e",
     storageBucket: "pokemon-cc95e.firebasestorage.app",
     messagingSenderId: "447230144445",
     appId: "1:447230144445:web:8b1b25b8df4fb3d5c96cd4",
     measurementId: "G-P7Y5YHHMBX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
