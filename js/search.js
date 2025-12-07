// js/search.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tangkap Parameter URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    const color = params.get('color') || 'all';
    const gender = params.get('gender') || 'all';

    // 2. Tampilkan Info Pencarian di Judul
    const displayInfo = document.getElementById('search-query-display');
    if (displayInfo) {
        displayInfo.innerText = `Keyword: "${query}" | Gender: ${gender} | Color: ${color}`;
    }

    // 3. Filter Logic (Menggunakan data allProducts dari products.js)
    let results = allProducts.filter(p => {
        const matchText = p.name.toLowerCase().includes(query.toLowerCase());
        const matchGender = gender === 'all' || p.gender === gender;
        const matchColor = color === 'all' || p.color === color;
        return matchText && matchGender && matchColor;
    });

    // 4. Render Hasil
    const grid = document.getElementById('search-grid');
    const noResults = document.getElementById('no-results');

    if (grid) {
        if(results.length > 0) {
            results.forEach((p, i) => {
                const card = createCard(p, i); // Pakai helper dari products.js
                grid.appendChild(card);
            });
        } else {
            if(noResults) noResults.classList.remove('hidden');
        }
    }
});