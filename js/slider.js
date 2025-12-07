document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. LOGIKA BANNER SLIDER (INFINITE LOOP)
    // =========================================
    const track = document.getElementById('sliderTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    // Cek apakah elemen ada untuk mencegah error
    if (track) {
        const slides = Array.from(track.children);
        
        // Clone slide awal dan akhir untuk efek loop
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        track.appendChild(firstClone);
        track.insertBefore(lastClone, slides[0]);

        const allSlides = Array.from(track.children);
        let currentIndex = 1; 
        let isTransitioning = false;

        const setPosition = () => {
            const width = track.getBoundingClientRect().width;
            track.style.transform = `translateX(-${width * currentIndex}px)`;
        };

        // Set posisi awal
        setPosition();

        const updateSlider = () => {
            isTransitioning = true;
            track.style.transition = 'transform 0.5s ease-in-out';
            setPosition();
        };

        // Event Listener Tombol Banner
        if(nextBtn) nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex++;
            updateSlider();
        });

        if(prevBtn) prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex--;
            updateSlider();
        });

        // Transisi Selesai (Teleportasi Loop)
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            const width = track.getBoundingClientRect().width;

            if (allSlides[currentIndex] === firstClone) {
                track.style.transition = 'none';
                currentIndex = 1;
                track.style.transform = `translateX(-${width * currentIndex}px)`;
            }

            if (allSlides[currentIndex] === lastClone) {
                track.style.transition = 'none';
                currentIndex = allSlides.length - 2;
                track.style.transform = `translateX(-${width * currentIndex}px)`;
            }
        });

        // Responsif Resize
        window.addEventListener('resize', () => {
            track.style.transition = 'none';
            setPosition();
        });
    }

    // =========================================
    // 2. LOGIKA MENU ICON SLIDER (MOBILE)
    // =========================================
    const iconMenu = document.getElementById('iconMenu');
    const menuPrevBtn = document.getElementById('menuPrevBtn');
    const menuNextBtn = document.getElementById('menuNextBtn');

    if (iconMenu && menuPrevBtn && menuNextBtn) {
        
        // Geser ke Kiri
        menuPrevBtn.addEventListener('click', () => {
            iconMenu.scrollBy({
                left: -100, // Geser 100px
                behavior: 'smooth'
            });
        });

        // Geser ke Kanan
        menuNextBtn.addEventListener('click', () => {
            iconMenu.scrollBy({
                left: 100, // Geser 100px
                behavior: 'smooth'
            });
        });
    }

});