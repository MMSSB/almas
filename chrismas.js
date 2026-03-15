// // /**
// //  * 🎄 CHRISTMAS.JS - Ultimate Holiday Edition
// //  * Added: Zina (Decorations), Twinkling Lights, and Toggle Fixes.
// //  */

// // (function () {
// //     const CONFIG = {
// //         colors: {
// //             red: '#d42426',
// //             green: '#165b33',
// //             gold: '#ffbf00'
// //         },
// //         snow: {
// //             enabled: true,
// //             intensity: 250,
// //             speed: 5
// //         },
// //         button: {
// //             show: true,
// //             icon: '🎁',
// //             position: 'right',
// //             color: '#d42426'
// //         },
// //         hat: {
// //             enabled: true,
// //             selector: '.logo, .navbar-brand, .brand, a[href="index.html"]' 
// //         },
// //         // NEW FEATURES
// //         zina: {
// //             enabled: true, // Hanging decorations (Zina)
// //             lights: true   // Twinkling lights on header
// //         }
// //     };

// //     const style = document.createElement('style');
// //     style.innerHTML = `
// //         /* --- Core Theme --- */
// //         body.xmas-mode {
// //             --primary: var(--xmas-red) !important;
// //             --primary-blue: var(--xmas-red) !important;
// //             transition: all 0.5s ease;
// //         }

// //         /* --- Toggle Button --- */
// //         #xmas-toggle-btn {
// //             position: fixed;
// //             bottom: 20px;
// //             ${CONFIG.button.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
// //             width: 55px; height: 55px;
// //             background: ${CONFIG.button.color};
// //             color: white; border-radius: 50%; border: 3px solid white;
// //             box-shadow: 0 4px 15px rgba(0,0,0,0.4);
// //             cursor: pointer; z-index: 10000; font-size: 28px;
// //             display: flex; align-items: center; justify-content: center;
// //             transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
// //         }
// //         #xmas-toggle-btn:hover { transform: scale(1.1) rotate(15deg); }

// //         /* --- Zina & Lights (New Features) --- */
// //         .xmas-light-string {
// //             position: fixed; top: 0; left: 0; width: 100%; height: 10px;
// //             background: transparent; z-index: 1001; pointer-events: none;
// //             display: none; justify-content: space-around;
// //         }
// //         body.xmas-mode .xmas-light-string { display: flex; }

// //         .bulb {
// //             width: 12px; height: 12px; border-radius: 50%;
// //             animation: twinkle 1s infinite alternate;
// //         }
// //         @keyframes twinkle {
// //             0% { opacity: 0.3; transform: scale(0.8); box-shadow: 0 0 0px transparent; }
// //             100% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 10px currentColor; }
// //         }

// //         .xmas-zina {
// //             position: fixed; top: 80px; left: 0; width: 100%; height: 40px;
// //             z-index: 999; pointer-events: none; display: none;
// //         }
// //         body.xmas-mode .xmas-zina { display: block; opacity: 0.7; }

// //         /* --- Snow --- */
// //         .xmas-snowflake {
// //             position: fixed; top: -20px; color: white;
// //             user-select: none; pointer-events: none; z-index: 9999;
// //             animation: xmas-fall linear infinite, xmas-sway ease-in-out infinite;
// //         }
// //         @keyframes xmas-fall { to { top: 105%; } }
// //         @keyframes xmas-sway { 50% { transform: translateX(20px); } }

// //         /* --- Santa Hat Fix --- */
// //         body.xmas-mode ${CONFIG.hat.selector} { position: relative !important; }
// //         body.xmas-mode ${CONFIG.hat.selector}::after {
// //             content: "🎅"; position: absolute; top: -18px; left: -12px;
// //             font-size: 1.6rem; transform: rotate(-15deg);
// //             animation: xmas-bounce 2s infinite; z-index: 1001;
// //         }
// //         @keyframes xmas-bounce { 50% { transform: rotate(-5deg) translateY(-5px); } }
// //     `;
// //     document.head.appendChild(style);

// //     // --- Create UI Elements ---
// //     const lightString = document.createElement('div');
// //     lightString.className = 'xmas-light-string';
// //     for(let i=0; i<30; i++) {
// //         const bulb = document.createElement('div');
// //         bulb.className = 'bulb';
// //         const colors = ['#ff0000', '#00ff00', '#ffff00', '#0000ff'];
// //         bulb.style.color = colors[i % colors.length];
// //         bulb.style.backgroundColor = colors[i % colors.length];
// //         bulb.style.animationDelay = (Math.random() * 2) + 's';
// //         lightString.appendChild(bulb);
// //     }
// //     document.body.appendChild(lightString);

// //     const zina = document.createElement('div');
// //     zina.className = 'xmas-zina';
// //     zina.innerHTML = `<svg width="100%" height="40"><path d="M0 10 Q 50 40 100 10 T 200 10 T 300 10 T 400 10 T 500 10 T 600 10 T 700 10 T 800 10 T 900 10 T 1000 10" stroke="green" fill="transparent" stroke-width="2" /></svg>`;
// //     document.body.appendChild(zina);

// //     const btn = document.createElement('button');
// //     btn.id = 'xmas-toggle-btn';
// //     btn.innerHTML = CONFIG.button.icon;
// //     document.body.appendChild(btn);

// //     // --- Logic ---
// //     let snowInterval;
// //     const body = document.body;

// //     btn.addEventListener('click', () => {
// //         if (body.classList.contains('xmas-mode')) {
// //             disableXmas();
// //         } else {
// //             enableXmas();
// //         }
// //     });

// //     function enableXmas() {
// //         body.classList.add('xmas-mode');
// //         localStorage.setItem('xmas-mode', 'enabled');
// //         if (CONFIG.snow.enabled) startSnow();
// //     }

// //     function disableXmas() {
// //         body.classList.remove('xmas-mode');
// //         localStorage.setItem('xmas-mode', 'disabled');
// //         stopSnow();
// //     }

// //     function startSnow() {
// //         if (snowInterval) return;
// //         const container = document.createElement('div');
// //         container.id = 'xmas-snow-container';
// //         document.body.appendChild(container);
// //         snowInterval = setInterval(() => {
// //             const flake = document.createElement('div');
// //             flake.classList.add('xmas-snowflake');
// //             flake.textContent = '❄';
// //             flake.style.left = Math.random() * 100 + 'vw';
// //             flake.style.opacity = Math.random();
// //             flake.style.animationDuration = (Math.random() * 3 + 3) + 's';
// //             container.appendChild(flake);
// //             setTimeout(() => flake.remove(), 6000);
// //         }, CONFIG.snow.intensity);
// //     }

// //     function stopSnow() {
// //         clearInterval(snowInterval);
// //         snowInterval = null;
// //         const container = document.getElementById('xmas-snow-container');
// //         if (container) container.remove();
// //     }
// // function disableXmas() {
// //     body.classList.remove('xmas-mode');
// //     localStorage.setItem('xmas-mode', 'disabled');
// //     stopSnow();
// //     // Optional: Force a slight layout refresh to clear pseudo-elements
// //     window.dispatchEvent(new Event('resize')); 
// // }
// //     // Auto-load
// //     if (localStorage.getItem('xmas-mode') === 'enabled') enableXmas();
// // })();




