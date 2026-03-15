
//     // --- UI LOGIC (Menus) ---
//     const menuToggle = document.getElementById('menuToggle');
//     const navMenu = document.getElementById('navMenu');
//     const mobileSearchBtn = document.getElementById('mobileSearchBtn');
//     const searchBar = document.getElementById('searchBar');
//     const searchClose = document.getElementById('searchClose');

//     if(menuToggle && navMenu) {
//         menuToggle.addEventListener('click', () => {
//             if(searchBar) searchBar.classList.remove('active');
//             navMenu.classList.toggle('active');
//             const icon = menuToggle.querySelector('i');
//             if (navMenu.classList.contains('active')) {
//                 icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark');
//             } else {
//                 icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars');
//             }
//         });
//     }
//     if(mobileSearchBtn && searchBar) {
//         mobileSearchBtn.addEventListener('click', () => {
//             if(navMenu) navMenu.classList.remove('active');
//             if(menuToggle) {
//                  const icon = menuToggle.querySelector('i');
//                  icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars');
//             }
//             searchBar.classList.toggle('active');
//             if(searchBar.classList.contains('active')) {
//                 const input = searchBar.querySelector('input');
//                 if(input) setTimeout(() => input.focus(), 100);
//             }
//         });
//     }
//     if(searchClose) {
//         searchClose.addEventListener('click', () => searchBar.classList.remove('active'));
//     }
    
//     // Tab Logic (Crucial for Description to show)
//     const tabBtns = document.querySelectorAll('.tab-btn');
//     const tabContents = document.querySelectorAll('.tab-content');
    
//     if(tabBtns.length > 0) {
//         tabBtns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 // Remove active from all
//                 tabBtns.forEach(b => b.classList.remove('active'));
//                 tabContents.forEach(c => c.classList.remove('active'));
                
//                 // Add active to click
//                 btn.classList.add('active');
//                 const targetId = btn.getAttribute('data-target');
//                 const targetContent = document.getElementById(targetId);
//                 if(targetContent) {
//                     targetContent.classList.add('active');
//                 }
//             });
//         });
//     }






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

// // // Add this to script.js for theme toggle button
// // function initThemeToggle() {
// //     const toggleBtn = document.getElementById('theme-toggle');
// //     if (!toggleBtn) return;
    
// //     toggleBtn.addEventListener('click', () => {
// //         const currentTheme = getCurrentTheme();
// //         const html = document.documentElement;
        
// //         if (currentTheme === 'dark') {
// //             setTheme('light');
// //         } else if (currentTheme === 'light') {
// //             // If switching from light, check if system preference exists
// //             if (!localStorage.getItem('theme-preference')) {
// //                 setTheme('system');
// //             } else {
// //                 setTheme('dark');
// //             }
// //         } else {
// //             // If system, switch to dark
// //             setTheme('dark');
// //         }
// //     });
// // }

// // // Call this in your DOMContentLoaded event
// // // initThemeToggle();




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


// =========================================
// 2. NAVBAR & MOBILE UI LOGIC
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const customToggle = document.getElementById('customMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const navSearchInput = document.getElementById('navSearchInput');

    // Handle Hamburger click
    if (customToggle && navMenu) {
        customToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            customToggle.classList.toggle('open'); 
            navMenu.classList.toggle('active'); 
            
            // Close search if open
            if (searchBar && searchBar.classList.contains('active')) {
                searchBar.classList.remove('active');
            }
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !customToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    customToggle.classList.remove('open');
                }
            }
        });
        
        navMenu.addEventListener('click', (e) => e.stopPropagation());
    }

    // Handle Search Icon click
    if (mobileSearchBtn && searchBar) {
        mobileSearchBtn.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            
            // Focus the input automatically when opening on mobile
            if (searchBar.classList.contains('active') && navSearchInput) {
                setTimeout(() => navSearchInput.focus(), 100);
            }

            // Close menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (customToggle) customToggle.classList.remove('open');
            }
        });
    }

    // Handle Close Search 'X' button
    if (searchClose && searchBar) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
        });
    }
});




// document.addEventListener("DOMContentLoaded", () => {
//     const menuToggle = document.getElementById('menuToggle');
//     const navMenu = document.getElementById('navMenu');

//     if (menuToggle && navMenu) {
//         menuToggle.addEventListener('click', (e) => {
//             e.stopPropagation();
//             navMenu.classList.toggle('active');
//             menuToggle.classList.toggle('open'); // This triggers the CSS animation
//         });

//         document.addEventListener('click', (e) => {
//             if (navMenu.classList.contains('active')) {
//                 if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
//                     navMenu.classList.remove('active');
//                     menuToggle.classList.remove('open'); // Reverts the "X" back to bars
//                 }
//             }
//         });
        
//         navMenu.addEventListener('click', (e) => e.stopPropagation());
//     }
// });




//         document.addEventListener("DOMContentLoaded", () => {
//             const customToggle = document.getElementById('customMenuToggle');
//             const navMenu = document.getElementById('navMenu');
//             const mobileSearchBtn = document.getElementById('mobileSearchBtn');
//             const searchBar = document.getElementById('searchBar');
//             const searchClose = document.getElementById('searchClose');
//             const navSearchInput = document.getElementById('navSearchInput');

//             // Handle Hamburger click
//             if(customToggle && navMenu) {
//                 customToggle.addEventListener('click', () => {
//                     customToggle.classList.toggle('open'); 
//                     navMenu.classList.toggle('active'); 
                    
//                     // Close search if open
//                     if(searchBar && searchBar.classList.contains('active')) {
//                         searchBar.classList.remove('active');
//                     }
//                 });
//             }

//             // Handle Search Icon click
//             if(mobileSearchBtn && searchBar) {
//                 mobileSearchBtn.addEventListener('click', () => {
//                     searchBar.classList.toggle('active');
                    
//                     // Focus the input automatically when opening on mobile
//                     if(searchBar.classList.contains('active') && navSearchInput) {
//                         setTimeout(() => navSearchInput.focus(), 100);
//                     }

//                     // Close menu if open
//                     if(navMenu && navMenu.classList.contains('active')) {
//                         navMenu.classList.remove('active');
//                         customToggle.classList.remove('open');
//                     }
//                 });
//             }

//             // Handle Close Search 'X' button
//             if(searchClose && searchBar) {
//                 searchClose.addEventListener('click', () => {
//                     searchBar.classList.remove('active');
//                 });
//             }
//         });












        