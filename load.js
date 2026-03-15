// load.js

// 1. Inject the Loader CSS dynamically
const loaderStyles = document.createElement('style');
loaderStyles.innerHTML = `
    .almas-loader-overlay {
        position: fixed;
        inset: 0;
        background-color: #f9fafb;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.6s;
    }

    .almas-loader-overlay.hidden {
        opacity: 0;
        visibility: hidden;
    }

    .loader-content {
        position: relative;
        width: 110px;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
    }

    .spinner-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 4px solid transparent;
        border-top-color: #008edf; /* ALMAS Primary */
        border-right-color: #cbecfc; /* ALMAS Light */
        border-radius: 50%;
        animation: spinRing 1s linear infinite;
    }

    .loader-logo {
        width: 45px;
        animation: pulseLogo 1.5s ease-in-out infinite;
        position: relative;
        z-index: 2;
    }

    .loader-text {
        font-family: 'Outfit', sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        color: #005c91; /* ALMAS Dark */
        letter-spacing: 2px;
        text-transform: uppercase;
        animation: pulseText 1.5s ease-in-out infinite;
    }

    @keyframes spinRing {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes pulseLogo {
        0% { transform: scale(0.85); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(0.85); opacity: 0.8; }
    }

    @keyframes pulseText {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
`;
document.head.appendChild(loaderStyles);

// 2. Inject the Loader HTML right when the page starts loading
document.addEventListener("DOMContentLoaded", () => {
    const loaderHTML = `
        <div id="almas-loader" class="almas-loader-overlay">
            <div class="loader-content">
                <div class="spinner-ring"></div>
                <img src="images/almas.png" alt="ALMAS Logo" class="loader-logo">
            </div>
            <h3 class="loader-text">Loading ALMAS...</h3>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
});

// 3. Global function to hide and remove the loader
window.hideAlmasLoader = function() {
    const globalLoader = document.getElementById('almas-loader');
    if (globalLoader) {
        setTimeout(() => {
            globalLoader.classList.add('hidden');
            // Clean up the DOM by removing the element after the fade out
            setTimeout(() => globalLoader.remove(), 600);
        }, 400); 
    }
};