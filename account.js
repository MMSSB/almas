// import { auth, db } from "./firebase.js";
// import { 
//     onAuthStateChanged, 
//     updatePassword, 
//     deleteUser,
//     EmailAuthProvider,
//     reauthenticateWithCredential 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { 
//     doc, 
//     getDoc, 
//     updateDoc, 
//     deleteDoc 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // Avatar Options
// const AVATAR_OPTIONS = [
//     "https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299539-5187871.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299541-5187873.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299542-5187874.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299545-5187877.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/afro-man-avatar-6299548-5187880.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/afro-woman-avatar-6299550-5187882.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/grandpa-avatar-6299551-5187883.png",
//     "https://cdn3d.iconscout.com/3d/premium/thumb/grandma-avatar-6299552-5187884.png"
// ];

// let currentUser = null;
// let selectedAvatarUrl = "";

// // --- 1. INITIALIZE USER DATA ---
// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         currentUser = user;
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             // Fill Inputs
//             if(document.getElementById('input-fullname')) document.getElementById('input-fullname').value = data.fullName || "";
//             if(document.getElementById('input-phone')) document.getElementById('input-phone').value = data.phone || "";
            
//             // Fill Sidebar
//             document.getElementById('sidebar-name').innerText = data.fullName || "User";
//             document.getElementById('sidebar-email').innerText = data.email;
            
//             // Fill Modal text
//             if(document.getElementById('delete-user-email')) document.getElementById('delete-user-email').innerText = data.email;

//             // Fill Avatars
//             if(data.photoURL) {
//                 document.getElementById('sidebar-avatar').src = data.photoURL;
//                 document.getElementById('settings-avatar-preview').src = data.photoURL;
//             }
//         }
//     } else {
//         window.location.href = "login.html";
//     }
// });

// // --- 2. UPDATE PROFILE DETAILS ---
// const profileForm = document.getElementById('profile-form');
// if(profileForm) {
//     profileForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         if(!currentUser) return;
        
//         const newName = document.getElementById('input-fullname').value;
//         const newPhone = document.getElementById('input-phone').value;
//         const btn = profileForm.querySelector('button');

//         try {
//             btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
//             await updateDoc(doc(db, "users", currentUser.uid), {
//                 fullName: newName,
//                 phone: newPhone
//             });
//             btn.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
//             setTimeout(() => btn.innerText = "Save Changes", 2000);
//             document.getElementById('sidebar-name').innerText = newName;
//         } catch (error) {
//             console.error(error);
//             alert("Error saving profile.");
//             btn.innerText = "Save Changes";
//         }
//     });
// }

// // --- 3. CHANGE PASSWORD (WITH SECURITY CHECK) ---
// const passwordForm = document.getElementById('password-form');
// if(passwordForm) {
//     passwordForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const currentPass = document.getElementById('current-password').value;
//         const newPass = document.getElementById('new-password').value;
//         const confirmPass = document.getElementById('confirm-password').value;
//         const btn = document.getElementById('btn-update-password');

//         if(newPass !== confirmPass) {
//             alert("New passwords do not match.");
//             return;
//         }

//         if(newPass.length < 6) {
//             alert("Password must be at least 6 characters.");
//             return;
//         }

//         try {
//             btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';

//             // A. Re-authenticate User (Security Step)
//             const credential = EmailAuthProvider.credential(currentUser.email, currentPass);
//             await reauthenticateWithCredential(currentUser, credential);

//             // B. Update Password
//             btn.innerHTML = 'Updating...';
//             await updatePassword(currentUser, newPass);

//             alert("Password updated successfully!");
//             passwordForm.reset();
//             btn.innerText = "Update Password";

//         } catch (error) {
//             console.error("Password Update Error:", error);
//             btn.innerText = "Update Password";
            
//             if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
//                 alert("Incorrect Current Password.");
//             } else if (error.code === 'auth/requires-recent-login') {
//                 alert("Security timeout. Please log out and log in again.");
//             } else {
//                 alert("Error: " + error.message);
//             }
//         }
//     });
// }

