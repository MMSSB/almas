// postad.js
import { db, storage } from './almas.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// DOM Elements
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('propertyImage');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const removeImageBtn = document.getElementById('removeImage');
const form = document.getElementById('postAdForm');
const submitBtn = document.getElementById('submitBtn');

let selectedFile = null;

// 1. Handle Image Upload & Preview
uploadBox.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            uploadBox.style.display = 'none';
            imagePreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(selectedFile);
    }
});

// 2. Handle Image Removal
removeImageBtn.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    imagePreview.src = '';
    uploadBox.style.display = 'flex';
    imagePreviewContainer.style.display = 'none';
});

// 3. Handle Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!selectedFile) {
        alert("Please upload an image for the property.");
        return;
    }

    // Change button state to show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';

    try {
        // Step A: Upload Image to Firebase Storage
        const imageRef = ref(storage, `properties/${Date.now()}_${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        const imageUrl = await getDownloadURL(imageRef);

        // Step B: Save form text data + Image URL to Firestore
        await addDoc(collection(db, "properties"), {
            title: document.getElementById('propTitle').value,
            type: document.getElementById('propType').value,
            price: Number(document.getElementById('propPrice').value),
            location: document.getElementById('propLocation').value,
            bedrooms: Number(document.getElementById('propBeds').value),
            bathrooms: Number(document.getElementById('propBaths').value),
            area: Number(document.getElementById('propArea').value),
            imageUrl: imageUrl, // The link to the image we just uploaded
            createdAt: serverTimestamp()
        });

        alert("Property published successfully!");
        window.location.href = "index.html"; // Send user back to home page

    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error publishing property. Check the console for details.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Publish Listing';
    }
});