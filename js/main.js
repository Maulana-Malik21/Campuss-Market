// js/main.js

// CONFIG
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentFilter = { gender: 'all', color: 'all', price: 'all' };
let filteredProducts = [...allProducts]; // Mengambil dari products.js

const gridContainer = document.getElementById('product-grid');
const paginationContainer = document.getElementById('pagination-controls');