// // --- 4. DELETE ACCOUNT (WITH MODAL & VERIFICATION) ---
// const deleteBtnInit = document.getElementById('btn-delete-init');
// const deleteModal = document.getElementById('deleteModal');
// const btnCancelDelete = document.getElementById('btn-cancel-delete');
// const btnConfirmDelete = document.getElementById('btn-confirm-delete');

// // Open Modal
// if(deleteBtnInit) {
//     deleteBtnInit.addEventListener('click', () => {
//         deleteModal.classList.add('active');
//     });
// }

// // Close Modal
// if(btnCancelDelete) {
//     btnCancelDelete.addEventListener('click', () => {
//         deleteModal.classList.remove('active');
//         document.getElementById('delete-confirm-password').value = ""; // Clear input
//     });
// }

// // Perform Deletion
// if(btnConfirmDelete) {
//     btnConfirmDelete.addEventListener('click', async () => {
//         const password = document.getElementById('delete-confirm-password').value;
        
//         if(!password) {
//             alert("Please enter your password to confirm.");
//             return;
//         }

//         try {
//             btnConfirmDelete.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Deleting...';

//             // A. Re-authenticate (Verify it's really them)
//             const credential = EmailAuthProvider.credential(currentUser.email, password);
//             await reauthenticateWithCredential(currentUser, credential);

//             // B. Delete Firestore Data
//             await deleteDoc(doc(db, "users", currentUser.uid));

//             // C. Delete Auth User
//             await deleteUser(currentUser);

//             alert("Account deleted.");
//             window.location.href = "index.html";

//         } catch (error) {
//             console.error("Delete Error:", error);
//             btnConfirmDelete.innerHTML = 'Delete Permanently';
            
//             if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
//                 alert("Incorrect Password. Cannot delete account.");
//             } else {
//                 alert("Error deleting account: " + error.message);
//             }
//         }
//     });
// }

// // --- 5. AVATAR MODAL LOGIC (Existing) ---
// const avatarModal = document.getElementById('avatarModal');
// const btnOpenAvatar = document.getElementById('btn-change-photo');
// const btnCancelAvatar = document.getElementById('btn-cancel-modal');
// const btnSaveAvatar = document.getElementById('btn-save-avatar');
// const avatarGrid = document.getElementById('avatarGrid');

// if(btnOpenAvatar) {
//     btnOpenAvatar.addEventListener('click', () => {
//         avatarModal.classList.add('active');
//         avatarGrid.innerHTML = '';
//         AVATAR_OPTIONS.forEach(url => {
//             const div = document.createElement('div');
//             div.className = 'avatar-option';
//             if(url === selectedAvatarUrl) div.classList.add('selected');
//             div.innerHTML = `<img src="${url}" alt="Avatar">`;
//             div.addEventListener('click', () => {
//                 document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
//                 div.classList.add('selected');
//                 selectedAvatarUrl = url;
//             });
//             avatarGrid.appendChild(div);
//         });
//     });
// }

// if(btnCancelAvatar) btnCancelAvatar.addEventListener('click', () => avatarModal.classList.remove('active'));

// if(btnSaveAvatar) {
//     btnSaveAvatar.addEventListener('click', async () => {
//         if(!selectedAvatarUrl || !currentUser) return;
//         try {
//             btnSaveAvatar.innerText = "Updating...";
//             await updateDoc(doc(db, "users", currentUser.uid), { photoURL: selectedAvatarUrl });
//             document.getElementById('sidebar-avatar').src = selectedAvatarUrl;
//             document.getElementById('settings-avatar-preview').src = selectedAvatarUrl;
//             avatarModal.classList.remove('active');
//             btnSaveAvatar.innerText = "Select";
//         } catch (error) {
//             console.error(error);
//             btnSaveAvatar.innerText = "Select";
//         }
//     });
// }












// import { auth, db } from "./firebase.js";
// import { showToast } from "./toast.js"; 
// import { 
//     onAuthStateChanged, 
//     updatePassword, 
//     deleteUser,
//     EmailAuthProvider,
//     reauthenticateWithCredential,
//     updateProfile // <--- IMPORT THIS
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
// import { 
//     doc, 
//     getDoc, 
//     updateDoc, 
//     deleteDoc 
// } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// // ... (Keep AVATAR_OPTIONS and currentUser setup the same) ...
// const AVATAR_OPTIONS = [
//     "images/profile/1.png",
//     "images/profile/2.png",
//     "images/profile/3.png",
//     "images/profile/4.png"
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299541-5187873.png",
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/man-avatar-6299542-5187874.png",
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/woman-avatar-6299545-5187877.png",
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/afro-man-avatar-6299548-5187880.png",
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/afro-woman-avatar-6299550-5187882.png",
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/grandpa-avatar-6299551-5187883.png",
//     // "https://cdn3d.iconscout.com/3d/premium/thumb/grandma-avatar-6299552-5187884.png"
// ];

