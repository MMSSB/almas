// auth.js
import { auth, db } from "./almas.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- GENERIC SIGNUP FUNCTION ---
async function handleSignup(e, role) {
    e.preventDefault();
    const prefix = role === 'seller' ? 'seller' : 'signup';
    
    const name = document.getElementById(`${prefix}-name`).value;
    const email = document.getElementById(`${prefix}-email`).value;
    const password = document.getElementById(`${prefix}-password`).value;
    const confirmPassword = document.getElementById(`${prefix}-confirm`).value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            fullName: name,
            email: email,
            role: role, // Saves as 'customer' or 'seller'
            createdAt: serverTimestamp()
        });

        alert("Account created successfully!");
        window.location.href = role === 'seller' ? "dashboard.html" : "index.html";

    } catch (error) {
        console.error("Signup Error:", error);
        alert(error.code === 'auth/email-already-in-use' ? "This email is already registered." : error.message);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Try Again';
    }
}

// Attach Listeners
const signupForm = document.getElementById('signup-form');
if (signupForm) signupForm.addEventListener('submit', (e) => handleSignup(e, 'customer'));

const signupSellerForm = document.getElementById('signup-seller-form');
if (signupSellerForm) signupSellerForm.addEventListener('submit', (e) => handleSignup(e, 'seller'));

// --- HANDLE LOGIN (Works for both Buyers and Sellers) ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "index.html"; 
        } catch (error) {
            console.error("Login Error:", error);
            alert("Invalid email or password.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Log In <i class="fa-solid fa-arrow-right-to-bracket"></i>';
        }
    });
}