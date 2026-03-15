// almas.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // <-- ADD THIS

  const firebaseConfig = {
    apiKey: "AIzaSyDAGnb1jEeQsflDAOgz1iHFQ9wFHqruV_A",
    authDomain: "almas-99702.firebaseapp.com",
    projectId: "almas-99702",
    storageBucket: "almas-99702.firebasestorage.app",
    messagingSenderId: "184764147406",
    appId: "1:184764147406:web:b927c15939f6a7931ed29f",
    measurementId: "G-TG7S9FNGCJ"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // <-- ADD THIS