// let currentUser = null;
// let selectedAvatarUrl = "";

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         currentUser = user;
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//             const data = docSnap.data();
//             if(document.getElementById('input-fullname')) document.getElementById('input-fullname').value = data.fullName || "";
//             if(document.getElementById('input-phone')) document.getElementById('input-phone').value = data.phone || "";
//             document.getElementById('sidebar-name').innerText = data.fullName || "User";
//             document.getElementById('sidebar-email').innerText = data.email;
//             if(document.getElementById('delete-user-email')) document.getElementById('delete-user-email').innerText = data.email;

//             if(data.photoURL) {
//                 document.getElementById('sidebar-avatar').src = data.photoURL;
//                 document.getElementById('settings-avatar-preview').src = data.photoURL;
//             }
//         }
//     } else {
//         window.location.href = "login.html";
//     }
// });


// // --- UPDATE PROFILE (FIXED) ---
// const profileForm = document.getElementById('profile-form');
// if(profileForm) {
//     profileForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         if(!currentUser) return;
        
//         const newName = document.getElementById('input-fullname').value;
//         const newPhone = document.getElementById('input-phone').value;
//         const btn = profileForm.querySelector('button');

//         try {
//             btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            
//             // 1. Update Firestore
//             await updateDoc(doc(db, "users", currentUser.uid), {
//                 fullName: newName,
//                 phone: newPhone
//             });

//             // 2. Update Auth Profile
//             await updateProfile(currentUser, { displayName: newName });

//             // 3. Update UI Immediately
//             document.getElementById('sidebar-name').innerText = newName;
            
//             // --- CHANGE IS HERE: Update Navbar with First Name Only ---
//             const headerName = document.getElementById('header-username');
//             if (headerName) {
//                 const firstName = newName.split(' ')[0]; // <--- Split it here
//                 headerName.innerText = "Hi, " + firstName;
//             }

//             btn.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
//             setTimeout(() => btn.innerText = "Save Changes", 2000);
            
//             showToast("Profile updated successfully!", "success");

//         } catch (error) {
//             console.error(error);
//             showToast("Error saving profile.", "error");
//             btn.innerText = "Save Changes";
//         }
//     });
// }

// // // --- UPDATE PROFILE (FIXED) ---
// // const profileForm = document.getElementById('profile-form');
// // if(profileForm) {
// //     profileForm.addEventListener('submit', async (e) => {
// //         e.preventDefault();
// //         if(!currentUser) return;
        
// //         const newName = document.getElementById('input-fullname').value;
// //         const newPhone = document.getElementById('input-phone').value;
// //         const btn = profileForm.querySelector('button');

// //         try {
// //             btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            
// //             // 1. Update Firestore (Database)
// //             await updateDoc(doc(db, "users", currentUser.uid), {
// //                 fullName: newName,
// //                 phone: newPhone
// //             });

// //             // 2. Update Auth Profile (Critical for Navbar)
// //             await updateProfile(currentUser, { displayName: newName });

// //             // 3. Update UI Immediately
// //             document.getElementById('sidebar-name').innerText = newName;
            
// //             // Check if navbar element exists and update it
// //             const headerName = document.getElementById('header-username');
// //             if (headerName) {
// //                 headerName.innerText = "Hi, " + newName;
// //             }

// //             btn.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
// //             setTimeout(() => btn.innerText = "Save Changes", 2000);
            
// //             showToast("Profile updated successfully!", "success");

// //         } catch (error) {
// //             console.error(error);
// //             showToast("Error saving profile.", "error");
// //             btn.innerText = "Save Changes";
// //         }
// //     });
// // }

