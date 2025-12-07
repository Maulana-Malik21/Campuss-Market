// js/detail.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Fungsi Init
    function initDetail(products) {
        updateNavbarCart();

        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id') ? parseInt(params.get('id')) : 1; 
        const product = products.find(p => p.id === productId);
        const container = document.getElementById('detailContainer');

        if (!product) {
            container.innerHTML = `<div class="text-center py-20">Produk tidak ditemukan.</div>`;
            return;
        }

        let sizeLabel = "Select Size";
        if (product.type === 'stationery') sizeLabel = "Select Variant";
        if (product.type === 'bag') sizeLabel = "Availability";
        const productSizes = product.sizes || ['Standard'];

        // Logic Harga Coret di Halaman Detail
        let priceHTML = `<p class="text-2xl font-bold text-[#1a3c2f]">${product.price}</p>`;
        if (product.originalPrice) {
            priceHTML = `
                <div class="flex items-center gap-4">
                    <p class="text-lg text-gray-400 line-through decoration-red-500">${product.originalPrice}</p>
                    <p class="text-2xl font-bold text-red-600">${product.price}</p>
                    <span class="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-20% OFF</span>
                </div>
            `;
        }

        container.classList.remove('flex', 'items-center', 'justify-center'); 
        container.innerHTML = `
            <div class="flex flex-col md:flex-row gap-8 md:gap-16 mt-6 fade-in w-full max-w-6xl">
                <div class="w-full md:w-3/5 bg-[#f4f4f4] rounded-sm overflow-hidden relative group">
                    <img id="product-main-img" src="${product.img}" class="w-full h-auto object-cover">
                    ${product.badge ? `<span class="absolute top-6 left-6 bg-[#1a3c2f] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">${product.badge}</span>` : ''}
                </div>
                <div class="w-full md:w-2/5 flex flex-col justify-center">
                    <div class="mb-8 border-b border-gray-200 pb-8">
                        <h1 class="text-4xl md:text-5xl font-headline uppercase leading-[0.9] mb-4 text-[#1a3c2f]">${product.name}</h1>
                        ${priceHTML}
                    </div>
                    <div class="mb-8">
                        <p class="font-bold text-xs uppercase tracking-widest text-[#1a3c2f] mb-4">${sizeLabel}</p>
                        <div class="grid grid-cols-4 gap-3">
                            ${productSizes.map(size => `<button type="button" class="size-btn border border-gray-300 py-3 text-sm font-bold text-gray-600 hover:border-[#1a3c2f] hover:text-[#1a3c2f] transition bg-white" data-size="${size}">${size}</button>`).join('')}
                        </div>
                        <div id="sizeError" class="hidden mt-4 text-xs text-red-700 font-bold">Please select an option.</div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <button id="addToCartBtn" class="w-full bg-[#1a3c2f] text-white py-4 font-bold uppercase tracking-[0.15em] hover:bg-[#2c5f4b] transition">Add to Cart</button>
                        <button id="buyNowBtn" class="w-full border-2 border-[#1a3c2f] text-[#1a3c2f] py-4 font-bold uppercase tracking-[0.15em] hover:bg-[#1a3c2f] hover:text-white transition">Buy Now</button>
                    </div>
                </div>
            </div>
        `;

        // Logic Interaksi (Size, Cart, Buy Now)
        let selectedSize = null;
        const sizeBtns = document.querySelectorAll('.size-btn');
        const sizeError = document.getElementById('sizeError');

        sizeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeBtns.forEach(b => {
                    b.classList.remove('bg-[#1a3c2f]', 'text-white', 'border-[#1a3c2f]');
                    b.classList.add('bg-white', 'text-gray-600', 'border-gray-300');
                });
                this.classList.remove('bg-white', 'text-gray-600', 'border-gray-300');
                this.classList.add('bg-[#1a3c2f]', 'text-white', 'border-[#1a3c2f]');
                selectedSize = this.getAttribute('data-size');
                sizeError.classList.add('hidden');
            });
        });

        document.getElementById('addToCartBtn').addEventListener('click', () => {
            if (!selectedSize) { sizeError.classList.remove('hidden'); return; }
            
            let cart = JSON.parse(localStorage.getItem('compassCart')) || [];
            const existingItem = cart.find(item => item.productId === product.id && item.size === selectedSize);
            if (existingItem) existingItem.qty += 1;
            else cart.push({ cartId: Date.now(), productId: product.id, name: product.name, price: product.priceNum, img: product.img, size: selectedSize, qty: 1, selected: true });
            
            localStorage.setItem('compassCart', JSON.stringify(cart));
            updateNavbarCart();
            alert("Added to cart!");
        });

        // Modal Logic
        const paymentModal = document.getElementById('paymentModal');
        const payMethodSelect = document.getElementById('paymentMethodSelect');
        const payInstruction = document.getElementById('paymentInstruction');

        document.getElementById('buyNowBtn').addEventListener('click', () => {
            const user = localStorage.getItem('compassCurrentSession');
            if(!user) { alert("Please Login First"); return; }
            if (!selectedSize) { sizeError.classList.remove('hidden'); return; }
            
            // Populate Modal
            const payImg = document.getElementById('payImg');
            if(payImg) payImg.src = product.img;
            
            const payName = document.getElementById('payName');
            if(payName) payName.textContent = product.name;
            
            const payDetail = document.getElementById('payDetail');
            if(payDetail) payDetail.textContent = `Option: ${selectedSize}`;
            
            const payPrice = document.getElementById('payPrice');
            if(payPrice) payPrice.textContent = product.price;

            if(paymentModal) paymentModal.classList.remove('hidden');
        });

        const closeBtn = document.getElementById('closePaymentBtn');
        if(closeBtn) closeBtn.addEventListener('click', () => paymentModal.classList.add('hidden'));

        if(payMethodSelect) {
            payMethodSelect.addEventListener('change', (e) => {
                const val = e.target.value;
                payInstruction.classList.remove('hidden');
                payInstruction.innerHTML = ''; 

                if (val.includes('va')) {
                    const bankName = val.split('_')[0].toUpperCase();
                    const vaNum = "880" + Math.floor(Math.random() * 1000000000);
                    payInstruction.innerHTML = `<div class="bg-blue-50 border border-blue-200 p-4 rounded text-center mt-4"><p class="text-[10px] font-bold uppercase text-blue-800 mb-1">${bankName} Virtual Account</p><p class="text-xl font-mono font-bold tracking-widest">${vaNum}</p></div>`;
                } else if (val === 'qris') {
                    payInstruction.innerHTML = `<div class="bg-white border border-gray-200 p-4 rounded text-center mt-4"><p class="text-[10px] font-bold uppercase mb-2">Scan QR Code</p><div class="flex justify-center"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BUYNOW-${product.id}" alt="QRIS" class="border p-1"></div></div>`;
                } else if (val === 'cod') {
                    payInstruction.innerHTML = `<div class="bg-yellow-50 border border-yellow-200 p-4 rounded text-center mt-4"><i class="fa-solid fa-truck-fast text-2xl text-yellow-600 mb-2"></i><p class="text-sm font-bold text-yellow-800">Cash On Delivery</p><p class="text-xs text-gray-500 mt-1">Siapkan uang tunai saat kurir sampai.</p></div>`;
                } else {
                    payInstruction.classList.add('hidden');
                }
            });
        }

        const payForm = document.getElementById('paymentForm');
        if(payForm) {
            payForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = payForm.querySelector('button[type="submit"]');
                btn.innerText = "Processing...";
                btn.disabled = true;

                setTimeout(() => {
                    const userEmail = localStorage.getItem('compassCurrentSession');
                    const newOrder = {
                        id: "ORD-" + Date.now(),
                        date: Date.now(),
                        userEmail: userEmail,
                        total: product.priceNum,
                        status: 'success',
                        paymentMethod: payMethodSelect.value, 
                        orderDate: Date.now(),
                        items: [{
                            productId: product.id,
                            name: product.name,
                            price: product.priceNum,
                            img: product.img,
                            size: selectedSize,
                            qty: 1
                        }]
                    };
                    
                    let orders = JSON.parse(localStorage.getItem('compassOrders')) || [];
                    orders.push(newOrder);
                    localStorage.setItem('compassOrders', JSON.stringify(orders));

                    alert("Pembayaran Berhasil!");
                    window.location.href = "orders.html"; 
                }, 1500);
            });
        }
    }

    function updateNavbarCart() {
        const cart = JSON.parse(localStorage.getItem('compassCart')) || [];
        const badge = document.getElementById('cart-badge');
        if(badge) {
            if (cart.length > 0) { badge.innerText = cart.length; badge.classList.remove('scale-0'); } 
            else { badge.classList.add('scale-0'); }
        }
    }

    if (window.allProducts) {
        initDetail(window.allProducts);
    } else {
        setTimeout(() => {
            if (window.allProducts) {
                initDetail(window.allProducts);
            } else {
                console.error("Data produk tidak ditemukan.");
                document.getElementById('detailContainer').innerHTML = "<p class='text-center text-red-500 mt-10'>Gagal memuat data produk.</p>";
            }
        }, 500);
    }
});