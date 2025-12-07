// js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CEK LOGIN (Wajib)
    const currentUserEmail = localStorage.getItem('compassCurrentSession');
    if (!currentUserEmail) {
        window.location.href = 'index.html';
        return;
    }

    // --- VARIABLES ---
    const profileKey = `profile_${currentUserEmail}`; // Key unik per user
    let tempPhotoData = null; // Variabel sementara untuk foto baru

    // Elements
    const profileForm = document.getElementById('profileForm');
    const pName = document.getElementById('pName');
    const pEmail = document.getElementById('pEmail');
    const pGender = document.getElementById('pGender');
    const pPhone = document.getElementById('pPhone');
    const dobDay = document.getElementById('dobDay');
    const dobMonth = document.getElementById('dobMonth');
    const dobYear = document.getElementById('dobYear');
    const profilePreview = document.getElementById('profilePreview');
    const navName = document.getElementById('userNameDisplay'); // Nama di Navbar

    // --- 2. POPULATE DROPDOWN TANGGAL ---
    if (dobDay) {
        dobDay.innerHTML = '<option value="">Day</option>';
        for(let i=1; i<=31; i++) {
            dobDay.innerHTML += `<option value="${i}">${i}</option>`;
        }
    }

    // --- 3. LOAD DATA LAMA (JIKA ADA) ---
    const savedData = JSON.parse(localStorage.getItem(profileKey)) || {};

    // Isi Form dengan data yang tersimpan atau data default
    if (pEmail) pEmail.value = currentUserEmail;
    if (pName) pName.value = savedData.name || currentUserEmail.split('@')[0];
    if (pGender) pGender.value = savedData.gender || "";
    if (pPhone) pPhone.value = savedData.phone || "";
    if (dobDay) dobDay.value = savedData.dobDay || "";
    if (dobMonth) dobMonth.value = savedData.dobMonth || "";
    if (dobYear) dobYear.value = savedData.dobYear || "";
    
    // Tampilkan Foto Lama jika ada
    if (savedData.photo && profilePreview) {
        profilePreview.src = savedData.photo;
    }

    // --- 4. LOGIKA UPLOAD FOTO (PREVIEW) ---
    const imgTrigger = document.getElementById('imgUploadTrigger');
    const imgInput = document.getElementById('imgInput');

    if(imgTrigger && imgInput) {
        // Klik gambar -> Buka file explorer
        imgTrigger.addEventListener('click', () => {
            imgInput.click();
        });

        // Saat file dipilih
        imgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Tampilkan preview di layar
                    if(profilePreview) profilePreview.src = event.target.result;
                    // Simpan data gambar ke variabel sementara
                    tempPhotoData = event.target.result; 
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 5. LOGIKA TOMBOL SAVE (SUBMIT FORM) ---
    if(profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah reload halaman
            
            // Tentukan foto mana yang dipakai: Foto baru (temp) atau Foto lama
            const finalPhoto = tempPhotoData ? tempPhotoData : (savedData.photo || "");

            // Bungkus data baru
            const newData = {
                name: pName.value,
                gender: pGender.value,
                phone: pPhone.value,
                dobDay: dobDay.value,
                dobMonth: dobMonth.value,
                dobYear: dobYear.value,
                photo: finalPhoto 
            };

            // Simpan ke Local Storage
            localStorage.setItem(profileKey, JSON.stringify(newData));
            
            // Update Nama di Navbar (jika ada)
            if(navName) navName.innerText = `Hi, ${newData.name}`;

            // Beri Feedback
            alert("Profile updated successfully!");
        });
    } else {
        console.error("Form profileForm tidak ditemukan di HTML!");
    }

    // --- 6. LOGOUT BUTTON (Di Halaman Profile) ---
    const logoutBtnProfile = document.querySelector('#profileForm #logoutBtn'); // Selector khusus tombol logout di dalam form
    if(logoutBtnProfile) {
        logoutBtnProfile.addEventListener('click', (e) => {
            e.preventDefault(); // Cegah submit form saat klik logout
             if(confirm("Are you sure you want to logout?")) {
                localStorage.removeItem('compassCurrentSession');
                window.location.href = 'index.html';
            }
        });
    }
});