// // ... (Keep the rest of your file: Password, Delete, and Avatar logic exactly the same) ...
// // --- CHANGE PASSWORD ---
// const passwordForm = document.getElementById('password-form');
// if(passwordForm) {
//     passwordForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const currentPass = document.getElementById('current-password').value;
//         const newPass = document.getElementById('new-password').value;
//         const confirmPass = document.getElementById('confirm-password').value;
//         const btn = document.getElementById('btn-update-password');

//         if(newPass !== confirmPass) { showToast("New passwords do not match.", "error"); return; }
//         if(newPass.length < 6) { showToast("Password must be at least 6 characters.", "error"); return; }

//         try {
//             btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';
//             const credential = EmailAuthProvider.credential(currentUser.email, currentPass);
//             await reauthenticateWithCredential(currentUser, credential);
//             btn.innerHTML = 'Updating...';
//             await updatePassword(currentUser, newPass);
//             showToast("Password updated successfully!", "success");
//             passwordForm.reset();
//             btn.innerText = "Update Password";
//         } catch (error) {
//             console.error(error);
//             btn.innerText = "Update Password";
//             if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
//                 showToast("Incorrect Current Password.", "error");
//             } else {
//                 showToast(error.message, "error");
//             }
//         }
//     });
// }

// // --- DELETE ACCOUNT ---
// const deleteBtnInit = document.getElementById('btn-delete-init');
// const deleteModal = document.getElementById('deleteModal');
// const btnCancelDelete = document.getElementById('btn-cancel-delete');
// const btnConfirmDelete = document.getElementById('btn-confirm-delete');

// if(deleteBtnInit) deleteBtnInit.addEventListener('click', () => deleteModal.classList.add('active'));
// if(btnCancelDelete) btnCancelDelete.addEventListener('click', () => {
//     deleteModal.classList.remove('active');
//     document.getElementById('delete-confirm-password').value = "";
// });

// if(btnConfirmDelete) {
//     btnConfirmDelete.addEventListener('click', async () => {
//         const password = document.getElementById('delete-confirm-password').value;
//         if(!password) { showToast("Please enter your password.", "error"); return; }
//         try {
//             btnConfirmDelete.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Deleting...';
//             const credential = EmailAuthProvider.credential(currentUser.email, password);
//             await reauthenticateWithCredential(currentUser, credential);
//             await deleteDoc(doc(db, "users", currentUser.uid));
//             await deleteUser(currentUser);
//             alert("Account deleted."); 
//             window.location.href = "index.html";
//         } catch (error) {
//             console.error(error);
//             btnConfirmDelete.innerHTML = 'Delete Permanently';
//             if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
//                 showToast("Incorrect Password.", "error");
//             } else {
//                 showToast(error.message, "error");
//             }
//         }
//     });
// }

// // --- AVATAR MODAL ---
// const avatarModal = document.getElementById('avatarModal');
// const btnOpenAvatar = document.getElementById('btn-change-photo');
// const btnCancelAvatar = document.getElementById('btn-cancel-modal');
// const btnSaveAvatar = document.getElementById('btn-save-avatar');
// const avatarGrid = document.getElementById('avatarGrid');

// if(btnOpenAvatar) {
//     btnOpenAvatar.addEventListener('click', () => {
//         avatarModal.classList.add('active');
//         avatarGrid.innerHTML = '';
//         AVATAR_OPTIONS.forEach(url => {
//             const div = document.createElement('div');
//             div.className = 'avatar-option';
//             if(url === selectedAvatarUrl) div.classList.add('selected');
//             div.innerHTML = `<img src="${url}" alt="Avatar">`;
//             div.addEventListener('click', () => {
//                 document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
//                 div.classList.add('selected');
//                 selectedAvatarUrl = url;
//             });
//             avatarGrid.appendChild(div);
//         });
//     });
// }
// if(btnCancelAvatar) btnCancelAvatar.addEventListener('click', () => avatarModal.classList.remove('active'));