// /**
//  * 🎄 CHRISTMAS.JS - Final Ultra Fix
//  * Logic: Injects hat INSIDE the logo for perfect scroll tracking.
//  */

// (function () {
//     const CONFIG = {
//         colors: { red: '#d42426', green: '#165b33' },
//         snow: { enabled: true, intensity: 250 },
//         button: { icon: '🎁', position: 'right', color: '#d42426' },
//         hat: {
//             enabled: true,
//             selector: '.logo' // Targets your Nutra Egypt logo
//         }
//     };

//     const style = document.createElement('style');
//     style.innerHTML = `
//         body.xmas-mode { --primary: var(--xmas-red) !important; }

//         /* --- THE PERFECT HAT FIX --- */
//         .santa-hat-anchor {
//             position: absolute !important;
//             top: -15px;
//             left: -12px;
//             font-size: 1.6rem;
//             pointer-events: none;
//             z-index: 2005;
//             display: none;
//             animation: xmas-bounce 2s infinite ease-in-out;
//         }
//         body.xmas-mode .santa-hat-anchor { display: block; }

//         @keyframes xmas-bounce {
//             0%, 100% { transform: rotate(-15deg) translateY(0); }
//             50% { transform: rotate(-5deg) translateY(-5px); }
//         }

//         /* Ensure the logo container can hold the hat */
//         body.xmas-mode ${CONFIG.hat.selector} {
//             position: relative !important;
//         }

//         /* --- ANWAR (LIGHTS) --- */
//         .xmas-light-string {
//             position: fixed; top: 0; left: 0; width: 100%; height: 12px;
//             z-index: 10001; pointer-events: none; display: none;
//             justify-content: space-around;
//         }
//         body.xmas-mode .xmas-light-string { display: flex; }

//         .bulb {
//             width: 10px; height: 10px; border-radius: 50%;
//             animation: twinkle 0.8s infinite alternate;
//         }
//         @keyframes twinkle {
//             0% { opacity: 0.3; transform: scale(0.8); box-shadow: 0 0 0px transparent; }
//             100% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px currentColor; }
//         }

//         /* --- TOGGLE BUTTON & SNOW --- */
//         #xmas-toggle-btn {
//             position: fixed; bottom: 20px; right: 20px;
//             width: 55px; height: 55px; background: ${CONFIG.button.color};
//             color: white; border-radius: 50%; border: 3px solid white;
//             box-shadow: 0 4px 15px rgba(0,0,0,0.4); cursor: pointer;
//             z-index: 10000; font-size: 28px; display: flex; 
//             align-items: center; justify-content: center;
//             transition: 0.3s;
//         }
//         #xmas-toggle-btn:hover { transform: scale(1.1); }

//         .xmas-snowflake {
//             position: fixed; top: -20px; color: white;
//             user-select: none; pointer-events: none; z-index: 9999;
//             animation: xmas-fall linear infinite;
//         }
//         @keyframes xmas-fall { to { top: 105%; } }
//     `;
//     document.head.appendChild(style);

//     // --- 1. Create Floating Light String ---
//     const lightString = document.createElement('div');
//     lightString.className = 'xmas-light-string';
//     const lightColors = ['#ff0000', '#22c55e', '#eab308', '#3b82f6'];
//     for(let i=0; i<35; i++) {
//         const bulb = document.createElement('div');
//         bulb.className = 'bulb';
//         bulb.style.color = lightColors[i % 4];
//         bulb.style.backgroundColor = lightColors[i % 4];
//         bulb.style.animationDelay = (Math.random() * 2) + 's';
//         lightString.appendChild(bulb);
//     }
//     document.body.appendChild(lightString);

//     // --- 2. Injected Santa Hat (Scroll-Proof) ---
//     function injectHat() {
//         const logo = document.querySelector(CONFIG.hat.selector);
//         if (logo && !document.querySelector('.santa-hat-anchor')) {
//             const hatSpan = document.createElement('span');
//             hatSpan.className = 'santa-hat-anchor';
//             hatSpan.innerHTML = '🎅';
//             logo.appendChild(hatSpan); // This attaches it TO the logo
//         }
//     }

//     // --- 3. Toggle Logic ---
//     const btn = document.createElement('button');
//     btn.id = 'xmas-toggle-btn';
//     btn.innerHTML = CONFIG.button.icon;
//     document.body.appendChild(btn);

//     const body = document.body;
//     let snowInterval;

//     btn.addEventListener('click', () => {
//         if (body.classList.contains('xmas-mode')) {
//             disableXmas();
//         } else {
//             enableXmas();
//         }
//     });

//     function enableXmas() {
//         body.classList.add('xmas-mode');
//         localStorage.setItem('xmas-mode', 'enabled');
//         injectHat(); // Ensure hat is inside the logo
//         if (CONFIG.snow.enabled) startSnow();
//     }

//     function disableXmas() {
//         body.classList.remove('xmas-mode');
//         localStorage.setItem('xmas-mode', 'disabled');
//         stopSnow();
//     }

//     function startSnow() {
//         if (snowInterval) return;
//         const container = document.createElement('div');
//         container.id = 'xmas-snow-container';
//         document.body.appendChild(container);
//         snowInterval = setInterval(() => {
//             const flake = document.createElement('div');
//             flake.className = 'xmas-snowflake';
//             flake.textContent = '❄';
//             flake.style.left = Math.random() * 100 + 'vw';
//             flake.style.animationDuration = (Math.random() * 3 + 3) + 's';
//             container.appendChild(flake);
//             setTimeout(() => flake.remove(), 6000);
//         }, CONFIG.snow.intensity);
//     }

//     function stopSnow() {
//         clearInterval(snowInterval);
//         snowInterval = null;
//         const container = document.getElementById('xmas-snow-container');
//         if (container) container.remove();
//     }

//     // Auto-load
//     if (localStorage.getItem('xmas-mode') === 'enabled') {
//         setTimeout(enableXmas, 500);
//     }
// })();







/**
 * 🎄 UNIVERSAL HOLIDAY LEGEND v4.0
 * Features: Flying Santa Sleigh, Music Toggle, Smart Anwar, 
 * Dynamic Zina, and Auto-Logo Detection.
 */

// (function () {
//     const CONFIG = {
//         colors: { red: '#d42426', green: '#165b33' },
//         snow: { enabled: true, intensity: 180 },
//         button: { icon: '🎁', color: '#d42426' },
//         // Add your own mp3 link here
//         // musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
//     };

//     const getLogo = () => document.querySelector('.logo, [class*="logo"], [id*="logo"], .navbar-brand, .brand, a[href="index.html"] img');

//     const style = document.createElement('style');
//     style.innerHTML = `
//         body.xmas-mode { --primary: var(--xmas-red) !important; }

