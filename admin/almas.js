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





// =========================================
// 1. ALMAS GLOBAL LOADER SYSTEM
// =========================================

// Global function to hide and destroy the loader
window.hideAlmasLoader = function() {
    const globalLoader = document.getElementById('almas-loader');
    
    if (globalLoader && !globalLoader.classList.contains('hidden')) {
        // Small delay so the user actually sees the smooth animation
        setTimeout(() => {
            globalLoader.classList.add('hidden');
            
            // Clean up the DOM by removing the element entirely after the fade out
            setTimeout(() => {
                if (globalLoader.parentNode) {
                    globalLoader.remove();
                }
            }, 600);
        }, 400); 
    }
};

// Fallback: Automatically hide the loader when the window fully loads 
// if it hasn't been hidden by a Firebase script already.
window.addEventListener('load', () => {
    setTimeout(() => {
        if (document.getElementById('almas-loader')) {
            window.hideAlmasLoader();
        }
    }, 800); // 800ms gives Firebase time to trigger it first on dynamic pages
});