// if(btnSaveAvatar) {
//     btnSaveAvatar.addEventListener('click', async () => {
//         if(!selectedAvatarUrl || !currentUser) return;
//         try {
//             btnSaveAvatar.innerText = "Updating...";
//             await updateDoc(doc(db, "users", currentUser.uid), { photoURL: selectedAvatarUrl });
//             document.getElementById('sidebar-avatar').src = selectedAvatarUrl;
//             document.getElementById('settings-avatar-preview').src = selectedAvatarUrl;
//             showToast("Profile photo updated!", "success");
//             avatarModal.classList.remove('active');
//             btnSaveAvatar.innerText = "Select";
//         } catch (error) {
//             console.error(error);
//             showToast("Failed to update photo.", "error");
//             btnSaveAvatar.innerText = "Select";
//         }
//     });
// }
















// // =========================================
// // THEME MANAGEMENT SYSTEM
// // =========================================

// // Theme settings functions
// function setTheme(theme) {
//     const html = document.documentElement;
    
//     // Remove existing theme attributes
//     html.removeAttribute('data-theme');
    
//     // Set new theme
//     if (theme !== 'system') {
//         html.setAttribute('data-theme', theme);
//     }
    
//     // Save preference to localStorage
//     localStorage.setItem('theme-preference', theme);
    
//     // Update theme selector UI
//     updateThemeSelector(theme);
    
//     // Dispatch custom event for theme change
//     document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
// }

// function getPreferredTheme() {
//     const saved = localStorage.getItem('theme-preference');
//     if (saved) return saved;
    
//     // Check system preference
//     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// }

// function updateThemeSelector(selectedTheme) {
//     const themeOptions = document.querySelectorAll('.theme-option');
//     themeOptions.forEach(option => {
//         option.classList.remove('active');
//         if (option.dataset.theme === selectedTheme) {
//             option.classList.add('active');
//         }
//     });
// }

// // Initialize theme on page load
// function initTheme() {
//     const preferredTheme = getPreferredTheme();
//     setTheme(preferredTheme);
    
//     // Listen for theme option clicks
//     document.querySelectorAll('.theme-option').forEach(option => {
//         option.addEventListener('click', () => {
//             setTheme(option.dataset.theme);
//         });
//     });
    
//     // Listen for system theme changes
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//         if (!localStorage.getItem('theme-preference') || localStorage.getItem('theme-preference') === 'system') {
//             const theme = e.matches ? 'dark' : 'light';
//             setTheme(theme);
//         }
//     });
// }

// // Call initTheme when DOM is loaded
// document.addEventListener('DOMContentLoaded', initTheme);

// // Also add a global function to check theme
// window.getCurrentTheme = function() {
//     const html = document.documentElement;
//     return html.getAttribute('data-theme') || 'system';
// };


















import { auth, db } from "./firebase.js";
import { showToast } from "./toast.js"; 
import { 
    onAuthStateChanged, 
    updatePassword, 
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { 
    doc, 
    getDoc, 
    updateDoc, 
    deleteDoc,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// --- GLOBAL VARIABLES ---
let currentUser = null;
let map = null;
let marker = null;
const AVATAR_OPTIONS = [
    "images/profile/1.png", 
    "images/profile/2.png", 
    "images/profile/3.png", 
    "images/profile/4.png"
];
let selectedAvatarUrl = "";

// --- 1. AUTH STATE OBSERVER ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        await loadUserProfile(user);
        await loadAddressBook(user.uid);
    } else {
        window.location.href = "login.html";
    }
});

// Helper: Load User Profile Data
async function loadUserProfile(user) {
    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            if(document.getElementById('input-fullname')) document.getElementById('input-fullname').value = data.fullName || "";
            if(document.getElementById('input-phone')) document.getElementById('input-phone').value = data.phone || "";
            
            if(document.getElementById('sidebar-name')) document.getElementById('sidebar-name').innerText = data.fullName || "User";
            if(document.getElementById('sidebar-email')) document.getElementById('sidebar-email').innerText = data.email;
            if(document.getElementById('delete-user-email')) document.getElementById('delete-user-email').innerText = data.email;

            if(data.photoURL) {
                if(document.getElementById('sidebar-avatar')) document.getElementById('sidebar-avatar').src = data.photoURL;
                if(document.getElementById('settings-avatar-preview')) document.getElementById('settings-avatar-preview').src = data.photoURL;
            }
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
}

/* =========================================
   2. ADDRESS BOOK LOGIC (UPDATED FOR EGYPTIAN ADDRESSES)
   ========================================= */

