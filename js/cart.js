// js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cartItemsContainer');
    const summaryCount = document.getElementById('summaryCount');
    const summaryTotal = document.getElementById('summaryTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // --- AMBIL DATA CART ---
    let cart = JSON.parse(localStorage.getItem('compassCart')) || [];

    function renderCart() {
        if (cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-20 border-2 border-dashed border-gray-200 rounded-lg">
                    <i class="fa-solid fa-shopping-basket text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-400 mb-4">Your bag is empty.</p>
                    <a href="index.html" class="text-[#1a3c2f] font-bold underline uppercase tracking-widest hover:text-green-700">Start Shopping</a>
                </div>`;
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('bg-gray-300', 'cursor-not-allowed');
            checkoutBtn.classList.remove('bg-[#1a3c2f]');
            updateSummary();
            return;
        }

        container.innerHTML = cart.map((item, index) => `
            <div class="flex gap-4 md:gap-6 items-start border-b border-gray-100 pb-6 mb-6 last:border-0 relative group">
                <div class="pt-2">
                    <input type="checkbox" class="w-5 h-5 accent-[#1a3c2f] cursor-pointer item-checkbox" 
                        data-index="${index}" ${item.selected ? 'checked' : ''}>
                </div>
                <a href="detail.html?id=${item.productId}" class="w-24 h-24 bg-gray-100 flex-shrink-0 rounded overflow-hidden border border-gray-200">
                    <img src="${item.img}" class="w-full h-full object-cover">
                </a>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <h3 class="font-headline text-lg md:text-xl uppercase leading-none mb-1 text-[#1a3c2f]">${item.name}</h3>
                        <p class="font-bold text-[#1a3c2f]">IDR ${(item.price * item.qty).toLocaleString('id-ID')}</p>
                    </div>
                    <p class="text-sm text-gray-500 mb-2">Size: <span class="font-bold text-black">${item.size}</span></p>
                    <div class="flex justify-between items-center mt-4">
                        <div class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Qty: ${item.qty}</div>
                        <button class="delete-btn text-red-500 text-xs font-bold uppercase tracking-widest hover:text-red-700 transition flex items-center gap-1" data-id="${item.cartId}">
                            <i class="fa-solid fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>`).join('');

        document.querySelectorAll('.item-checkbox').forEach(box => {
            box.addEventListener('change', (e) => {
                const idx = e.target.dataset.index;
                cart[idx].selected = e.target.checked;
                saveAndRefresh(false);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(e.currentTarget.getAttribute('data-id'));
                if(confirm("Hapus item ini?")) {
                    cart = cart.filter(item => item.cartId !== idToDelete);
                    saveAndRefresh(true);
                }
            });
        });

        updateSummary();
    }
    
    function updateSummary() {
        const selectedItems = cart.filter(item => item.selected);
        const total = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        summaryCount.textContent = selectedItems.length;
        summaryTotal.textContent = `IDR ${total.toLocaleString('id-ID')}`;
        
        if (selectedItems.length > 0) {
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('bg-gray-300', 'cursor-not-allowed');
            checkoutBtn.classList.add('bg-[#1a3c2f]', 'hover:bg-[#2c5f4b]');
        } else {
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('bg-gray-300', 'cursor-not-allowed');
            checkoutBtn.classList.remove('bg-[#1a3c2f]');
        }
    }

    function saveAndRefresh(shouldRender) {
        localStorage.setItem('compassCart', JSON.stringify(cart));
        if(shouldRender) renderCart();
        else updateSummary();
    }
    
    renderCart();

    // --- MODAL PEMBAYARAN ---
    const paymentModal = document.getElementById('paymentModal');
    const paymentItemsList = document.getElementById('paymentItemsList');
    const payModalTotal = document.getElementById('payModalTotal');
    const paymentForm = document.getElementById('paymentForm');
    const paymentMethodSelect = document.getElementById('paymentMethodSelect'); 
    const paymentInstruction = document.getElementById('paymentInstruction');

    checkoutBtn.addEventListener('click', () => {
        const currentUser = localStorage.getItem('compassCurrentSession');
        if(!currentUser) { alert("Harap Login terlebih dahulu!"); return; }

        const selectedItems = cart.filter(item => item.selected);
        if(selectedItems.length === 0) return;

        paymentItemsList.innerHTML = selectedItems.map(item => `
            <div class="flex justify-between border-b border-gray-200 py-2 last:border-0">
                <span class="font-bold text-[#1a3c2f] text-xs">${item.name} <span class="font-normal">(${item.size} x${item.qty})</span></span>
                <span class="text-xs">IDR ${(item.price * item.qty).toLocaleString('id-ID')}</span>
            </div>
        `).join('');
        
        const total = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
        payModalTotal.textContent = `IDR ${total.toLocaleString('id-ID')}`;
        paymentModal.classList.remove('hidden');
    });

    // --- LOGIKA GANTI METODE PEMBAYARAN (FIXED) ---
    if(paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            paymentInstruction.classList.remove('hidden');
            paymentInstruction.innerHTML = ''; // Reset isi

            if (val.includes('va')) {
                // Tampilkan VA
                const bankName = val.split('_')[0].toUpperCase();
                const vaNum = "880" + Math.floor(Math.random() * 1000000000);
                paymentInstruction.innerHTML = `
                    <div class="bg-blue-50 border border-blue-200 p-4 rounded text-center mt-4">
                        <p class="text-[10px] font-bold uppercase text-blue-800 mb-1">${bankName} Virtual Account</p>
                        <p class="text-xl font-mono font-bold tracking-widest">${vaNum}</p>
                        <p class="text-[10px] text-gray-400 mt-1">Salin nomor ini ke Mobile Banking</p>
                    </div>`;
            } else if (val === 'qris') {
                // Tampilkan Barcode
                paymentInstruction.innerHTML = `
                    <div class="bg-white border border-gray-200 p-4 rounded text-center mt-4">
                        <p class="text-[10px] font-bold uppercase mb-2">Scan QR Code</p>
                        <div class="flex justify-center">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=COMPASS-PAYMENT" alt="QRIS" class="border p-1">
                        </div>
                    </div>`;
            } else if (val === 'cod') {
                // Tampilkan Info COD
                paymentInstruction.innerHTML = `
                    <div class="bg-yellow-50 border border-yellow-200 p-4 rounded text-center mt-4">
                        <i class="fa-solid fa-truck-fast text-2xl text-yellow-600 mb-2"></i>
                        <p class="text-sm font-bold text-yellow-800">Cash On Delivery</p>
                        <p class="text-xs text-gray-500 mt-1">Siapkan uang tunai saat kurir sampai.</p>
                    </div>`;
            } else {
                paymentInstruction.classList.add('hidden');
            }
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = paymentForm.querySelector('button[type="submit"]');
            btn.innerText = "Processing...";
            btn.disabled = true;

            setTimeout(() => {
                const selectedItems = cart.filter(item => item.selected);
                const total = selectedItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
                const userEmail = localStorage.getItem('compassCurrentSession');

                const newOrder = {
                    id: "ORD-" + Date.now(),
                    userEmail: userEmail, 
                    items: selectedItems,
                    total: total,
                    paymentMethod: paymentMethodSelect.value, // Simpan metode
                    orderDate: Date.now(),
                    status: 'processing'
                };

                let orders = JSON.parse(localStorage.getItem('compassOrders')) || [];
                orders.push(newOrder);
                localStorage.setItem('compassOrders', JSON.stringify(orders));

                cart = cart.filter(item => !item.selected);
                saveAndRefresh(true);

                alert("Pesanan Berhasil Dibuat!");
                window.location.href = 'orders.html';
            }, 2000); 
        });
    }

    document.getElementById('closePaymentBtn').addEventListener('click', () => {
        paymentModal.classList.add('hidden');
    });
});