//         /* --- SANTA HAT: LOGO ATTACHMENT --- */
//         .santa-hat-universal {
//             position: absolute !important;
//             top: -22px; left: -15px;
//             font-size: 2rem; pointer-events: none;
//             z-index: 10005; display: none;
//             animation: xmas-bounce 2s infinite ease-in-out;
//         }
//         body.xmas-mode .santa-hat-universal { display: block; }

//         /* --- FLYING SLEIGH --- */
//         .sleigh-container {
//             position: fixed; top: 15%; left: -200px;
//             font-size: 2.5rem; z-index: 10009;
//             pointer-events: none; display: none;
//             filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
//         }
//         body.xmas-mode .sleigh-container { display: block; animation: fly-across 15s linear infinite; }

//         @keyframes fly-across {
//             0% { left: -200px; transform: scaleX(1); }
//             49% { transform: scaleX(1); }
//             50% { left: 110vw; transform: scaleX(-1); }
//             100% { left: -200px; transform: scaleX(-1); }
//         }

//         /* --- TWINKLING ANWAR (LIGHTS) --- */
//         .xmas-light-string {
//             position: fixed; top: 0; left: 0; width: 100%; height: 16px;
//             z-index: 10001; pointer-events: none; display: none;
//             justify-content: space-around;
//         }
//         body.xmas-mode .xmas-light-string { display: flex; }

//         .bulb {
//             width: 12px; height: 12px; border-radius: 50%;
//             animation: twinkle 0.7s infinite alternate;
//         }
//         @keyframes twinkle {
//             0% { opacity: 0.2; transform: scale(0.7); filter: brightness(0.4); }
//             100% { opacity: 1; transform: scale(1.3); filter: brightness(1.5); box-shadow: 0 0 18px currentColor; }
//         }

//         /* --- DYNAMIC ZINA (DECOR) --- */
//         .xmas-zina {
//             position: fixed; top: 70px; left: 0; width: 100%; height: 40px;
//             z-index: 999; pointer-events: none; display: none;
//             background-image: repeating-linear-gradient(45deg, transparent, transparent 20px, #165b33 20px, #165b33 25px);
//             mask-image: radial-gradient(circle at 50% 0%, black 70%, transparent 71%);
//             -webkit-mask-image: radial-gradient(circle at 50% 0%, black 70%, transparent 71%);
//             background-size: 100px 100%; opacity: 0.5;
//         }
//         body.xmas-mode .xmas-zina { display: block; }

//         /* --- CONTROL BUTTON --- */
//         #xmas-btn {
//             position: fixed; bottom: 25px; right: 25px;
//             width: 65px; height: 65px; background: ${CONFIG.button.color};
//             color: white; border-radius: 50%; border: 4px solid white;
//             box-shadow: 0 8px 25px rgba(0,0,0,0.5); cursor: pointer;
//             z-index: 10010; font-size: 32px; display: flex; 
//             align-items: center; justify-content: center;
//             transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//         }
//         #xmas-btn:hover { transform: scale(1.1) rotate(10deg); }
//         #xmas-btn.active { background: #165b33; }

//         /* --- SNOW --- */
//         .snowflake {
//             position: fixed; top: -10px; color: white;
//             user-select: none; pointer-events: none; z-index: 10008;
//             animation: fall linear infinite;
//         }
//         @keyframes fall { to { top: 105%; } }
//         @keyframes xmas-bounce { 50% { transform: rotate(-5deg) translateY(-8px); } }
//     `;
//     document.head.appendChild(style);

//     // --- GENERATE ALL ELEMENTS ---
//     const init = () => {
//         // 1. Lights
//         const lights = document.createElement('div');
//         lights.className = 'xmas-light-string';
//         const colors = ['#ff0000', '#22c55e', '#ffeb3b', '#2196f3', '#e91e63', '#ffffff'];
//         for(let i=0; i<50; i++) {
//             const b = document.createElement('div');
//             b.className = 'bulb';
//             b.style.color = b.style.backgroundColor = colors[i % colors.length];
//             b.style.animationDelay = (Math.random() * 2) + 's';
//             lights.appendChild(b);
//         }
//         document.body.appendChild(lights);

//         // 2. Sleigh
//         const sleigh = document.createElement('div');
//         sleigh.className = 'sleigh-container';
//         sleigh.innerHTML = '🛷🎅🦌🦌';
//         document.body.appendChild(sleigh);

//         // 3. Zina
//         const zina = document.createElement('div');
//         zina.className = 'xmas-zina';
//         document.body.appendChild(zina);

//         // 4. Hat (Auto-attach to Logo)
//         const hat = document.createElement('div');
//         hat.className = 'santa-hat-universal';
//         hat.innerHTML = '🎅';
//         const logo = getLogo();
//         if (logo) {
//             logo.style.position = 'relative';
//             logo.appendChild(hat);
//         }

//         // 5. Music
//         const audio = new Audio(CONFIG.musicUrl);
//         audio.loop = true;

//         // 6. Toggle Button
//         const btn = document.createElement('button');
//         btn.id = 'xmas-btn';
//         btn.innerHTML = CONFIG.button.icon;
//         document.body.appendChild(btn);

//         return { btn, audio };
//     };

//     const { btn, audio } = init();
//     let snowActive = false;

//     const toggle = () => {
//         const active = document.body.classList.toggle('xmas-mode');
//         btn.classList.toggle('active');
//         btn.innerHTML = active ? '🎄' : CONFIG.button.icon;
//         localStorage.setItem('universal-xmas', active ? 'on' : 'off');
        
//         if (active) {
//             audio.play().catch(() => console.log("Music blocked by browser policy"));
//             startSnow();
//         } else {
//             audio.pause();
//             stopSnow();
//         }
//     };

//     const startSnow = () => {
//         if (snowActive) return;
//         snowActive = setInterval(() => {
//             const s = document.createElement('div');
//             s.className = 'snowflake';
//             s.innerHTML = Math.random() > 0.5 ? '❄' : '❅';
//             s.style.left = Math.random() * 100 + 'vw';
//             s.style.opacity = Math.random();
//             s.style.fontSize = (Math.random() * 15 + 10) + 'px';
//             s.style.animationDuration = (Math.random() * 4 + 2) + 's';
//             document.body.appendChild(s);
//             setTimeout(() => s.remove(), 6000);
//         }, CONFIG.snow.intensity);
//     };

//     const stopSnow = () => {
//         clearInterval(snowActive);
//         snowActive = false;
//     };

//     btn.addEventListener('click', toggle);
//     if (localStorage.getItem('universal-xmas') === 'on') toggle();
// })();



// /**
//  * 🎄 UNIVERSAL CHRISTMAS ENGINE v3.0
//  * Features: Auto-Logo Detection, Twinkling Anwar, Hanging Zina, 
//  * Scroll-Proof Santa, and Universal Mode.
//  */

// (function () {
//     // --- 1. SMART AUTO-DETECTION ---
//     const getLogo = () => {
//         // Universal selector: finds the first link with 'logo' in class/id or the first brand img
//         return document.querySelector('.logo, [class*="logo"], [id*="logo"], .navbar-brand, .brand, a[href="index.html"] img');
//     };