const addressModal = document.getElementById('addressModal');
const btnAddAddress = document.getElementById('btn-add-address');
const btnCloseAddress = document.getElementById('btn-close-address');
const btnCancelAdd = document.getElementById('btn-cancel-add');
const addressForm = document.getElementById('address-form');

// OPEN MODAL
if(btnAddAddress) {
    btnAddAddress.addEventListener('click', () => {
        addressModal.classList.add('active');
        
        // Pre-fill Name/Phone
        const profileName = document.getElementById('input-fullname')?.value || "";
        const profilePhone = document.getElementById('input-phone')?.value || "";
        if(document.getElementById('addr-name')) document.getElementById('addr-name').value = profileName;
        if(document.getElementById('addr-phone')) document.getElementById('addr-phone').value = profilePhone;

        // Initialize Map
        setTimeout(() => initMap(), 100);
    });
}

// CLOSE MODAL
const closeModal = () => addressModal.classList.remove('active');
if(btnCloseAddress) btnCloseAddress.addEventListener('click', closeModal);
if(btnCancelAdd) btnCancelAdd.addEventListener('click', closeModal);

// INITIALIZE MAP
function initMap() {
    if (map) {
        map.invalidateSize();
        return;
    }

    // Default View: Sheikh Zayed, Giza (as requested)
    map = L.map('map').setView([30.0444, 30.9705], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Search Control
    if (L.Control.Geocoder) {
        L.Control.geocoder({ defaultMarkGeocode: false })
        .on('markgeocode', function(e) {
            const bbox = e.geocode.bbox;
            const poly = L.polygon([
                bbox.getSouthEast(), bbox.getNorthEast(),
                bbox.getNorthWest(), bbox.getSouthWest()
            ]);
            map.fitBounds(poly.getBounds());
            updateMarker(e.geocode.center.lat, e.geocode.center.lng);
        })
        .addTo(map);
    }

    // Map Click
    map.on('click', function(e) {
        updateMarker(e.latlng.lat, e.latlng.lng);
    });

    // "Locate Me" Button
    const btnLocate = document.getElementById('btn-locate-me');
    if(btnLocate) {
        btnLocate.addEventListener('click', () => {
            if (!navigator.geolocation) return showToast("Geolocation not supported", "error");
            
            const originalText = btnLocate.innerHTML;
            btnLocate.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating...';
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    map.setView([lat, lng], 16);
                    updateMarker(lat, lng);
                    btnLocate.innerHTML = originalText;
                },
                () => {
                    showToast("Location access denied.", "error");
                    btnLocate.innerHTML = originalText;
                }
            );
        });
    }
}

// --- UPDATED ADDRESS PARSING LOGIC ---
async function updateMarker(lat, lng) {
    // 1. Remove old marker
    if (marker) map.removeLayer(marker);

    // 2. Add new marker
    marker = L.marker([lat, lng], { draggable: true }).addTo(map);
    
    // 3. Save coordinates
    document.getElementById('addr-lat').value = lat;
    document.getElementById('addr-lng').value = lng;

    // 4. Reverse Geocode (Specific for Egypt Format)
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
        const data = await response.json();
        
        if(data.address) {
            const addr = data.address;
            
            // Extract hierarchical fields
            const country = addr.country || "";
            const state = addr.state || addr.region || ""; // "Giza"
            const city = addr.city || addr.town || addr.county || ""; // "Sheikh Zayed City"
            const district = addr.suburb || addr.neighbourhood || addr.quarter || addr.residential || ""; // "District 7"
            const road = addr.road || "";
            const house = addr.house_number || "";

            // --- FORMATTING LOGIC ---
            
            // 1. Detailed Address: "Street Name, Building, District"
            let detailedPart = [];
            if(house) detailedPart.push(`Building ${house}`);
            if(road) detailedPart.push(road);
            if(district) detailedPart.push(district); // "District 7"

            // 2. City/Area: "Sheikh Zayed, Giza, Egypt"
            let areaPart = [];
            if(city) areaPart.push(city.replace(' City', '')); // Remove 'City' word for cleaner look
            if(state) areaPart.push(state);
            if(country) areaPart.push(country);

            // Set Values
            document.getElementById('addr-details').value = detailedPart.join(', ');
            document.getElementById('addr-city').value = areaPart.join(', ');
        }
    } catch (error) {
        console.log("Geocoding fetch error:", error);
    }

    // 5. Update on Drag
    marker.on('dragend', function(e) {
        const position = marker.getLatLng();
        updateMarker(position.lat, position.lng);
    });
}

