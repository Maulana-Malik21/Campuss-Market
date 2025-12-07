// js/auth.js - FINAL FIX (NO DOUBLE LOGIN)

document.addEventListener('DOMContentLoaded', () => {
    // 1. ELEMEN
    const loginBtn = document.getElementById('loginBtn'); 
    const mobileLoginBtn = document.getElementById('mobileLoginBtn'); 
    const mobileLoginIcon = document.getElementById('mobileLoginIcon'); 
    
    // Desktop Elements
    const loggedInState = document.getElementById('loggedInState'); 
    const userNameDisplay = document.getElementById('userNameDisplay'); 
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Mobile Elements
    const mobileUserDropdown = document.getElementById('mobileUserDropdown');
    const mobileUserNameDisplay = document.getElementById('mobileUserNameDisplay');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

    // Auth Modal
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalArea = document.getElementById('closeModalArea');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toRegister = document.getElementById('toRegister');
    const toLogin = document.getElementById('toLogin');
    
    // Mobile Menu Elements
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileBtn = document.getElementById('closeMobileMenuBtn');
    const mobileSearch = document.getElementById('mobileSearchInput');

    // 2. LOGIC MOBILE MENU
    function openMobileMenu() {
        if(mobileMenu) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('menu-open'); 
        }
    }

    function closeMobileMenu() {
        if(mobileMenu) {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('menu-open'); 
        }
    }

    if(mobileBtn) mobileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openMobileMenu();
    });

    if(closeMobileBtn) closeMobileBtn.addEventListener('click', closeMobileMenu);

    if(mobileMenu) {
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    if(mobileSearch) {
        mobileSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = e.target.value.trim();
                if(keyword) {
                    window.location.href = `collection.html?search=${encodeURIComponent(keyword)}`;
                    closeMobileMenu();
                }
            }
        });
    }

    // 3. LOGIC AUTH & SESSION (PERBAIKAN UTAMA DISINI)
    function checkSession() {
        const user = localStorage.getItem('compassCurrentSession');
        
        if (user) {
            const simpleName = user.split('@')[0];
            const displayName = `Hi, ${simpleName.charAt(0).toUpperCase() + simpleName.slice(1)}`;

            // === SUDAH LOGIN ===
            
            // Desktop: Sembunyikan Teks Login
            if(loginBtn) {
                loginBtn.classList.add('hidden');
                loginBtn.classList.remove('md:block'); 
            }
            if(loggedInState) loggedInState.classList.remove('hidden');
            if(userNameDisplay) userNameDisplay.textContent = displayName;

            // Mobile: Sembunyikan Teks Login, Tampilkan Icon
            if(mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
            if(mobileLoginIcon) mobileLoginIcon.classList.remove('hidden');
            if(mobileUserNameDisplay) mobileUserNameDisplay.textContent = displayName;

        } else {
            // === BELUM LOGIN ===
            
            // Desktop: Pastikan Teks Login Desktop HANYA muncul di Desktop
            if(loginBtn) {
                // FIX: Jangan hapus 'hidden', tapi tambahkan 'md:block'
                // Ini artinya: Default tersembunyi (mobile), tapi Muncul (block) saat layar medium ke atas
                loginBtn.classList.add('hidden'); 
                loginBtn.classList.add('md:block'); 
            }
            if(loggedInState) loggedInState.classList.add('hidden');

            // Mobile: Tampilkan Teks Login Mobile, Sembunyikan Icon
            if(mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
            if(mobileLoginIcon) mobileLoginIcon.classList.add('hidden');
            if(mobileUserDropdown) mobileUserDropdown.classList.add('hidden');
        }
        updateNavbarCart();
    }

    function updateNavbarCart() {
        const cart = JSON.parse(localStorage.getItem('compassCart')) || [];
        const badge = document.getElementById('cart-badge');
        if(badge) {
            if (cart.length > 0) {
                badge.innerText = cart.length;
                badge.classList.remove('scale-0');
            } else {
                badge.classList.add('scale-0');
            }
        }
    }

    // Modal Controls
    function openModal() {
        if(authModal) {
            authModal.classList.remove('hidden');
            closeMobileMenu();
            if(loginForm) loginForm.classList.remove('hidden');
            if(registerForm) registerForm.classList.add('hidden');
        }
    }

    // Event Listeners Klik
    if(loginBtn) loginBtn.addEventListener('click', openModal);
    if(mobileLoginBtn) mobileLoginBtn.addEventListener('click', openModal); 
    
    // Toggle Dropdown Mobile
    if(mobileLoginIcon) {
        mobileLoginIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            if(mobileUserDropdown) {
                mobileUserDropdown.classList.toggle('hidden');
            }
        });
    }

    // Close Dropdown on Click Outside
    document.addEventListener('click', (e) => {
        if(mobileUserDropdown && !mobileUserDropdown.classList.contains('hidden')) {
            if (!mobileLoginIcon.contains(e.target) && !mobileUserDropdown.contains(e.target)) {
                mobileUserDropdown.classList.add('hidden');
            }
        }
    });
    
    if(closeModalBtn) closeModalBtn.addEventListener('click', () => authModal.classList.add('hidden'));
    if(closeModalArea) closeModalArea.addEventListener('click', () => authModal.classList.add('hidden'));

    if(toRegister) toRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    if(toLogin) toLogin.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Login Submit
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim().toLowerCase();
            const pass = document.getElementById('loginPass').value.trim();
            let users = JSON.parse(localStorage.getItem('compassUsers')) || [];
            const validUser = users.find(u => u.email === email && u.password === pass);

            if (validUser) {
                localStorage.setItem('compassCurrentSession', email);
                alert("Login Berhasil!");
                authModal.classList.add('hidden');
                checkSession(); 
                loginForm.reset();
            } else {
                alert("Email atau Password salah!");
            }
        });
    }

    // Register Submit
    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('regEmail').value.trim().toLowerCase();
            const pass = document.getElementById('regPass').value.trim();
            let users = JSON.parse(localStorage.getItem('compassUsers')) || [];
            if (users.find(u => u.email === email)) {
                alert("Email sudah terdaftar!"); return;
            }
            users.push({ email: email, password: pass });
            localStorage.setItem('compassUsers', JSON.stringify(users));
            alert("Registrasi Berhasil! Silakan Login.");
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            registerForm.reset();
        });
    }

    // Logout Logic
    function performLogout() {
        if(confirm("Logout dari akun?")) {
            localStorage.removeItem('compassCurrentSession');
            checkSession(); 
            window.location.href = 'index.html';
        }
    }

    if(logoutBtn) logoutBtn.addEventListener('click', performLogout);
    if(mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', performLogout);

    // Init
    checkSession();
});