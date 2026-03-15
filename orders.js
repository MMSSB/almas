import { auth, db } from "./firebase.js";
import { getProductById } from "./products.js"; // To get images/names
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { 
    doc, 
    getDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc, 
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const ordersContainer = document.getElementById('orders-container');

// 1. Check Auth & Load Orders
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Load Sidebar Data (Name/Email)
        loadSidebarData(user);
        
        // Load Orders
        loadOrders(user.uid);
    } else {
        window.location.href = "login.html";
    }
});

// 2. Fetch Orders from Firestore
async function loadOrders(userId) {
    try {
        const ordersRef = collection(db, "orders");
        // Query: Get orders for this user, sorted by date (newest first)
        // Note: You might need to create an index in Firebase Console for this query to work perfectly.
        // If it fails, check console for a link to create the index.
        const q = query(
            ordersRef, 
            where("userId", "==", userId), 
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            ordersContainer.innerHTML = `
                <div style="text-align:center; padding: 50px 20px;">
                    <i class="fa-solid fa-box-open" style="font-size: 3rem; color: #e5e7eb; margin-bottom: 20px;"></i>
                    <h3 style="color: var(--text-dark);">No orders yet</h3>
                    <p style="color: var(--text-gray); margin-bottom: 20px;">Looks like you haven't placed an order yet.</p>
                    <a href="product.html" class="btn-primary" style="padding: 10px 20px; border-radius: 99px; text-decoration: none;">Start Shopping</a>
                </div>
            `;
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const order = doc.data();
            const date = order.createdAt ? order.createdAt.toDate().toLocaleDateString() : 'Just now';
            const statusClass = getStatusClass(order.status);
            
            // Generate HTML for up to 3 thumbnails
            let thumbsHtml = '';
            if (order.items && order.items.length > 0) {
                order.items.slice(0, 3).forEach(item => {
                    const product = getProductById(item.id);
                    const img = product ? product.image : 'https://placehold.co/100'; // Fallback
                    thumbsHtml += `<div class="preview-img"><img src="${img}" alt="Item"></div>`;
                });
                if(order.items.length > 3) {
                    thumbsHtml += `<div style="display:flex; align-items:center; color:var(--text-gray); font-size:0.8rem; font-weight:600;">+${order.items.length - 3} more</div>`;
                }
            }

            html += `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <div class="order-id">Order #${doc.id.slice(0, 8).toUpperCase()}</div>
                            <div class="order-date"><i class="fa-regular fa-calendar"></i> ${date}</div>
                        </div>
                        <span class="status-badge ${statusClass}">${order.status || 'Processing'}</span>
                    </div>

                    <div class="order-preview">
                        ${thumbsHtml}
                    </div>

                    <div class="order-meta">
                        <div class="order-total">Total Amount: <span class="total-amount">$${order.total.toFixed(2)}</span></div>
                        <div class="order-actions">
                            <button class="btn-details">Details</button>
                            <button class="btn-track">Track Order</button>
                        </div>
                    </div>
                </div>
            `;
        });

        ordersContainer.innerHTML = html;

    } catch (error) {
        console.error("Error loading orders:", error);
        ordersContainer.innerHTML = `<p style="text-align:center; color:red;">Failed to load orders. <br> ${error.message}</p>`;
    }
}

// Helper: Status Colors
function getStatusClass(status) {
    if (!status) return 'status-processing';
    const s = status.toLowerCase();
    if (s === 'delivered') return 'status-delivered';
    if (s === 'cancelled') return 'status-cancelled';
    return 'status-processing';
}

// Helper: Load Sidebar Info (Duplicate from profile.js, good to keep independent)
async function loadSidebarData(user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('sidebar-name').innerText = data.fullName || "User";
        document.getElementById('sidebar-email').innerText = data.email || user.email;
        if(data.photoURL) document.getElementById('sidebar-avatar').src = data.photoURL;
    }
}

// --- DEBUGGING TOOL ---
// Run this function in your browser console: createSampleOrder()
// to generate a fake order so you can see how the list looks.
window.createSampleOrder = async () => {
    const user = auth.currentUser;
    if(!user) return alert("Login first");
    
    try {
        await addDoc(collection(db, "orders"), {
            userId: user.uid,
            createdAt: serverTimestamp(),
            status: "Processing",
            total: 85.50,
            items: [
                { id: "poultry-1", qty: 2 },
                { id: "livestock-1", qty: 1 }
            ]
        });
        alert("Sample order created! Refresh page.");
        location.reload();
    } catch(e) {
        console.error(e);
    }
};