// SAVE ADDRESS
if(addressForm) {
    addressForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = addressForm.querySelector('button[type="submit"]');
        
        const addressData = {
            label: document.getElementById('addr-label').value,
            fullName: document.getElementById('addr-name').value,
            phone: document.getElementById('addr-phone').value,
            details: document.getElementById('addr-details').value,
            city: document.getElementById('addr-city').value,
            lat: document.getElementById('addr-lat').value,
            lng: document.getElementById('addr-lng').value,
            createdAt: new Date().toISOString()
        };

        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            await addDoc(collection(db, "users", currentUser.uid, "addresses"), addressData);
            
            showToast("Address saved!", "success");
            addressForm.reset();
            closeModal();
            loadAddressBook(currentUser.uid);
            
        } catch (error) {
            console.error(error);
            showToast("Failed to save address.", "error");
        } finally {
            btn.innerText = "Save Address";
        }
    });
}

// FETCH ADDRESSES
async function loadAddressBook(uid) {
    const grid = document.getElementById('address-grid');
    if(!grid) return;

    try {
        const q = query(collection(db, "users", uid, "addresses"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        grid.innerHTML = "";

        if (querySnapshot.empty) {
            grid.innerHTML = `<p style="color:var(--text-gray); font-style:italic; grid-column: 1/-1;">No addresses saved yet.</p>`;
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const addr = docSnap.data();
            const card = document.createElement('div');
            card.className = 'address-card';
            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <span class="address-tag default">${addr.label}</span>
                </div>
                <div style="font-weight: 700; margin: 8px 0 4px; font-size: 0.95rem;">${addr.fullName}</div>
                <div style="font-size: 0.9rem; color: var(--text-gray); line-height: 1.5; margin-bottom: 8px;">
                    ${addr.details}<br>${addr.city}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-gray);"><i class="fa-solid fa-phone"></i> ${addr.phone}</div>
                <div class="address-actions" style="margin-top:10px; padding-top:10px; border-top:1px solid #eee;">
                    <span class="link-btn delete-addr" data-id="${docSnap.id}" style="color:#ef4444; font-size:0.85rem; cursor:pointer;">
                        <i class="fa-solid fa-trash"></i> Remove
                    </span>
                </div>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.delete-addr').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if(confirm("Are you sure you want to delete this address?")) {
                    const id = e.target.closest('.delete-addr').dataset.id;
                    await deleteDoc(doc(db, "users", currentUser.uid, "addresses", id));
                    loadAddressBook(currentUser.uid);
                    showToast("Address deleted.", "success");
                }
            });
        });

    } catch (error) {
        console.error("Error loading addresses:", error);
        grid.innerHTML = `<p style="color:red;">Failed to load addresses.</p>`;
    }
}


/* =========================================
   3. SETTINGS LOGIC (Profile, Password, Delete)
   ========================================= */

// --- UPDATE PROFILE ---
const profileForm = document.getElementById('profile-form');
if(profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(!currentUser) return;
        
        const newName = document.getElementById('input-fullname').value;
        const newPhone = document.getElementById('input-phone').value;
        const btn = profileForm.querySelector('button');

        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            
            await updateDoc(doc(db, "users", currentUser.uid), {
                fullName: newName,
                phone: newPhone
            });

            await updateProfile(currentUser, { displayName: newName });
            document.getElementById('sidebar-name').innerText = newName;
            const headerName = document.getElementById('header-username');
            if (headerName) headerName.innerText = "Hi, " + newName.split(' ')[0];

            btn.innerHTML = 'Saved <i class="fa-solid fa-check"></i>';
            setTimeout(() => btn.innerText = "Save Changes", 2000);
            showToast("Profile updated successfully!", "success");

        } catch (error) {
            console.error(error);
            showToast("Error saving profile.", "error");
            btn.innerText = "Save Changes";
        }
    });
}

