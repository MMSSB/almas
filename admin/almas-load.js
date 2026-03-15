// almas-load.js
import { auth, db } from "./almas.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const navActions = document.getElementById('nav-actions-container');

    // Listen for user login state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Fetch extra user data (like Role and Name) from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.exists() ? userDoc.data() : null;
                
                let userName = userData ? userData.fullName.split(' ')[0] : "User";
                let isSeller = userData && userData.role === 'seller';

                // Build the modern logged-in UI
                navActions.innerHTML = `
                    ${isSeller ? `` : ''}
                    <div class="user-dropdown">
                        <div class="user-avatar-small" onclick="window.location.href='profile.html'"  style="cursor: pointer;">
                            <i class="fa-solid fa-circle-user"></i>
                            <span>${userName}</span>
                        </div>
                        <button id="logoutBtn" class="btn btn-outline" style="padding: 6px 15px; margin-left: 10px; font-size: 0.85rem; border-color: #ef4444; color: #ef4444;"><i class="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                `;
                // // Build the modern logged-in UI
                // navActions.innerHTML = `
                //     ${isSeller ? `<a href="post-ad.html" class="btn btn-primary glass-btn"><i class="fa-solid fa-plus"></i> Post Property</a>` : ''}
                //     <div class="user-dropdown">
                //         <div class="user-avatar-small">
                //             <i class="fa-solid fa-circle-user"></i>
                //             <span>${userName}</span>
                //         </div>
                //         <button id="logoutBtn" class="btn btn-outline" style="padding: 6px 15px; margin-left: 10px; font-size: 0.85rem; border-color: #ef4444; color: #ef4444;">Log Out</button>
                //     </div>
                // `;

                // Handle Logout
                document.getElementById('logoutBtn').addEventListener('click', () => {
                    signOut(auth).then(() => {
                        window.location.href = "index.html";
                    });
                });

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            // Build the logged-out UI
            navActions.innerHTML = `
                <a href="login.html" style="font-weight:600; margin-right:15px; font-size:0.95rem; color: var(--text-dark);">Log In</a>
                <a href="signup.html" class="btn btn-primary glass-btn">Sign Up</a>
            `;
        }
    });
});





