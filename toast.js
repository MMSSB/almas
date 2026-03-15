// // toast.js
// export function showToast(message, type = 'success') {
//     // 1. Create Container if it doesn't exist
//     let container = document.getElementById('toast-container');
//     if (!container) {
//         container = document.createElement('div');
//         container.id = 'toast-container';
//         document.body.appendChild(container);
//     }

//     // 2. Create Toast Element
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
    
//     // 3. Choose Icon based on type
//     let icon = 'fa-check-circle';
//     if (type === 'error') icon = 'fa-circle-exclamation';
//     if (type === 'info') icon = 'fa-circle-info';

//     toast.innerHTML = `
//         <i class="fa-solid ${icon}"></i>
//         <span>${message}</span>
//     `;

//     // 4. Add to DOM
//     container.appendChild(toast);

//     // 5. Remove after 3 seconds
//     setTimeout(() => {
//         toast.style.animation = 'slideOut 0.3s forwards';
//         setTimeout(() => toast.remove(), 300);
//     }, 3000);
// }


export function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-circle-exclamation';
    
    toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}