// --- CHANGE PASSWORD ---
const passwordForm = document.getElementById('password-form');
if(passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPass = document.getElementById('current-password').value;
        const newPass = document.getElementById('new-password').value;
        const confirmPass = document.getElementById('confirm-password').value;
        const btn = document.getElementById('btn-update-password');

        if(newPass !== confirmPass) return showToast("New passwords do not match.", "error");
        if(newPass.length < 6) return showToast("Password must be at least 6 characters.", "error");

        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying...';
            const credential = EmailAuthProvider.credential(currentUser.email, currentPass);
            await reauthenticateWithCredential(currentUser, credential);
            
            btn.innerHTML = 'Updating...';
            await updatePassword(currentUser, newPass);
            
            showToast("Password updated successfully!", "success");
            passwordForm.reset();
            btn.innerText = "Update Password";
        } catch (error) {
            btn.innerText = "Update Password";
            if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                showToast("Incorrect Current Password.", "error");
            } else {
                showToast(error.message, "error");
            }
        }
    });
}

// --- DELETE ACCOUNT ---
const deleteBtnInit = document.getElementById('btn-delete-init');
const deleteModal = document.getElementById('deleteModal');
const btnCancelDelete = document.getElementById('btn-cancel-delete');
const btnConfirmDelete = document.getElementById('btn-confirm-delete');

if(deleteBtnInit) deleteBtnInit.addEventListener('click', () => deleteModal.classList.add('active'));
if(btnCancelDelete) btnCancelDelete.addEventListener('click', () => {
    deleteModal.classList.remove('active');
    document.getElementById('delete-confirm-password').value = "";
});

if(btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', async () => {
        const password = document.getElementById('delete-confirm-password').value;
        if(!password) return showToast("Please enter your password.", "error");
        
        try {
            btnConfirmDelete.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Deleting...';
            const credential = EmailAuthProvider.credential(currentUser.email, password);
            await reauthenticateWithCredential(currentUser, credential);
            
            await deleteDoc(doc(db, "users", currentUser.uid));
            await deleteUser(currentUser);
            
            alert("Account deleted.");
            window.location.href = "index.html";
        } catch (error) {
            btnConfirmDelete.innerHTML = 'Delete Permanently';
            if(error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                showToast("Incorrect Password.", "error");
            } else {
                showToast(error.message, "error");
            }
        }
    });
}

// --- AVATAR ---
const avatarModal = document.getElementById('avatarModal');
const btnOpenAvatar = document.getElementById('btn-change-photo');
const btnCancelAvatar = document.getElementById('btn-cancel-modal');
const btnSaveAvatar = document.getElementById('btn-save-avatar');
const avatarGrid = document.getElementById('avatarGrid');

if(btnOpenAvatar) {
    btnOpenAvatar.addEventListener('click', () => {
        avatarModal.classList.add('active');
        avatarGrid.innerHTML = '';
        AVATAR_OPTIONS.forEach(url => {
            const div = document.createElement('div');
            div.className = 'avatar-option';
            if(url === selectedAvatarUrl) div.classList.add('selected');
            div.innerHTML = `<img src="${url}" alt="Avatar">`;
            div.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
                div.classList.add('selected');
                selectedAvatarUrl = url;
            });
            avatarGrid.appendChild(div);
        });
    });
}
if(btnCancelAvatar) btnCancelAvatar.addEventListener('click', () => avatarModal.classList.remove('active'));
if(btnSaveAvatar) {
    btnSaveAvatar.addEventListener('click', async () => {
        if(!selectedAvatarUrl || !currentUser) return;
        try {
            btnSaveAvatar.innerText = "Updating...";
            await updateDoc(doc(db, "users", currentUser.uid), { photoURL: selectedAvatarUrl });
            document.getElementById('sidebar-avatar').src = selectedAvatarUrl;
            document.getElementById('settings-avatar-preview').src = selectedAvatarUrl;
            showToast("Profile photo updated!", "success");
            avatarModal.classList.remove('active');
            btnSaveAvatar.innerText = "Select";
        } catch (error) {
            console.error(error);
            showToast("Failed to update photo.", "error");
            btnSaveAvatar.innerText = "Select";
        }
    });
}