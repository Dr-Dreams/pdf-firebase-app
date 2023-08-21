// firebase.config.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBKc7YW9LwvEOX8AYaZF3YmAsuHsi9HVOU",
    authDomain: "pdf-firebase-database.firebaseapp.com",
    projectId: "pdf-firebase-database",
    storageBucket: "pdf-firebase-database.appspot.com",
    messagingSenderId: "1066694287924",
    appId: "1:1066694287924:web:34ada18e7b222fa95be061",
    measurementId: "G-4P813W1S3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage, db };
