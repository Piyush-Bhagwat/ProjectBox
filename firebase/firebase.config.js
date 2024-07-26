import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDm8G1LNCJNdGn8ta4Azi4_gVlh-9jO9cY",
    authDomain: "projectbox-4351b.firebaseapp.com",
    projectId: "projectbox-4351b",
    storageBucket: "projectbox-4351b.appspot.com",
    messagingSenderId: "129821767578",
    appId: "1:129821767578:web:a9fd2457cc2f5bb978ec23",
};

//branch created piyush

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const userCollection = collection(db, "users");
export const postCollection = collection(db, "posts");

export const mediaRef = ref(storage, "media");
