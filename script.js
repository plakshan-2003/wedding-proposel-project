// Sample Data with Placeholder Image URLs
const profiles = {
    girls: [
        { id: 1, name: 'Amelia', age: 24, phone: '071-XXX-4567', family: 'Doctors, 2 Siblings', img: 'https://images.unsplash.com/photo-1542385150-e8812c1df5c4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 2, name: 'Lila', age: 26, phone: '077-XXX-9876', family: 'Academics, Only Child', img: 'https://images.unsplash.com/photo-1522075782449-652395632d4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 5, name: 'Sofia', age: 23, phone: '071-XXX-1111', family: 'Teachers, 1 Sibling', img: 'https://images.unsplash.com/photo-1554167527-31b016e100f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
    boys: [
        { id: 3, name: 'Ethan', age: 28, phone: '075-XXX-1234', family: 'Engineers, 1 Sibling', img: 'https://images.unsplash.com/photo-1507003211169-0a816d5576ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 4, name: 'Noah', age: 29, phone: '076-XXX-5678', family: 'Entrepreneurs, 4 Siblings', img: 'https://images.unsplash.com/photo-1539571696357-5a7be1074cb3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 6, name: 'Kael', age: 30, phone: '075-XXX-2222', family: 'Architects, Only Child', img: 'https://images.unsplash.com/photo-1521119989665-27670e6e7300?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ]
};

// --- PWA Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('SW Registered:', reg))
            .catch(err => console.error('SW Registration failed:', err));
    });
}

// --- Dynamic Profile Loading ---
function loadProfiles(type) {
    const profileList = document.getElementById('profile-list');
    profileList.innerHTML = ''; // Clear previous profiles
    const data = profiles[type];

    if (!data) return;

    data.forEach(profile => {
        const profileHTML = `
            <div class="col-lg-4 col-md-6 mb-4 animate__animated animate__zoomIn">
                <div class="card h-100 shadow-lg border-bottom border-5 border-${type === 'girls' ? 'danger' : 'primary'}">
                    <img src="${profile.img}" class="card-img-top profile-img" alt="${profile.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title profile-name text-${type === 'girls' ? 'danger' : 'primary'} fw-bold">${profile.name}</h5>
                        <p class="card-text small mb-1">Age: <strong>${profile.age}</strong> | Phone: XXX-XXX-<span class="text-muted">${profile.phone.slice(-4)}</span></p>
                        <p class="text-muted small profile-family"><i class="fas fa-home me-1"></i> Family: ${profile.family}</p>
                        <button class="btn btn-${type === 'girls' ? 'danger' : 'primary'} select-btn mt-2" 
                                data-bs-toggle="modal" 
                                data-bs-target="#messageModal" 
                                data-name="${profile.name}">
                            <i class="fas fa-heart me-1"></i> Select & Propose
                        </button>
                    </div>
                </div>
            </div>
        `;
        profileList.innerHTML += profileHTML;
    });
}

// --- Message Modal Logic ---
const messageModal = document.getElementById('messageModal');
messageModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const recipientName = button.getAttribute('data-name');
    const modalTitle = messageModal.querySelector('#recipient-name');
    modalTitle.textContent = recipientName;
});

// Simulate message send action
document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const recipient = document.getElementById('recipient-name').textContent;
    const message = document.getElementById('messageText').value;

    if (message.length > 10) {
        alert(`SUCCESS! Your proposal message was sent to ${recipient}! \n\n(A backend system is required to handle real message delivery.)`);
        const modal = bootstrap.Modal.getInstance(messageModal);
        modal.hide();
        document.getElementById('messageText').value = ''; 
    } else {
        alert('Please write a heartfelt message longer than 10 characters!');
    }
});

// --- Admin Login Simulation ---
document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === 'admin123') {
        alert('Admin Login Successful! Showing Dashboard Overview.');
        document.getElementById('admin-dashboard-placeholder').style.display = 'block';
    } else {
        alert('Login Failed! (Hint: use admin/admin123 for demo)');
    }
});

// Load default profiles on page load
window.onload = () => {
    loadProfiles('girls');
};