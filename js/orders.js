// js/orders.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cek Login
    const rawUser = localStorage.getItem('compassCurrentSession');
    if (!rawUser) { window.location.href = 'index.html'; return; }
    const currentUser = rawUser.trim().toLowerCase();

    const container = document.getElementById('ordersListContainer');
    const emptyOrder = document.getElementById('emptyOrder');
    
    // 2. Ambil Data
    const allOrders = JSON.parse(localStorage.getItem('compassOrders')) || [];
    const myOrders = allOrders.filter(o => o.userEmail && o.userEmail.trim().toLowerCase() === currentUser)
                              .sort((a,b) => b.orderDate - a.orderDate); // Urutkan terbaru

    // 3. Render
    if (myOrders.length === 0) {
        emptyOrder.classList.remove('hidden');
        return;
    }

    // Generate HTML untuk setiap pesanan
    container.innerHTML = myOrders.map((order, index) => createOrderAccordion(order, index)).join('');

    // 4. Jalankan Logic (Tracker & Accordion Event)
    myOrders.forEach((order, index) => {
        // Init Tracker Timer (Jalan di background meskipun tertutup)
        if (!order.isPreOrder) {
            initTracker(`tracker-${index}`, order.orderDate);
        }

        // Add Click Event untuk Dropdown
        const header = document.getElementById(`header-${index}`);
        const body = document.getElementById(`body-${index}`);
        const icon = document.getElementById(`icon-${index}`);

        if (header && body && icon) {
            header.addEventListener('click', () => {
                // Toggle Hidden Class
                body.classList.toggle('hidden');
                // Rotate Icon
                if (body.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // --- HTML GENERATOR (ACCORDION STYLE) ---
    function createOrderAccordion(order, index) {
        const itemHTML = renderItems(order.items);
        const trackerId = `tracker-${index}`;
        const dateObj = new Date(order.orderDate);
        const dateStr = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        
        // Tentukan Label Status di Header
        let statusBadge = '';
        if (order.isPreOrder) {
            statusBadge = `<span class="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-yellow-200">Pre-Order</span>`;
        } else {
            statusBadge = `<span class="bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-200">Regular</span>`;
        }

        // Content Tracker (Kanan)
        let trackerContent = '';
        if (order.isPreOrder) {
            trackerContent = `
                <div class="bg-[#1a3c2f] text-white p-6 rounded-sm shadow-inner text-center h-full flex flex-col justify-center">
                    <i class="fa-solid fa-hourglass-half text-brand-accent text-2xl mb-2"></i>
                    <h3 class="font-headline uppercase text-lg">Pre-Order</h3>
                    <p class="text-[10px] text-gray-300 mb-3">Est. Delivery: <span class="text-white font-bold">${order.deliveryDate}</span></p>
                    <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-brand-accent h-full w-1/3"></div>
                    </div>
                    <p class="text-[9px] mt-2 text-gray-400">Waiting for production batch.</p>
                </div>
            `;
        } else {
            trackerContent = `
                <div class="bg-gray-50 p-6 rounded-sm border border-gray-200 h-full" id="${trackerId}">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="font-bold uppercase text-xs tracking-widest text-gray-500">Live Status</h3>
                        <span class="text-[10px] font-mono text-gray-400 timer-display">...</span>
                    </div>
                    
                    <div class="relative pl-2 space-y-5">
                        <div class="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>
                        <div class="flex gap-3 relative z-10 step-item" data-step="1">
                            <div class="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-[9px] step-icon transition-colors">1</div>
                            <div><p class="font-bold text-[10px] uppercase text-gray-400 step-text">Paid</p></div>
                        </div>
                        <div class="flex gap-3 relative z-10 step-item" data-step="2">
                            <div class="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-[9px] step-icon transition-colors">2</div>
                            <div><p class="font-bold text-[10px] uppercase text-gray-400 step-text">Admin</p></div>
                        </div>
                        <div class="flex gap-3 relative z-10 step-item" data-step="3">
                            <div class="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-[9px] step-icon transition-colors">3</div>
                            <div><p class="font-bold text-[10px] uppercase text-gray-400 step-text">Packing</p></div>
                        </div>
                        <div class="flex gap-3 relative z-10 step-item" data-step="4">
                            <div class="w-5 h-5 rounded-full bg-gray-300 text-white flex items-center justify-center text-[9px] step-icon transition-colors">4</div>
                            <div><p class="font-bold text-[10px] uppercase text-gray-400 step-text">Shipping</p></div>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <div class="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                            <div class="progress-bar bg-[#1a3c2f] h-full w-0 transition-all duration-500"></div>
                        </div>
                        <p class="status-msg text-center text-[10px] font-bold text-[#1a3c2f] mt-2">...</p>
                    </div>
                </div>
            `;
        }

        // --- STRUKTUR ACCORDION ---
        // Jika index == 0 (Paling baru), kita buka by default (hapus class hidden). 
        // Jika index > 0 (History), kita tutup (pakai class hidden).
        const isOpen = index === 0 ? '' : 'hidden';
        const rotateIcon = index === 0 ? 'rotate-180' : '';

        return `
            <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                
                <div id="header-${index}" class="bg-white p-5 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition select-none">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#1a3c2f]">
                            <i class="fa-solid fa-box"></i>
                        </div>
                        <div>
                            <p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Order ID</p>
                            <p class="font-mono font-bold text-sm text-[#1a3c2f]">${order.id}</p>
                            <p class="text-[10px] text-gray-500 mt-0.5">${dateStr}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <div class="text-right">
                            <p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Total</p>
                            <p class="font-bold text-[#1a3c2f]">IDR ${order.total.toLocaleString('id-ID')}</p>
                        </div>
                        
                        <div class="flex items-center gap-4">
                            ${statusBadge}
                            <i id="icon-${index}" class="fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${rotateIcon}"></i>
                        </div>
                    </div>
                </div>

                <div id="body-${index}" class="${isOpen} border-t border-gray-100 bg-gray-50/50 p-6 transition-all duration-300">
                    <div class="flex flex-col lg:flex-row gap-6">
                        <div class="w-full lg:w-2/3 space-y-4">
                            ${itemHTML}
                            <div class="pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                                <span>Payment Method: <strong>${order.paymentMethod ? order.paymentMethod.toUpperCase().replace('_', ' ') : 'VA BCA'}</strong></span>
                                <a href="#" class="underline hover:text-[#1a3c2f]">Invoice</a>
                            </div>
                        </div>

                        <div class="w-full lg:w-1/3">
                            ${trackerContent}
                        </div>
                    </div>
                </div>

            </div>
        `;
    }

    function renderItems(items) {
        return items.map(item => {
            const sku = `SKU-${item.productId}-${item.name.substring(0,3).toUpperCase()}`;
            return `
                <div class="flex gap-4 items-start bg-white p-3 rounded border border-gray-100">
                    <div class="w-16 h-16 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src="${item.img}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between">
                            <h4 class="font-bold uppercase text-[#1a3c2f] text-xs md:text-sm line-clamp-1">${item.name}</h4>
                            <span class="text-xs font-bold text-gray-700">x${item.qty}</span>
                        </div>
                        <div class="mt-1">
                            <p class="text-[10px] text-gray-500">Var: <span class="font-bold text-black">${item.size}</span></p>
                            <p class="text-[10px] text-gray-400 font-mono mt-0.5">${sku}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- LOGIC TIMER 10 DETIK ---
    function initTracker(elementId, orderDate) {
        const wrapper = document.getElementById(elementId);
        if(!wrapper) return;

        const timerDisplay = wrapper.querySelector('.timer-display');
        const progressBar = wrapper.querySelector('.progress-bar');
        const statusMsg = wrapper.querySelector('.status-msg');
        const steps = wrapper.querySelectorAll('.step-item');

        const update = () => {
            const now = Date.now();
            const elapsed = Math.floor((now - orderDate) / 1000); 

            timerDisplay.textContent = `${elapsed}s ago`;

            // Reset UI
            steps.forEach(step => {
                const icon = step.querySelector('.step-icon');
                const text = step.querySelector('.step-text');
                icon.className = "w-5 h-5 rounded-full bg-gray-200 text-white flex items-center justify-center text-[9px] step-icon transition-colors";
                icon.innerHTML = step.dataset.step;
                text.classList.remove('text-[#1a3c2f]', 'text-green-600');
                text.classList.add('text-gray-400');
            });

            let pct = 0; let msg = "Processing...";

            // Fungsi Helper
            const activate = (n, isDone) => {
                const step = wrapper.querySelector(`.step-item[data-step="${n}"]`);
                if(step) {
                    const icon = step.querySelector('.step-icon');
                    const text = step.querySelector('.step-text');
                    text.classList.remove('text-gray-400'); text.classList.add('text-[#1a3c2f]');
                    if(isDone) {
                        icon.classList.remove('bg-gray-200'); icon.classList.add('bg-green-600');
                        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
                    } else {
                        icon.classList.remove('bg-gray-200'); icon.classList.add('bg-[#1a3c2f]');
                    }
                }
            };

            // LOGIKA 10 DETIK
            if (elapsed >= 0) { activate(1, false); pct=25; msg="Payment Verified"; }
            if (elapsed >= 10) { activate(1, true); activate(2, false); pct=50; msg="Admin Confirmed"; }
            if (elapsed >= 20) { activate(1, true); activate(2, true); activate(3, false); pct=75; msg="Packing Order"; }
            if (elapsed >= 30) { activate(1, true); activate(2, true); activate(3, true); activate(4, false); pct=100; msg="Courier On The Way"; }

            progressBar.style.width = `${pct}%`;
            statusMsg.textContent = msg;
        };

        update();
        setInterval(update, 1000);
    }
});