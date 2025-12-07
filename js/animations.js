const tl = gsap.timeline();

// 1. Tampilkan Teks COMPASS (Loader Text)
tl.to("#loader-text", { 
    opacity: 1, 
    duration: 0.8,
    ease: "power2.out" 
})
// 2. Preloader Naik ke Atas (Selesai Loading)
.to("#preloader", { 
    y: "-100%", 
    duration: 1.2, 
    ease: "power4.inOut", 
    delay: 0.2 
})

// --- FIX: Animasi Navbar dihapus agar tidak konflik dengan CSS sticky/transition ---
// Navbar akan otomatis terlihat saat preloader naik ke atas.

// 3. Teks Header Muncul (Hero Section)
.from("header h1", { 
    y: 100, 
    opacity: 0, 
    stagger: 0.1, 
    duration: 1, 
    ease: "power3.out" 
}, "-=0.5"); // Mulai sedikit lebih awal sebelum preloader selesai total