//     const CONFIG = {
//         colors: { red: '#d42426', green: '#165b33' },
//         snow: { enabled: true, intensity: 200 },
//         button: { icon: '🎁', color: '#d42426' }
//     };

//     // --- 2. UNIVERSAL DYNAMIC STYLES ---
//     const style = document.createElement('style');
//     style.innerHTML = `
//         /* Theme Overrides */
//         body.xmas-mode { 
//             --primary: var(--xmas-red) !important; 
//             --primary-blue: var(--xmas-red) !important;
//         }

//         /* Santa Hat: Dynamic Anchor */
//         .santa-hat-universal {
//             position: absolute !important;
//             top: -18px; left: -12px;
//             font-size: 1.8rem; pointer-events: none;
//             z-index: 10005; display: none;
//             animation: xmas-bounce 2s infinite ease-in-out;
//         }
//         body.xmas-mode .santa-hat-universal { display: block; }

//         @keyframes xmas-bounce {
//             0%, 100% { transform: rotate(-15deg) translateY(0); }
//             50% { transform: rotate(-5deg) translateY(-8px); }
//         }

//         /* Twinkling Anwar (Lights) */
//         .xmas-light-string {
//             position: fixed; top: 0; left: 0; width: 100%; height: 14px;
//             z-index: 10001; pointer-events: none; display: none;
//             justify-content: space-around; padding: 0 10px;
//         }
//         body.xmas-mode .xmas-light-string { display: flex; }

//         .bulb {
//             width: 10px; height: 10px; border-radius: 50%;
//             animation: twinkle 0.8s infinite alternate;
//         }
//         @keyframes twinkle {
//             0% { opacity: 0.3; transform: scale(0.8); filter: brightness(0.5); }
//             100% { opacity: 1; transform: scale(1.2); filter: brightness(1.2); box-shadow: 0 0 15px currentColor; }
//         }

//         /* Hanging Zina (Decorations) */
//         .xmas-zina-banner {
//             position: fixed; top: 70px; left: 0; width: 100%; height: 20px;
//             z-index: 999; pointer-events: none; display: none;
//             background-image: radial-gradient(circle at 50% 0%, transparent 70%, #165b33 71%);
//             background-size: 100px 40px; opacity: 0.6;
//         }
//         body.xmas-mode .xmas-zina-banner { display: block; }

//         /* Toggle Button */
//         #xmas-btn {
//             position: fixed; bottom: 25px; right: 25px;
//             width: 60px; height: 60px; background: ${CONFIG.button.color};
//             color: white; border-radius: 50%; border: 3px solid white;
//             box-shadow: 0 5px 20px rgba(0,0,0,0.4); cursor: pointer;
//             z-index: 10010; font-size: 30px; display: flex; 
//             align-items: center; justify-content: center;
//             transition: transform 0.3s;
//         }
//         #xmas-btn:hover { transform: scale(1.15) rotate(10deg); }

//         /* Snow */
//         .snowflake {
//             position: fixed; top: -10px; color: white;
//             user-select: none; pointer-events: none; z-index: 10008;
//             animation: fall linear infinite;
//         }
//         @keyframes fall { to { top: 105%; } }
//     `;
//     document.head.appendChild(style);

//     // --- 3. COMPONENT GENERATOR ---
//     const initElements = () => {
//         // Lights
//         const lights = document.createElement('div');
//         lights.className = 'xmas-light-string';
//         const colors = ['#ff0000', '#22c55e', '#ffeb3b', '#2196f3', '#e91e63'];
//         for(let i=0; i<45; i++) {
//             const b = document.createElement('div');
//             b.className = 'bulb';
//             b.style.color = b.style.backgroundColor = colors[i % colors.length];
//             b.style.animationDelay = (Math.random() * 2) + 's';
//             lights.appendChild(b);
//         }
//         document.body.appendChild(lights);

//         // Zina
//         const zina = document.createElement('div');
//         zina.className = 'xmas-zina-banner';
//         document.body.appendChild(zina);

//         // Hat
//         const hat = document.createElement('div');
//         hat.className = 'santa-hat-universal';
//         hat.innerHTML = '🎅';
//         const logo = getLogo();
//         if (logo) {
//             logo.style.position = 'relative';
//             logo.appendChild(hat);
//         }

//         // Toggle
//         const btn = document.createElement('button');
//         btn.id = 'xmas-btn';
//         btn.innerHTML = CONFIG.button.icon;
//         document.body.appendChild(btn);

//         return btn;
//     };

//     const btn = initElements();
//     let snowActive = false;

//     // --- 4. ENGINE LOGIC ---
//     const toggle = () => {
//         const isActive = document.body.classList.toggle('xmas-mode');
//         localStorage.setItem('universal-xmas', isActive ? 'on' : 'off');
//         handleSnow(isActive);
//     };

//     const handleSnow = (start) => {
//         if (start && !snowActive) {
//             snowActive = setInterval(() => {
//                 const s = document.createElement('div');
//                 s.className = 'snowflake';
//                 s.innerHTML = '❄';
//                 s.style.left = Math.random() * 100 + 'vw';
//                 s.style.fontSize = (Math.random() * 10 + 10) + 'px';
//                 s.style.animationDuration = (Math.random() * 3 + 2) + 's';
//                 document.body.appendChild(s);
//                 setTimeout(() => s.remove(), 5000);
//             }, CONFIG.snow.intensity);
//         } else if (!start) {
//             clearInterval(snowActive);
//             snowActive = false;
//         }
//     };

//     btn.addEventListener('click', toggle);
//     if (localStorage.getItem('universal-xmas') === 'on') toggle();
// })();































/*!
  chrismas.js — Universal Christmas Theme Injector
  Drop into any website to add a smart Christmas overlay: snow, garlands, lights, ornaments, sparkles, seasonal accents.
  Usage:
    <script src="chrismas.js"></script>
    <script>Chrismas.start();</script>

  Or quick:
    (function(){ var s=document.createElement('script'); s.src='chrismas.js'; document.head.appendChild(s); })();

  Notes:
  - Designed to be non-destructive: overlays only, minimal DOM interference.
  - Respects prefers-reduced-motion and allows toggles.
*/

(() => {
  "use strict";

  const Chrismas = {
    version: "1.0.0",
    state: {
      enabled: false,
      reducedMotion: false,
      theme: "auto", // auto | light | dark
      intensity: 0.85, // 0..1
      snow: true,
      sparkles: true,
      garlands: true,
      lights: true,
      ornaments: true,
      accent: true,
      santa: true,
      audio: false,
      performanceMode: "auto", // auto | low | high
      zIndex: 2147483000,
    },
    nodes: {},
    timers: [],
    rafs: [],
    listeners: [],
  };

  // ---------- Utilities ----------
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function safeId(prefix = "chrismas") {
    return `${prefix}-${Math.random().toString(16).slice(2)}`;
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  function detectBrightness() {
    // Estimate page brightness from computed background colors.
    // Falls back to white/black assumptions if not measurable.
    const el = document.body || document.documentElement;
    const bg = getComputedStyle(el).backgroundColor || "rgb(255,255,255)";
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return 0.8;
    const r = +m[1], g = +m[2], b = +m[3];
    // Relative luminance
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return lum;
  }

  function detectTheme() {
    const lum = detectBrightness();
    // If the body is dark, use dark christmas overlay.
    return lum < 0.45 ? "dark" : "light";
  }

  function detectPerformanceMode() {
    // Auto: prefer low for mobile / low core / reduced motion
    const cores = navigator.hardwareConcurrency || 4;
    if (prefersReducedMotion()) return "low";
    if (isTouchDevice()) return "low";
    if (cores <= 4) return "low";
    return "high";
  }

  function create(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "style") Object.assign(el.style, v);
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null) el.setAttribute(k, String(v));
    }
    for (const c of children) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    return el;
  }

  function addStyle(cssText) {
    const style = create("style", { "data-chrismas": "true" });
    style.textContent = cssText;
    document.head.appendChild(style);
    Chrismas.nodes.style = style;
    return style;
  }

  function addListener(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    Chrismas.listeners.push(() => target.removeEventListener(type, fn, opts));
  }

  function addTimer(id) {
    Chrismas.timers.push(() => clearInterval(id));
  }
  function addTimeout(id) {
    Chrismas.timers.push(() => clearTimeout(id));
  }
  function addRAF(cancelFn) {
    Chrismas.rafs.push(cancelFn);
  }

  function nowYear() {
    try { return new Date().getFullYear(); } catch { return 2025; }
  }

  // ---------- Core CSS Theme ----------
  function buildCSS(palette) {
    const z = Chrismas.state.zIndex;

    return `
/* === chrismas.js overlay base === */
:root {
  --xmas-red: ${palette.red};
  --xmas-green: ${palette.green};
  --xmas-gold: ${palette.gold};
  --xmas-ice: ${palette.ice};
  --xmas-ink: ${palette.ink};
  --xmas-glow: ${palette.glow};
  --xmas-bg-soft: ${palette.bgSoft};
  --xmas-shadow: rgba(0,0,0,0.2);
  --xmas-radius: 14px;
}

[data-chrismas-root] {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: ${z};
}

[data-chrismas-ui] {
  pointer-events: auto;
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: ${z + 10};
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  color: var(--xmas-ink);
}

[data-chrismas-card] {
  width: 290px;
  background: ${palette.uiBg};
  border: 1px solid ${palette.uiBorder};
  box-shadow: 0 14px 40px rgba(0,0,0,0.22);
  border-radius: var(--xmas-radius);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

[data-chrismas-head] {
  padding: 12px 12px 10px 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  background: linear-gradient(135deg, ${palette.uiGradA}, ${palette.uiGradB});
}

[data-chrismas-badge]{
  width: 36px; height: 36px;
  border-radius: 12px;
  background: radial-gradient(circle at 30% 30%, var(--xmas-gold), var(--xmas-red));
  box-shadow: 0 10px 18px rgba(0,0,0,0.18);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 800;
  letter-spacing: .5px;
}

[data-chrismas-title]{
  display:flex; flex-direction:column; line-height:1.05;
}
[data-chrismas-title] b{ font-size: 14px; }
[data-chrismas-title] span{ font-size: 12px; opacity: .9; }

[data-chrismas-body] { padding: 12px; display: grid; gap: 10px; }
[data-chrismas-row] { display:flex; justify-content:space-between; align-items:center; gap: 10px; }
[data-chrismas-row] label { font-size: 13px; opacity: .95; }
[data-chrismas-row] small { font-size: 11px; opacity: .75; }

[data-chrismas-btns]{ display:flex; gap:8px; margin-top: 6px; }
[data-chrismas-btn]{
  flex:1;
  padding: 9px 10px;
  border-radius: 12px;
  border: 1px solid ${palette.uiBorder};
  background: ${palette.btnBg};
  color: var(--xmas-ink);
  font-weight: 700;
  cursor: pointer;
}
[data-chrismas-btn]:hover{ filter: brightness(1.03); }
[data-chrismas-btn][data-primary="true"]{
  background: linear-gradient(135deg, var(--xmas-green), var(--xmas-red));
  border-color: transparent;
  color: #fff;
}

[data-chrismas-min]{
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: ${z + 10};
  pointer-events:auto;
  width: 50px; height: 50px;
  border-radius: 16px;
  border: 1px solid ${palette.uiBorder};
  background: ${palette.uiBg};
  box-shadow: 0 14px 40px rgba(0,0,0,0.22);
  display:none;
  cursor:pointer;
}
[data-chrismas-min] div{
  width: 100%; height: 100%;
  display:grid; place-items:center;
  font-size: 22px;
}

[data-chrismas-switch]{
  width: 44px; height: 26px;
  background: ${palette.switchBg};
  border: 1px solid ${palette.uiBorder};
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  flex: 0 0 auto;
}
[data-chrismas-switch] i{
  position:absolute;
  top: 2px;
  left: 2px;
  width: 22px; height: 22px;
  border-radius: 999px;
  background: ${palette.knobBg};
  box-shadow: 0 6px 14px rgba(0,0,0,0.18);
  transition: transform .18s ease;
}
[data-chrismas-switch][data-on="true"]{
  background: linear-gradient(135deg, var(--xmas-green), var(--xmas-red));
  border-color: transparent;
}
[data-chrismas-switch][data-on="true"] i{ transform: translateX(18px); }

[data-chrismas-slider]{
  width: 100%;
  accent-color: ${palette.sliderAccent};
}

/* Zina: garlands + lights */
[data-chrismas-garland]{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 130px;
  z-index: ${z};
  pointer-events: none;
  background: radial-gradient(circle at 10% 35%, rgba(255,255,255,0.18), transparent 55%),
              radial-gradient(circle at 80% 30%, rgba(255,255,255,0.12), transparent 55%);
}

[data-chrismas-garland] svg{
  width: 100%;
  height: 100%;
}

[data-chrismas-snow]{
  position: fixed;
  inset: 0;
  z-index: ${z - 1};
  pointer-events: none;
}

[data-chrismas-sparkle]{
  position: fixed;
  inset: 0;
  z-index: ${z + 1};
  pointer-events:none;
}

[data-chrismas-accent]{
  position: fixed;
  inset: 0;
  z-index: ${z - 2};
  pointer-events:none;
  mix-blend-mode: ${palette.blendMode};
  opacity: ${clamp(Chrismas.state.intensity, 0.2, 1)};
}

[data-chrismas-accent]::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 20% 20%, rgba(0,255,180,0.10), transparent 40%),
    radial-gradient(circle at 80% 30%, rgba(255,80,120,0.10), transparent 42%),
    radial-gradient(circle at 30% 90%, rgba(255,220,120,0.08), transparent 40%);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce){
  [data-chrismas-snow], [data-chrismas-sparkle] { display:none !important; }
}
`;
  }

  function computePalette(mode) {
    const theme = mode === "auto" ? detectTheme() : mode;
    const dark = theme === "dark";

    // More “premium” colors (not neon).
    const palette = {
      red: "#E11D48",    // rose-600
      green: "#16A34A",  // green-600
      gold: "#F59E0B",   // amber-500
      ice: "#38BDF8",    // sky-400
      ink: dark ? "rgba(255,255,255,0.92)" : "rgba(17,24,39,0.92)",
      glow: dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.10)",
      bgSoft: dark ? "rgba(15,23,42,0.18)" : "rgba(255,255,255,0.18)",
      uiBg: dark ? "rgba(15, 23, 42, 0.78)" : "rgba(255,255,255,0.82)",
      uiBorder: dark ? "rgba(148,163,184,0.28)" : "rgba(15,23,42,0.12)",
      uiGradA: dark ? "rgba(22,101,52,0.28)" : "rgba(22,163,74,0.18)",
      uiGradB: dark ? "rgba(225,29,72,0.22)" : "rgba(225,29,72,0.12)",
      btnBg: dark ? "rgba(30,41,59,0.72)" : "rgba(255,255,255,0.88)",
      switchBg: dark ? "rgba(30,41,59,0.9)" : "rgba(255,255,255,0.9)",
      knobBg: dark ? "rgba(255,255,255,0.92)" : "rgba(15,23,42,0.90)",
      sliderAccent: dark ? "#F59E0B" : "#E11D48",
      blendMode: dark ? "screen" : "multiply",
      dark,
    };

    return palette;
  }

  // ---------- Garlands / Lights / Ornaments (Zina) ----------
  function createGarlandLayer(palette) {
    const root = create("div", { "data-chrismas-garland": "true" });
    // SVG garland with lights + ornaments
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 1200 200");
    svg.setAttribute("preserveAspectRatio", "none");

    // Rope path
    const rope = document.createElementNS(svgNS, "path");
    rope.setAttribute("d", "M0,50 C150,150 300,10 450,90 C600,170 750,20 900,100 C1050,180 1150,30 1200,70");
    rope.setAttribute("fill", "none");
    rope.setAttribute("stroke", palette.dark ? "rgba(255,255,255,0.40)" : "rgba(17,24,39,0.35)");
    rope.setAttribute("stroke-width", "6");
    rope.setAttribute("stroke-linecap", "round");

    svg.appendChild(rope);

    // Garland leaves (simple thick stroke behind)
    const garland = document.createElementNS(svgNS, "path");
    garland.setAttribute("d", "M0,56 C150,156 300,16 450,96 C600,176 750,26 900,106 C1050,186 1150,36 1200,76");
    garland.setAttribute("fill", "none");
    garland.setAttribute("stroke", palette.dark ? "rgba(34,197,94,0.35)" : "rgba(22,163,74,0.30)");
    garland.setAttribute("stroke-width", "16");
    garland.setAttribute("stroke-linecap", "round");
    svg.appendChild(garland);

    // Lights along the rope
    const bulbs = document.createElementNS(svgNS, "g");
    const count = 28;
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1)) * 1200;
      const y = 50 + Math.sin((i / (count - 1)) * Math.PI * 5) * 35 + (i % 2 ? 8 : -6);
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(2));
      c.setAttribute("cy", y.toFixed(2));
      c.setAttribute("r", (i % 3 === 0 ? 8 : 6).toString());
      const color = pick([palette.red, palette.green, palette.gold, palette.ice]);
      c.setAttribute("fill", color);
      c.setAttribute("opacity", palette.dark ? "0.85" : "0.78");

      const glow = document.createElementNS(svgNS, "circle");
      glow.setAttribute("cx", x.toFixed(2));
      glow.setAttribute("cy", y.toFixed(2));
      glow.setAttribute("r", (i % 3 === 0 ? 16 : 13).toString());
      glow.setAttribute("fill", color);
      glow.setAttribute("opacity", palette.dark ? "0.14" : "0.10");

      bulbs.appendChild(glow);
      bulbs.appendChild(c);
    }
    svg.appendChild(bulbs);

    // Ornaments hanging
    const ornaments = document.createElementNS(svgNS, "g");
    for (let i = 0; i < 10; i++) {
      const x = 80 + i * 115 + (i % 2 ? 18 : -12);
      const y = 70 + (i % 3) * 6;
      const string = document.createElementNS(svgNS, "line");
      string.setAttribute("x1", x);
      string.setAttribute("y1", y);
      string.setAttribute("x2", x);
      string.setAttribute("y2", y + 34);
      string.setAttribute("stroke", palette.dark ? "rgba(255,255,255,0.35)" : "rgba(17,24,39,0.25)");
      string.setAttribute("stroke-width", "2");

      const ball = document.createElementNS(svgNS, "circle");
      ball.setAttribute("cx", x);
      ball.setAttribute("cy", y + 50);
      ball.setAttribute("r", (i % 3 === 0 ? 14 : 12).toString());
      ball.setAttribute("fill", pick([palette.red, palette.green, palette.gold]));
      ball.setAttribute("opacity", palette.dark ? "0.82" : "0.76");

      const highlight = document.createElementNS(svgNS, "circle");
      highlight.setAttribute("cx", x - 4);
      highlight.setAttribute("cy", y + 46);
      highlight.setAttribute("r", "5");
      highlight.setAttribute("fill", "rgba(255,255,255,0.65)");

      ornaments.appendChild(string);
      ornaments.appendChild(ball);
      ornaments.appendChild(highlight);
    }
    svg.appendChild(ornaments);

    root.appendChild(svg);

    // Twinkle animation via JS (safe: low frequency)
    if (!Chrismas.state.reducedMotion && Chrismas.state.lights) {
      const circles = Array.from(bulbs.querySelectorAll("circle")).filter((_, idx) => idx % 2 === 1); // main bulbs
      const interval = setInterval(() => {
        for (const c of circles) {
          const o = parseFloat(c.getAttribute("opacity") || "0.8");
          const n = clamp(o + rand(-0.18, 0.18), 0.45, 0.95);
          c.setAttribute("opacity", n.toFixed(2));
        }
      }, Chrismas.state.performanceMode === "low" ? 900 : 550);
      addTimer(interval);
    }

    return root;
  }

  // ---------- Snow Canvas ----------
  function createSnowLayer() {
    const canvas = create("canvas", { "data-chrismas-snow": "true" });
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0, h = 0;
    const flakes = [];
    const mode = Chrismas.state.performanceMode;

    function resize() {
      w = canvas.width = Math.floor(window.innerWidth * (devicePixelRatio || 1));
      h = canvas.height = Math.floor(window.innerHeight * (devicePixelRatio || 1));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      flakes.length = 0;

      const base = mode === "low" ? 70 : 140;
      const n = Math.floor(base * Chrismas.state.intensity);

      for (let i = 0; i < n; i++) {
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: rand(1.2, mode === "low" ? 3.2 : 4.8) * (devicePixelRatio || 1),
          vy: rand(0.6, mode === "low" ? 2.0 : 2.8) * (devicePixelRatio || 1),
          vx: rand(-0.35, 0.35) * (devicePixelRatio || 1),
          wobble: rand(0.0005, 0.0018),
          phase: Math.random() * Math.PI * 2,
          a: rand(0.25, 0.85),
        });
      }
    }

    function draw(t) {
      if (!Chrismas.state.enabled || !Chrismas.state.snow) return;
      ctx.clearRect(0, 0, w, h);

      // Soft white flakes
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      for (const f of flakes) {
        f.phase += f.wobble * (mode === "low" ? 900 : 1200);
        f.x += f.vx + Math.sin(f.phase) * 0.35 * (devicePixelRatio || 1);
        f.y += f.vy;

        if (f.y > h + 10) {
          f.y = -10;
          f.x = Math.random() * w;
        }
        if (f.x < -10) f.x = w + 10;
        if (f.x > w + 10) f.x = -10;

        ctx.globalAlpha = f.a;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const rafId = requestAnimationFrame(draw);
      addRAF(() => cancelAnimationFrame(rafId));
    }

    addListener(window, "resize", () => resize(), { passive: true });
    resize();

    if (!Chrismas.state.reducedMotion) {
      const rafId = requestAnimationFrame(draw);
      addRAF(() => cancelAnimationFrame(rafId));
    }
    return canvas;
  }

  // ---------- Sparkles (mouse trail) ----------
  function createSparkleLayer() {
    const canvas = create("canvas", { "data-chrismas-sparkle": "true" });
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0, h = 0;
    let particles = [];
    let last = { x: null, y: null, t: 0 };
    const mode = Chrismas.state.performanceMode;

    function resize() {
      w = canvas.width = Math.floor(window.innerWidth * (devicePixelRatio || 1));
      h = canvas.height = Math.floor(window.innerHeight * (devicePixelRatio || 1));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }

    function spawn(x, y) {
      const max = mode === "low" ? 4 : 8;
      const count = Math.floor(max * Chrismas.state.intensity);
      for (let i = 0; i < count; i++) {
        particles.push({
          x, y,
          vx: rand(-0.8, 0.8) * (devicePixelRatio || 1),
          vy: rand(-1.4, -0.2) * (devicePixelRatio || 1),
          life: rand(18, mode === "low" ? 28 : 36),
          r: rand(1.2, 2.8) * (devicePixelRatio || 1),
          a: rand(0.25, 0.7),
        });
      }
      if (particles.length > 700) particles = particles.slice(-450);
    }

    function draw() {
      if (!Chrismas.state.enabled || !Chrismas.state.sparkles) return;

      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03 * (devicePixelRatio || 1);
        p.life -= 1;

        const alpha = clamp((p.life / 36) * p.a, 0, 1);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      particles = particles.filter(p => p.life > 0);

      const rafId = requestAnimationFrame(draw);
      addRAF(() => cancelAnimationFrame(rafId));
    }

    addListener(window, "resize", () => resize(), { passive: true });
    resize();

    // Mouse / touch
    const move = (e) => {
      if (!Chrismas.state.enabled || !Chrismas.state.sparkles) return;
      const t = performance.now();
      if (t - last.t < (mode === "low" ? 40 : 18)) return;

      const pt = e.touches ? e.touches[0] : e;
      const x = (pt.clientX || 0) * (devicePixelRatio || 1);
      const y = (pt.clientY || 0) * (devicePixelRatio || 1);

      if (last.x == null) {
        last.x = x; last.y = y; last.t = t;
        spawn(x, y);
        return;
      }

      const dx = x - last.x, dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > (mode === "low" ? 18 : 10)) spawn(x, y);

      last.x = x; last.y = y; last.t = t;
    };

    addListener(window, "mousemove", move, { passive: true });
    addListener(window, "touchmove", move, { passive: true });

    if (!Chrismas.state.reducedMotion) {
      const rafId = requestAnimationFrame(draw);
      addRAF(() => cancelAnimationFrame(rafId));
    }

    return canvas;
  }

  // ---------- Accent overlay ----------
  function createAccentLayer() {
    return create("div", { "data-chrismas-accent": "true" });
  }

  // ---------- UI Panel ----------
  function makeSwitch(on, onToggle) {
    const sw = create("div", { "data-chrismas-switch": "true", "data-on": String(!!on) });
    const knob = create("i");
    sw.appendChild(knob);
    sw.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const cur = sw.getAttribute("data-on") === "true";
      sw.setAttribute("data-on", String(!cur));
      onToggle(!cur);
    });
    return sw;
  }

  function buildUI(palette) {
    const ui = create("div", { "data-chrismas-ui": "true" });

    const card = create("div", { "data-chrismas-card": "true" });

    const head = create("div", { "data-chrismas-head": "true" }, [
      create("div", { "data-chrismas-badge": "true" }, ["🎄"]),
      create("div", { "data-chrismas-title": "true" }, [
        create("b", {}, ["Chrismas Theme"]),
        create("span", {}, [`Smart universal • ${nowYear()}`]),
      ]),
    ]);

    const body = create("div", { "data-chrismas-body": "true" });

    // Intensity slider
    const intensityRow = create("div", { "data-chrismas-row": "true" }, [
      create("div", {}, [
        create("label", {}, ["Intensity"]),
        create("div", {}, [create("small", {}, ["More/less effects"])])
      ]),
    ]);
    const slider = create("input", {
      type: "range",
      min: "0",
      max: "1",
      step: "0.05",
      value: String(Chrismas.state.intensity),
      class: "data-chrismas-slider"
    });
    slider.className = "x";
    slider.setAttribute("data-chrismas-slider", "true");
    slider.addEventListener("input", () => {
      Chrismas.state.intensity = clamp(parseFloat(slider.value), 0, 1);
      // update accent opacity
      const accent = Chrismas.nodes.accent;
      if (accent) accent.style.opacity = String(clamp(Chrismas.state.intensity, 0.2, 1));
      // trigger snow rebuild by restart
      Chrismas.refresh();
    });

    body.appendChild(intensityRow);
    body.appendChild(slider);

    const rows = [
      ["Snow", "Gentle falling snow", "snow"],
      ["Sparkles", "Mouse/touch sparkle trail", "sparkles"],
      ["Garlands", "Top decorations (zina)", "garlands"],
      ["Lights", "Twinkling bulbs", "lights"],
      ["Ornaments", "Hanging ornaments", "ornaments"],
      ["Accent", "Subtle holiday tint", "accent"],
      ["Santa", "Small surprise easter egg", "santa"],
    ];

    rows.forEach(([title, desc, key]) => {
      const row = create("div", { "data-chrismas-row": "true" });
      const left = create("div", {}, [
        create("label", {}, [title]),
        create("div", {}, [create("small", {}, [desc])])
      ]);
      const sw = makeSwitch(Chrismas.state[key], (v) => {
        Chrismas.state[key] = v;
        Chrismas.refresh();
      });
      row.appendChild(left);
      row.appendChild(sw);
      body.appendChild(row);
    });

    const btns = create("div", { "data-chrismas-btns": "true" });

    const btnClose = create("button", { "data-chrismas-btn": "true", type: "button" }, ["Minimize"]);
    btnClose.addEventListener("click", () => {
      card.style.display = "none";
      min.style.display = "block";
    });

    const btnOff = create("button", { "data-chrismas-btn": "true", type: "button" }, ["Stop"]);
    btnOff.addEventListener("click", () => Chrismas.stop());

    const btnOn = create("button", { "data-chrismas-btn": "true", "data-primary": "true", type: "button" }, ["Refresh"]);
    btnOn.addEventListener("click", () => Chrismas.refresh());

    btns.appendChild(btnClose);
    btns.appendChild(btnOff);
    btns.appendChild(btnOn);

    body.appendChild(btns);

    card.appendChild(head);
    card.appendChild(body);

    const min = create("div", { "data-chrismas-min": "true", title: "Open Chrismas UI" }, [
      create("div", {}, ["🎁"]),
    ]);
    min.addEventListener("click", () => {
      min.style.display = "none";
      card.style.display = "block";
    });

    ui.appendChild(card);
    ui.appendChild(min);

    return { ui, card, min };
  }

  // ---------- Santa Easter Egg ----------
  function attachSanta() {
    if (!Chrismas.state.santa || Chrismas.state.reducedMotion) return;

    const santa = create("div", {
      "data-chrismas-santa": "true",
      style: {
        position: "fixed",
        left: "-120px",
        top: `${Math.floor(rand(10, 35))}vh`,
        zIndex: Chrismas.state.zIndex + 2,
        pointerEvents: "none",
        fontSize: "52px",
        filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.25))",
        opacity: "0.92",
        transform: "translateZ(0)",
      }
    }, ["🎅"]);

    document.body.appendChild(santa);
    Chrismas.nodes.santa = santa;

    const duration = Chrismas.state.performanceMode === "low" ? 6500 : 5200;
    const start = performance.now();
    const fromX = -140;
    const toX = window.innerWidth + 140;
    const y = santa.style.top;

    function animate(t) {
      if (!Chrismas.state.enabled || !Chrismas.state.santa) return;
      const p = clamp((t - start) / duration, 0, 1);
      const x = fromX + (toX - fromX) * p;
      const bob = Math.sin(p * Math.PI * 8) * 6;
      santa.style.transform = `translate(${x}px, ${bob}px)`;

      if (p < 1) {
        const id = requestAnimationFrame(animate);
        addRAF(() => cancelAnimationFrame(id));
      } else {
        santa.remove();
        Chrismas.nodes.santa = null;
      }
    }

    const id = requestAnimationFrame(animate);
    addRAF(() => cancelAnimationFrame(id));
  }

  // ---------- Mount/Unmount ----------
  Chrismas.mount = function mount() {
    if (Chrismas.state.enabled) return;

    Chrismas.state.enabled = true;
    Chrismas.state.reducedMotion = prefersReducedMotion();
    if (Chrismas.state.performanceMode === "auto") {
      Chrismas.state.performanceMode = detectPerformanceMode();
    }

    const palette = computePalette(Chrismas.state.theme);
    Chrismas.nodes.palette = palette;

    addStyle(buildCSS(palette));

    // Root overlay container
    const root = create("div", { "data-chrismas-root": "true" });
    document.body.appendChild(root);
    Chrismas.nodes.root = root;

    // Accent
    if (Chrismas.state.accent) {
      const accent = createAccentLayer();
      root.appendChild(accent);
      Chrismas.nodes.accent = accent;
    }

    // Garland (zina)
    if (Chrismas.state.garlands || Chrismas.state.lights || Chrismas.state.ornaments) {
      const garland = createGarlandLayer(palette);
      root.appendChild(garland);
      Chrismas.nodes.garland = garland;
    }

    // Snow
    if (Chrismas.state.snow && !Chrismas.state.reducedMotion) {
      const snow = createSnowLayer();
      root.appendChild(snow);
      Chrismas.nodes.snow = snow;
    }

    // Sparkles
    if (Chrismas.state.sparkles && !Chrismas.state.reducedMotion) {
      const spark = createSparkleLayer();
      root.appendChild(spark);
      Chrismas.nodes.spark = spark;
    }

    // UI
    const { ui } = buildUI(palette);
    document.body.appendChild(ui);
    Chrismas.nodes.ui = ui;

    // Santa sometimes
    const delay = Math.floor(rand(900, 2200));
    const tid = setTimeout(() => attachSanta(), delay);
    addTimeout(tid);

    // Keyboard shortcut: Ctrl+Shift+X toggle UI
    addListener(window, "keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "X" || e.key === "x")) {
        const card = Chrismas.nodes.ui?.querySelector("[data-chrismas-card]");
        const min = Chrismas.nodes.ui?.querySelector("[data-chrismas-min]");
        if (!card || !min) return;
        const isHidden = card.style.display === "none";
        card.style.display = isHidden ? "block" : "none";
        min.style.display = isHidden ? "none" : "block";
      }
    });
  };

  Chrismas.unmount = function unmount() {
    Chrismas.state.enabled = false;

    // clear timers / rafs / listeners
    for (const c of Chrismas.timers.splice(0)) try { c(); } catch {}
    for (const c of Chrismas.rafs.splice(0)) try { c(); } catch {}
    for (const c of Chrismas.listeners.splice(0)) try { c(); } catch {}

    // remove nodes
    const keys = ["ui", "root", "style", "santa"];
    for (const k of keys) {
      const n = Chrismas.nodes[k];
      if (n && n.remove) try { n.remove(); } catch {}
      Chrismas.nodes[k] = null;
    }
  };

  // ---------- Public API ----------
  Chrismas.start = function start(options = {}) {
    // merge options safely
    const s = Chrismas.state;
    const allowed = Object.keys(s);
    for (const [k, v] of Object.entries(options)) {
      if (allowed.includes(k)) s[k] = v;
    }
    // auto theme
    if (s.theme === "auto") s.theme = "auto";
    Chrismas.mount();
    return Chrismas;
  };

  Chrismas.stop = function stop() {
    Chrismas.unmount();
    return Chrismas;
  };

  Chrismas.refresh = function refresh() {
    if (!Chrismas.state.enabled) return Chrismas.start();
    // re-create overlay to apply toggles
    Chrismas.unmount();
    Chrismas.mount();
    return Chrismas;
  };

  Chrismas.set = function set(key, value) {
    if (key in Chrismas.state) {
      Chrismas.state[key] = value;
      Chrismas.refresh();
    }
    return Chrismas;
  };

  Chrismas.get = function get() {
    return { ...Chrismas.state };
  };

  // Expose globally
  window.Chrismas = Chrismas;

  // Auto-start if user sets window.CHRISMAS_AUTO = true before loading
  if (window.CHRISMAS_AUTO === true) {
    Chrismas.start();
  }
})();
