// js/products.js

// =================================================================
// 1. DATA GLOBAL & KONFIGURASI
// =================================================================

// URL Gambar Cadangan (Jika link gambar Anda rusak/mati)
const FALLBACK_IMG = "https://placehold.co/600x800/e2e8f0/1a3c2f?text=No+Image";

const featuredProduct = {
    id: 999,
    name: "PROTO 1 - SPECIAL OPS",
    desc: "Edisi terbatas dengan material premium suede dan detail reflektif.",
    price: "IDR 1.250.000",
    priceNum: 1250000,
    modelSrc: "./assets/sepatu_campuss.glb",
    // Bisa pakai URL langsung:
    img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800" 
};

// Helper function (Masih disimpan agar produk lain tetap punya gambar default)
const getImg = (type, index) => {
    const collections = {
        shoe: ["1552346154-21d32810aba3", "1606107557195-0e29a4b5b4aa", "1560769629-975e13f0c470", "1549298916-b41d501d3772", "1525966222134-fcfa99b8ae77"],
        shirt: ["1596755094514-f87e34085b2c", "1576566588028-4147f3842f27", "1521572163474-6864f9cf17ab", "1583743814966-8936f5b7be1a", "1618354691373-d851c5c3a990"],
        pant: ["1541099649105-f69ad21f3246", "1624378439575-d8705ad7ae80", "1473966968600-fa801b869a1a", "1517445309655-763435219f6c", "1584184924103-e310d9dc82fc"],
        bag: ["1553062407-98eeb64c6a62", "1547949003-9792a18a2601", "1581605405111-a8d32465214d", "1491637639811-60e2756cc1c9", "1590874103328-360281309471"],
        stationery: ["1544816155-12df9643f363", "1585336261022-680e295ce3fe", "1456735190887-40591f819d57", "1519337262554-e6312364b8ad", "1501504905252-473c47e087f8"]
    };
    const targetList = collections[type] || collections.shoe;
    return `https://images.unsplash.com/photo-${targetList[index % targetList.length]}?auto=format&fit=crop&q=80&w=600`;
};

const sizes = {
    shoe: [37, 38, 39, 40, 41, 42, 43, 44],
    apparel: ["S", "M", "L", "XL", "XXL"], 
    bag: ["All Size"],
    book: ["A6", "A5", "B5", "A4", "Folio"],
    pen: ["Gel 0.5mm", "Gel 0.7mm", "Ballpoint"],
    general: ["Standard"]
};

// =================================================================
// 2. DATABASE PRODUK (EDIT URL GAMBAR DI SINI)
// =================================================================
window.allProducts = [
    // --- BATCH 1 (Promo 20%) ---
    { 
        id: 1, 
        type: "shoe", 
        name: "Compass Gazelle", 
        price: "IDR 350.400", 
        originalPrice: "IDR 438.000", 
        priceNum: 350400, 
        gender: "Unisex", 
        // CONTOH 1: Pake URL Manual (Hapus getImg, ganti string URL)
        img: "https://down-id.img.susercontent.com/file/sg-11134201-7rbmj-lnxmu8bo88ts63", 
        badge: "Student Promo", 
        sizes: sizes.shoe, 
        rating: 4.9, 
        sold: 5200, 
        location: "Jakarta Selatan" 
    },
    { 
        id: 2, 
        type: "shirt", 
        name: "Erigo Apparel", 
        price: "IDR 148.000", 
        originalPrice: "IDR 185.000", 
        priceNum: 148000, 
        gender: "Women", 
        // CONTOH 2: Pake URL Manual dari Shopee/Tokopedia/Google
        img: "https://img.id.my-best.com/product_images/37b0ad64a536524046e7b476f3328721.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=f774d02dc7dc97e47da607e48cc93530", 
        badge: "Student Promo", 
        sizes: sizes.apparel, 
        rating: 4.8, 
        sold: 850, 
        location: "Tangerang" 
    },
    { 
        id: 3, 
        type: "pant", 
        name: "Smith Chino", 
        price: "IDR 168.000", 
        originalPrice: "IDR 210.000", 
        priceNum: 168000, 
        gender: "Men", 
        // CONTOH 3: Masih pakai helper otomatis (Bisa diganti URL kapan saja)
        img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2025/1/27/f640437c-183c-42f5-a0c1-b71cb5ba4b0d.jpg", 
        badge: "Student Promo", 
        sizes: sizes.apparel, 
        rating: 4.9, 
        sold: 1200, 
        location: "Bandung" 
    },
    { id: 4, type: "bag", name: "Bloods Series Backpack", price: "IDR 239.200", originalPrice: "IDR 299.000", priceNum: 239200, gender: "Unisex", img: "https://id-live-01.slatic.net/p/2b5423f61a46df0d9604d92b52608a85.jpg", badge: "Student Promo", sizes: sizes.bag, rating: 4.7, sold: 340, location: "Bandung" },
    { id: 5, type: "stationery", name: "Binder Note Joyko A5-MHPTSM-517", price: "IDR 36.000", originalPrice: "IDR 45.000", priceNum: 36000, gender: "Women", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-35114521/joyko_binder_note_joyko_a5-mhptsm-517_full01_tb75281c.jpg", badge: "Student Promo", sizes: sizes.book, rating: 5.0, sold: 150, location: "Yogyakarta" },
    
    // --- BATCH 2 (Promo 20%) ---
    { id: 6, type: "shoe", name: "Kanky Honjo", price: "IDR 310.400", originalPrice: "IDR 388.000", priceNum: 310400, gender: "Women", img: "https://down-id.img.susercontent.com/file/id-11134207-7r98q-lqk2bkraiuig0a", badge: "Student Promo", sizes: sizes.shoe, rating: 4.8, sold: 2100, location: "Surabaya" },
    { id: 7, type: "shirt", name: "JN Tshirt Atrea Black Thanksinsomnia", price: "IDR 200.000", originalPrice: "IDR 250.000", priceNum: 200000, gender: "Women", img: "https://images.tokopedia.net/img/cache/700/o3syd0/1997/1/1/7756c631f51c4345aec1e3c19964c846~.jpeg", badge: "Student Promo", sizes: sizes.apparel, rating: 4.7, sold: 4500, location: "Jakarta Barat" },
    { id: 8, type: "pant", name: "Erigo Cargo", price: "IDR 180.000", originalPrice: "IDR 225.000", priceNum: 180000, gender: "Men", img: "https://images.tokopedia.net/img/cache/700/hDjmkQ/2023/8/27/9552e244-ded3-4b96-b6c2-509c8dd830dd.jpg", badge: "Student Promo", sizes: sizes.apparel, rating: 4.6, sold: 890, location: "Tangerang" },
    { id: 9, type: "bag", name: "Erigo Waist Bag", price: "IDR 340.000", originalPrice: "IDR 425.000", priceNum: 340000, gender: "Men", img: "https://erigostore.co.id/cdn/shop/files/id-11134201-7r98t-lw8bp3txo7epad.jpg?v=1750320066&width=1445", badge: "Student Promo", sizes: sizes.bag, rating: 4.9, sold: 6200, location: "Bandung" },
    { id: 10, type: "stationery", name: "Joyko Pen Set", price: "IDR 28.000", originalPrice: "IDR 35.000", priceNum: 28000, gender: "Unisex", img: "https://i1.wp.com/besemahpustaka.com/wp-content/uploads/2021/11/Pena-Kuas.jpeg?fit=900%2C900&ssl=1", badge: "Student Promo", sizes: sizes.pen, rating: 4.8, sold: 10500, location: "Jakarta Utara" },
    
    // --- BATCH 3 (Promo 20%) ---
    { id: 11, type: "shoe", name: "Retrograde Hi", price: "IDR 454.400", originalPrice: "IDR 568.000", priceNum: 454400, gender: "Unisex", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/112/MTA-119477686/compass_sepatu_compass_retrograde_low_creme_cherry_full01_dc43e57c.jpg", badge: "Student Promo", sizes: sizes.shoe, rating: 4.9, sold: 3200, location: "Jakarta Selatan" },
    { id: 12, type: "pant", name: "Thanksinsomnia Denim", price: "IDR 96.000", originalPrice: "IDR 120.000", priceNum: 96000, gender: "Women", img: "https://preloved.co.id/_ipx/w_800,f_webp,q_80,fit_cover/https://assets.preloved.co.id/products/469731/d1368fea-0209-40f8-be16-c25098ed0a1d.jpg", badge: "Student Promo", sizes: sizes.apparel, rating: 4.7, sold: 980, location: "Tangerang Selatan" },
    { id: 13, type: "pant", name: "Eiger Mens MultiPocket Pants", price: "IDR 384.000", originalPrice: "IDR 480.000", priceNum: 384000, gender: "Men", img: "https://d1yutv2xslo29o.cloudfront.net/product/variant/media/web/small/eaf81103-b617-411c-8584-5baf0c4a3cc7.webp", badge: "Student Promo", sizes: sizes.apparel, rating: 4.8, sold: 450, location: "Bandung" },
    { id: 14, type: "bag", name: "Eiger Junior Shoreside 15L", price: "IDR 479.200", originalPrice: "IDR 599.000", priceNum: 479200, gender: "Men", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKnThu5MtCTMvNIVJM9ZcQDan_Oiazs9ya4g&s", badge: "Student Promo", sizes: sizes.bag, rating: 4.9, sold: 150, location: "Bandung" },
    { id: 15, type: "stationery", name: "Joyko Binder", price: "IDR 52.000", originalPrice: "IDR 65.000", priceNum: 52000, gender: "Women", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1_mBBN9WWTiso2iGoJ3VyCcueD-ex_3Z7xg&s", badge: "Student Promo", sizes: ["B5", "A5"], rating: 4.9, sold: 3400, location: "Jakarta Pusat" },
    
    // --- BATCH 4 (Promo 20%) ---
    { id: 16, type: "shoe", name: "Kanky Kitadake", price: "IDR 366.400", originalPrice: "IDR 458.000", priceNum: 366400, gender: "Men", img: "https://topsystem.id/api/product/600/1743065747.jpg", badge: "Student Promo", sizes: sizes.shoe, rating: 4.8, sold: 1100, location: "Surabaya" },
    { id: 17, type: "shirt", name: "Erigo Coach Jacket Idaina Kaeru Black", price: "IDR 280.000", originalPrice: "IDR 350.000", priceNum: 280000, gender: "Men", img: "https://cf.shopee.co.id/file/id-11134207-23010-o6pk6newoymvf0", badge: "Student Promo", sizes: sizes.apparel, rating: 4.7, sold: 230, location: "Jakarta Timur" },
    { id: 18, type: "pant", name: "Erigo JN NOWSA 01 Pants", price: "IDR 159.200", originalPrice: "IDR 199.000", priceNum: 159200, gender: "Women", img: "https://www.bloods-industries.co/wp-content/uploads/2025/02/JN-NOWSA-01.jpg", badge: "Student Promo", sizes: sizes.apparel, rating: 4.6, sold: 560, location: "Bandung" },
    { id: 19, type: "bag", name: "Bloods Series Backpack Tas Punggung Nuts 01 Black", price: "IDR 252.000", originalPrice: "IDR 315.000", priceNum: 252000, gender: "Women", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/101/MTA-163866143/brd-09186_bloods-series-backpack-tas-punggung-nuts-01-black_full01-5ead9859.jpg", badge: "Student Promo", sizes: sizes.bag, rating: 4.9, sold: 1800, location: "Bandung" },
    { id: 20, type: "stationery", name: "Joyko Cutter", price: "IDR 20.000", originalPrice: "IDR 25.000", priceNum: 20000, gender: "Unisex", img: "https://siplah.blibli.com/data/images/SAFI-0033-00174/0e577a45-2fea-4fa6-b293-a96a10e70ab4.jpg", badge: "Student Promo", sizes: ["Standard"], rating: 4.8, sold: 2200, location: "Jakarta Barat" },
    
    // --- BATCH 5 (Promo 20%) ---
    { id: 21, type: "shoe", name: "Compass Velocity", price: "IDR 502.400", originalPrice: "IDR 628.000", priceNum: 502400, gender: "Unisex", img: "https://filebroker-cdn.lazada.co.id/kf/S74c58a96ae4549968d1148be63e6ce79l.jpg", badge: "Student Promo", sizes: sizes.shoe, rating: 5.0, sold: 900, location: "Jakarta Selatan" },
    { id: 22, type: "shirt", name: "Rucas Tee/Tshirt All Season", price: "IDR 79.200", originalPrice: "IDR 99.000", priceNum: 79200, gender: "Women", img: "https://down-id.img.susercontent.com/file/id-11134207-7rbk0-m6v1oqfw2cqx4c", badge: "Student Promo", sizes: sizes.apparel, rating: 4.7, sold: 5600, location: "Tangerang" },
    { id: 23, type: "pant", name: "Bloods Series Pants Celana Chino Cubern 03 Dark grey", price: "IDR 140.000", originalPrice: "IDR 175.000", priceNum: 140000, gender: "Women", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/106/MTA-168829701/brd-09186_bloods-series-pants-celana-chino-cubern-03-dark-grey_full01-7b253364.jpg", badge: "Student Promo", sizes: sizes.apparel, rating: 4.8, sold: 780, location: "Bandung" },
    { id: 24, type: "bag", name: "Bloods Series Backpack Tas Punggung Nuts", price: "IDR 132.000", originalPrice: "IDR 165.000", priceNum: 132000, gender: "Unisex", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPjD0mE1kAOJV1mbBLI1oBkYTGzcug9jM5A&s", badge: "Student Promo", sizes: sizes.bag, rating: 4.7, sold: 1200, location: "Depok" },
    { id: 25, type: "stationery", name: "Joyko Pensil Warna", price: "IDR 44.000", originalPrice: "IDR 55.000", priceNum: 44000, gender: "Women", img: "https://stationary.co.id/cdn/shop/products/joyko-pensil-warna-24-color-pencil-long-cp-101-office-stationery-toko-atk_169_1024x1024.jpg?v=1548309371", badge: "Student Promo", sizes: ["12 Color", "24 Color"], rating: 4.9, sold: 4100, location: "Jakarta Pusat" },
    
    // --- BATCH 6 (Harga Normal) ---
    { id: 26, type: "shoe", name: "Compass Tribune", price: "IDR 399.000", priceNum: 399000, gender: "Women", img: "https://lxpr.lspr.ac.id/wp-content/uploads/2025/01/https___sepatucompass.com_shop_sepatu-compass-tribune-away-maroon.png", badge: "Best Seller", sizes: sizes.shoe, rating: 4.8, sold: 1400, location: "Surabaya" },
    { id: 27, type: "shirt", name: "Tshirt Eveny Black Thanksinsomnia", price: "IDR 145.000", priceNum: 145000, gender: "Men", img: "https://down-id.img.susercontent.com/file/sg-11134201-7rdvo-m1juh9upimkf34", badge: "Sale", sizes: sizes.apparel, rating: 4.6, sold: 670, location: "Bandung" },
    { id: 28, type: "pant", name: "Erigo Jogger Pants Noa Light Grey", price: "IDR 210.000", priceNum: 210000, gender: "Men", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSju4qcwyvmrW5sCU04EDQMyAT0jVr3v9C4Aw&s", badge: null, sizes: sizes.apparel, rating: 4.8, sold: 2300, location: "Bandung" },
    { id: 29, type: "bag", name: "Eiger Descent 25 Laptop Backpack", price: "IDR 650.000", priceNum: 650000, gender: "Men", img: "https://dynamic.zacdn.com/DBpJOOWh0hPHx1X5WPRbnjqYwVY=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/eiger-1034-0223364-1.jpg", badge: "Large", sizes: sizes.bag, rating: 4.9, sold: 120, location: "Bandung" },
    { id: 30, type: "stationery", name: "Kuas Joyko", price: "IDR 95.000", priceNum: 95000, gender: "Unisex", img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/100/MTA-131936850/no-brand_no-brand_full01.jpg", badge: "Elegant", sizes: sizes.general, rating: 4.9, sold: 85, location: "Garut" },
    
    // --- BATCH 7 (Harga Normal) ---
    { id: 31, type: "shoe", name: "Kanky X Staple", price: "IDR 799.000", priceNum: 799000, gender: "Men", img: "https://d2kchovjbwl1tk.cloudfront.net/vendor/11367/product/STORY_KITADAKE___Kanky_x_STPL___Antique_White_a_1758536555461.jpg", badge: "Sport", sizes: sizes.shoe, rating: 4.9, sold: 540, location: "Jakarta Selatan" },
    { id: 32, type: "shirt", name: "Rucas 3 Days T-Shirt Black", price: "IDR 165.000", priceNum: 165000, gender: "Women", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3XVQiKU2G8G-6JqkC1usySrxjjFX3CHOcsg&s", badge: "New", sizes: sizes.apparel, rating: 4.8, sold: 3100, location: "Bandung" },
    { id: 33, type: "pant", name: "Cargo Pants Thanksinsomnia ", price: "IDR 189.000", priceNum: 189000, gender: "Women", img: "https://cf.shopee.co.id/file/246ea48e7415ba7c010bf890af519ea2", badge: "Sale", sizes: sizes.apparel, rating: 4.7, sold: 900, location: "Tangerang" },
    { id: 34, type: "bag", name: "Eiger VOYAGER TOTE BAG", price: "IDR 120.000", priceNum: 120000, gender: "Women", img: "https://d1yutv2xslo29o.cloudfront.net/product/variant/photo/20eafaeb-0365-4c49-ad4e-4d123350dd56.jpg", badge: "Best Seller", sizes: sizes.bag, rating: 4.6, sold: 5500, location: "Bandung" },
    { id: 35, type: "stationery", name: " Joyko Sticky Notes", price: "IDR 15.000", priceNum: 15000, gender: "Women", img: "https://stationary.co.id/cdn/shop/files/joyko-sticky-notes-memo-stick-75x75mm-mms-1-office-stationery-707_1024x1024.jpg?v=1721472488", badge: "Sale", sizes: sizes.general, rating: 4.8, sold: 12000, location: "Jakarta Utara" },
    
    // --- BATCH 8 (Harga Normal) ---
    { id: 36, type: "shoe", name: "Kanky Story Kitadake", price: "IDR 420.000", priceNum: 420000, gender: "Unisex", img: "https://images.tokopedia.net/img/cache/500-square/aphluv/1997/1/1/0f63f4b52b454c97a2a2ec737262f57c~.jpeg", badge: "New", sizes: sizes.shoe, rating: 4.8, sold: 320, location: "Surabaya" },
    { id: 37, type: "shirt", name: "Bloods Varsity", price: "IDR 450.000", priceNum: 450000, gender: "Unisex", img: "https://id-test-11.slatic.net/p/68e74837c48aa68b1f0427603c583e00.jpg", badge: "Limited", sizes: sizes.apparel, rating: 4.9, sold: 670, location: "Bandung" },
    { id: 38, type: "pant", name: "MENS EQUATOR PANTS", price: "IDR 550.000", priceNum: 550000, gender: "Men", img: "https://d1yutv2xslo29o.cloudfront.net/product/variant/photo/910007510_OLIVE_1_43ea.jpg", badge: "Premium", sizes: sizes.apparel, rating: 4.8, sold: 410, location: "Bandung" },
    { id: 39, type: "bag", name: "Totebag Compass", price: "IDR 225.000", priceNum: 225000, gender: "Men", img: "https://filebroker-cdn.lazada.co.id/kf/Sa408e83e96d44bf3b02dee66bc064d8eS.jpg", badge: null, sizes: sizes.bag, rating: 4.9, sold: 2800, location: "Bandung" },
    { id: 40, type: "stationery", name: "Joyko Eraser", price: "IDR 85.000", priceNum: 85000, gender: "Women", img: "https://siplah.blibli.com/data/images/SFUJ-0001-00151/5e78c2c2-087a-4fa3-a08e-5bf313d57b97.jpg", badge: "Essential", sizes: sizes.book, rating: 4.9, sold: 760, location: "Yogyakarta" },
    
    // --- BATCH 9 (Harga Normal) ---
    { id: 41, type: "shoe", name: "Compass Slip-On", price: "IDR 418.000", priceNum: 418000, gender: "Women", img: "https://down-id.img.susercontent.com/file/sg-11134201-7rdye-lz1aj2njzqy02c", badge: "Sale", sizes: sizes.shoe, rating: 4.7, sold: 1500, location: "Jakarta Selatan" },
    { id: 42, type: "shirt", name: "Jersey Compass", price: "IDR 175.000", priceNum: 175000, gender: "Men", img: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2025/1/15/ab9215a2-0b6c-4fee-bf76-ade554a499ee.jpg", badge: null, sizes: sizes.apparel, rating: 4.6, sold: 430, location: "Bogor" },
    { id: 43, type: "pant", name: "RUCAS SEASON 9 RUCAS GRAND COMBINATION BLACK JEANS", price: "IDR 150.000", priceNum: 150000, gender: "Men", img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/6/24/68246050-f21b-42e1-ae81-d9f6bbf56805.jpg", badge: "Sale", sizes: sizes.apparel, rating: 4.8, sold: 2100, location: "Bandung" },
    { id: 44, type: "bag", name: "Bag Bloods", price: "IDR 199.000", priceNum: 199000, gender: "Unisex", img: "https://down-id.img.susercontent.com/file/ca447c5e514ff4fbe57c0351ec70c0dc_tn.webp", badge: null, sizes: sizes.bag, rating: 4.8, sold: 340, location: "Bandung" },
    { id: 45, type: "stationery", name: "Joyko Sketchbook A4 ", price: "IDR 60.000", priceNum: 60000, gender: "Unisex", img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/6/21/77de3bfe-88a5-49d1-b2cc-26f1da08833c.png", badge: "Art", sizes: ["A4", "A3"], rating: 5.0, sold: 890, location: "Bali" },
    
    // --- BATCH 10 (Harga Normal) ---
    { id: 46, type: "shoe", name: "COMPASS - FLIGHT JKT LOW", price: "IDR 688.000", priceNum: 688000, gender: "Men", img: "https://down-id.img.susercontent.com/file/d5f66ca09ead70f53fba4cf2e2d91c84", badge: "New", sizes: sizes.shoe, rating: 4.9, sold: 620, location: "Jakarta Selatan" },
    { id: 47, type: "shirt", name: "RUCAS T-SHIRT EDITION - INITIAL SPLASH GREY", price: "IDR 85.000", priceNum: 85000, gender: "Women", img: "https://images.tokopedia.net/img/cache/700/aphluv/1997/1/1/90e34b5273a94a348ae6f3b2fb87d020~.jpeg", badge: "Bundle", sizes: sizes.apparel, rating: 4.8, sold: 3300, location: "Tangerang" },
    { id: 48, type: "pant", name: "BENTAYAN CHINOS PANT", price: "IDR 285.000", priceNum: 285000, gender: "Men", img: "https://d1yutv2xslo29o.cloudfront.net/product/variant/media/web/910008632DOL_1.webp", badge: null, sizes: sizes.apparel, rating: 4.7, sold: 510, location: "Bandung" },
    { id: 49, type: "bag", name: "Z-PATHWAY SHOULDER BAG", price: "IDR 89.000", priceNum: 89000, gender: "Women", img: "https://d1yutv2xslo29o.cloudfront.net/product/photo/47b3b108-4e31-47e1-908e-76813ad08e4d.jpg", badge: "Sale", sizes: sizes.bag, rating: 4.6, sold: 4100, location: "Solo" },
    { id: 50, type: "stationery", name: "Joyco Metal Ruler", price: "IDR 20.000", priceNum: 20000, gender: "Unisex", img: "https://id-test-11.slatic.net/p/64c45c09d1eed3a1843a10b06fa09811.jpg", badge: null, sizes: ["30cm", "50cm"], rating: 4.8, sold: 5600, location: "Surabaya" },
];

// FUNGSI CREATE CARD GLOBAL (Tidak perlu diubah lagi)
window.createCard = function(p, index) {
    const card = document.createElement('div');
    card.className = "product-card group relative bg-transparent flex flex-col h-full"; 
    
    const badge = p.badge || '';
    
    let soldDisplay = p.sold;
    if (p.sold >= 1000) {
        soldDisplay = (p.sold / 1000).toFixed(1) + 'k+';
    }

    // Logic Tampilan Harga (Coret jika ada originalPrice)
    let priceHTML = `<p class="font-bold text-sm text-[#1a3c2f]">${p.price}</p>`;
    
    if (p.originalPrice) {
        priceHTML = `
            <div class="flex flex-col items-start gap-0">
                <div class="flex items-center gap-2">
                    <p class="text-[11px] text-gray-400 line-through decoration-red-500 decoration-1">${p.originalPrice}</p>
                    <span class="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">-20%</span>
                </div>
                <p class="font-bold text-sm text-red-600">${p.price}</p>
            </div>
        `;
    }

    // Handling Error Gambar (PENTING! AGAR JIKA URL ERROR, TAMPILAN TIDAK RUSAK)
    card.innerHTML = `
        <div class="relative w-full aspect-[3/4] bg-gray-100 mb-3 overflow-hidden rounded-sm">
            ${badge ? `<div class="absolute top-2 left-2 z-30 bg-brand-green text-brand-bone text-[10px] font-bold uppercase px-2 py-1 tracking-widest shadow-sm">${badge}</div>` : ''}
            <a href="detail.html?id=${p.id}" class="block w-full h-full cursor-pointer">
                <img src="${p.img}" 
                     onerror="this.onerror=null;this.src='${FALLBACK_IMG}';" 
                     class="product-img w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110" 
                     loading="lazy" 
                     alt="${p.name}">
            </a>
            <div class="absolute bottom-0 left-0 w-full p-2 transform translate-y-full group-hover:translate-y-0 transition duration-300 z-40">
                <a href="detail.html?id=${p.id}" class="block w-full bg-brand-bone text-brand-green text-xs font-bold uppercase py-3 tracking-widest hover:bg-brand-accent hover:text-white transition shadow-lg text-center cursor-pointer">View</a>
            </div>
        </div>
        <div class="flex flex-col flex-1 gap-1">
            <a href="detail.html?id=${p.id}" class="text-sm font-headline uppercase leading-tight group-hover:text-brand-green transition truncate w-full block cursor-pointer">${p.name}</a>
            
            ${priceHTML}

            <div class="flex items-center gap-1 text-[10px] text-gray-500 mt-1"><i class="fa-solid fa-location-dot text-gray-400"></i> <span class="truncate">${p.location}</span></div>
            <div class="flex items-center gap-2 text-[10px] mt-1 border-t border-gray-100 pt-2">
                <div class="flex items-center gap-1"><i class="fa-solid fa-star text-yellow-400"></i> <span class="font-bold text-gray-700">${p.rating}</span></div>
                <span class="text-gray-300">|</span>
                <div class="text-gray-500">${soldDisplay} Sold</div>
            </div>
        </div>
    `;
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo(card, { y: 30, opacity: 0 }, { scrollTrigger: { trigger: card, start: "top 95%" }, y: 0, opacity: 1, duration: 0.4, delay: (index % 4) * 0.05 });
    }
    return card;
};

// =================================================================
// 3. LOGIKA DOM & RENDER (Render Grid & Filter)
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- PRE-ORDER LOGIC ---
    const containerExclusive = document.getElementById('exclusive-showcase');
    if (containerExclusive) {
        containerExclusive.innerHTML = `
            <div class="container mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between relative z-10">
                <div class="w-full md:w-1/3 text-brand-bone mb-10 md:mb-0 pl-6 md:pl-0">
                    <div class="flex items-center gap-2 mb-6">
                        <span class="w-8 h-[1px] bg-brand-accent"></span>
                        <span class="text-brand-accent font-bold uppercase tracking-widest text-xs">Limited Edition</span>
                    </div>
                    <h2 class="text-4xl md:text-6xl font-headline uppercase leading-none mb-6">${featuredProduct.name}</h2>
                    <p class="text-gray-400 text-sm md:text-base leading-relaxed mb-8 border-l border-gray-600 pl-4">${featuredProduct.desc}</p>
                    <div class="flex flex-col gap-4">
                        <span class="text-2xl font-body font-light">${featuredProduct.price}</span>
                        <button id="preOrderBtnDynamic" class="bg-brand-bone text-brand-green px-8 py-3 uppercase font-bold tracking-widest hover:bg-brand-accent hover:text-white transition w-max text-xs">Pre-Order Now</button>
                    </div>
                </div>
                <div class="w-full md:w-1/2 h-[40vh] md:h-[50vh] relative">
                     <model-viewer src="${featuredProduct.modelSrc}" alt="${featuredProduct.name}" camera-controls auto-rotate rotation-per-second="20deg" shadow-intensity="2" exposure="1" camera-orbit="-45deg 55deg 2.5m" class="w-full h-full focus:outline-none cursor-grab active:cursor-grabbing" style="--poster-color: transparent;"></model-viewer>
                </div>
            </div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-headline text-white/5 whitespace-nowrap pointer-events-none select-none">SPECIAL OPS</div>
        `;

        const btnDynamic = document.getElementById('preOrderBtnDynamic');
        if(btnDynamic) {
            btnDynamic.addEventListener('click', () => {
                const user = localStorage.getItem('compassCurrentSession');
                if(!user) { alert("Silakan Login terlebih dahulu!"); return; }
                const modal = document.getElementById('preOrderModal');
                if(modal) {
                    modal.classList.remove('hidden');
                    const emailField = document.getElementById('poEmail');
                    if(emailField) emailField.value = user;
                }
            });
        }
    }

    // --- PRE-ORDER MODAL EVENTS ---
    const poModal = document.getElementById('preOrderModal');
    if (poModal) {
        const poCloseBtn = document.getElementById('closePreOrderBtn');
        const poCloseArea = document.getElementById('closePreOrderArea');
        const poForm = document.getElementById('preOrderForm');
        const poMethod = document.getElementById('poPaymentMethod');
        const poInstr = document.getElementById('poPaymentInstruction');
        const estDateDisplay = document.getElementById('estDateDisplay');

        const today = new Date();
        const futureDate = new Date(today.setMonth(today.getMonth() + 2));
        const formattedDate = futureDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        if(estDateDisplay) estDateDisplay.textContent = formattedDate;

        const closeFunc = () => poModal.classList.add('hidden');
        if(poCloseBtn) poCloseBtn.addEventListener('click', closeFunc);
        if(poCloseArea) poCloseArea.addEventListener('click', closeFunc);

        if(poMethod) {
            poMethod.addEventListener('change', (e) => {
                const val = e.target.value;
                poInstr.classList.remove('hidden');
                poInstr.innerHTML = '';
                if (val.includes('va')) {
                    const bank = val.split('_')[0].toUpperCase();
                    const vaNum = "8809" + Math.floor(Math.random() * 1000000000);
                    poInstr.innerHTML = `<div class="bg-blue-50 border border-blue-200 p-4 rounded text-center"><p class="text-[10px] font-bold uppercase mb-1 text-blue-800">${bank} Virtual Account</p><div class="bg-white border border-gray-300 p-2 text-lg font-mono font-bold select-all">${vaNum}</div><p class="text-[9px] text-gray-400 mt-1">Salin nomor dan transfer via M-Banking.</p></div>`;
                } else if (val === 'qris') {
                    poInstr.innerHTML = `<div class="bg-white border border-gray-200 p-4 rounded text-center"><p class="text-[10px] font-bold uppercase mb-2">Scan QR Code</p><div class="flex justify-center bg-white p-2 w-max mx-auto border border-gray-200"><img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=PRE-ORDER-${featuredProduct.id}" alt="QRIS"></div></div>`;
                } else if (val === 'cod') {
                    poInstr.innerHTML = `<div class="bg-yellow-50 border border-yellow-200 p-4 rounded text-center"><i class="fa-solid fa-truck-fast text-2xl text-yellow-600 mb-2"></i><p class="text-sm font-bold text-yellow-800">Cash On Delivery</p><p class="text-xs text-gray-500 mt-1">Bayar lunas saat barang Pre-Order dikirim.</p></div>`;
                } else {
                    poInstr.classList.add('hidden');
                }
            });
        }

        if(poForm) {
            poForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = poForm.querySelector('button[type="submit"]');
                btn.innerText = "Processing...";
                btn.disabled = true;

                setTimeout(() => {
                    const newOrder = {
                        id: "PRE-" + Date.now(),
                        userEmail: localStorage.getItem('compassCurrentSession'), 
                        total: featuredProduct.priceNum,
                        orderDate: Date.now(),
                        status: 'preorder',
                        isPreOrder: true,
                        deliveryDate: formattedDate,
                        items: [{
                            productId: featuredProduct.id,
                            name: featuredProduct.name,
                            price: featuredProduct.priceNum,
                            img: featuredProduct.img,
                            size: "Limited Edition",
                            qty: 1
                        }]
                    };
                    let orders = JSON.parse(localStorage.getItem('compassOrders')) || [];
                    orders.push(newOrder);
                    localStorage.setItem('compassOrders', JSON.stringify(orders));
                    alert(`Pre-Order Berhasil! Barang akan dikirim pada: ${formattedDate}`);
                    window.location.href = "orders.html";
                }, 2000);
            });
        }
    }

    // --- GRID RENDER LOGIC ---
    const containerTop = document.getElementById('grid-top');
    const containerBottom = document.getElementById('grid-bottom');
    const collectionGrid = document.getElementById('collection-grid');

    if (containerTop || collectionGrid) {
        
        const searchInput = document.getElementById('navbarSearchInput') || document.getElementById('searchInput');
        const categorySelect = document.getElementById('categoryFilter');
        const genderSelect = document.getElementById('genderFilter');
        const priceSelect = document.getElementById('priceFilter');
        const resetBtn = document.getElementById('resetBtn');
        const filterBtns = document.querySelectorAll('.filter-btn');

        let state = { search: "", category: "all", status: "all", gender: "all", priceRange: "all" };

        const renderApp = (products) => {
            if (containerTop) {
                containerTop.innerHTML = '';
                if (products.length === 0) {
                    containerTop.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400">No Products Found</div>`;
                } else {
                    products.slice(0, 8).forEach((p, i) => containerTop.appendChild(window.createCard(p, i)));
                    if (containerBottom && products.length > 8) {
                        products.slice(8).forEach((p, i) => containerBottom.appendChild(window.createCard(p, i)));
                    }
                }
            }
            if (collectionGrid) {
                collectionGrid.innerHTML = '';
                if (products.length === 0) {
                    collectionGrid.innerHTML = `<div class="col-span-full text-center py-20 text-gray-400 font-headline text-2xl">No Products Found</div>`;
                } else {
                    products.forEach((p, i) => collectionGrid.appendChild(window.createCard(p, i)));
                }
            }
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        };

        const applyFilters = () => {
            const source = window.allProducts;
            const filtered = source.filter(p => {
                const matchSearch = p.name.toLowerCase().includes(state.search.toLowerCase());
                
                let matchCat = true;
                if (state.category === 'student_promo') {
                    matchCat = p.badge === 'Student Promo'; 
                } else {
                    matchCat = state.category === 'all' || p.type === state.category || (p.badge && p.badge === state.category);
                }
                
                let matchGen = true;
                if (state.gender !== 'all') {
                    if (state.gender === 'Women') matchGen = p.gender === 'Women' || p.gender === 'Unisex';
                    else if (state.gender === 'Men') matchGen = p.gender === 'Men' || p.gender === 'Unisex';
                    else matchGen = p.gender === state.gender;
                }
                
                let matchPrice = true;
                if (state.priceRange === 'under_500') matchPrice = p.priceNum < 500000;
                else if (state.priceRange === '500_800') matchPrice = p.priceNum >= 500000 && p.priceNum <= 800000;
                else if (state.priceRange === 'above_800') matchPrice = p.priceNum > 800000;
                
                return matchSearch && matchCat && matchGen && matchPrice;
            });
            renderApp(filtered);
        };

        const params = new URLSearchParams(window.location.search);
        const urlSearch = params.get('search');
        if (urlSearch) {
            state.search = urlSearch;
            if(searchInput) searchInput.value = urlSearch;
        }
        const urlCategory = params.get('category');
        if (urlCategory) {
            state.category = urlCategory;
            if(categorySelect && categorySelect.querySelector(`option[value="${urlCategory}"]`)) {
                categorySelect.value = urlCategory;
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => { 
                if (window.location.pathname.includes('collection.html')) {
                    state.search = e.target.value; applyFilters(); 
                }
            });
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const keyword = e.target.value.trim();
                    if (window.location.pathname.includes('collection.html')) {
                        state.search = keyword; applyFilters();
                    } else {
                        window.location.href = `collection.html?search=${encodeURIComponent(keyword)}`;
                    }
                }
            });
        }

        if (categorySelect) categorySelect.addEventListener('change', (e) => { state.category = e.target.value; applyFilters(); });
        if (genderSelect) genderSelect.addEventListener('change', (e) => { state.gender = e.target.value; applyFilters(); });
        if (priceSelect) priceSelect.addEventListener('change', (e) => { state.priceRange = e.target.value; applyFilters(); });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('bg-[#1a3c2f]', 'text-white', 'border-[#1a3c2f]', 'text-brand-green');
                    b.classList.add('text-gray-400', 'border-gray-300'); 
                });
                btn.classList.remove('text-gray-400', 'border-gray-300');
                if(btn.classList.contains('rounded-full')) {
                    btn.classList.add('bg-[#1a3c2f]', 'text-white', 'border-[#1a3c2f]'); 
                } else {
                    btn.classList.add('text-brand-green', 'border-brand-green'); 
                }
                state.category = btn.getAttribute('data-filter');
                applyFilters();
            });
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                state = { search: "", category: "all", status: "all", gender: "all", priceRange: "all" };
                if (searchInput) searchInput.value = "";
                if (categorySelect) categorySelect.value = "all";
                if (genderSelect) genderSelect.value = "all";
                if (priceSelect) priceSelect.value = "all";
                window.history.pushState({}, document.title, window.location.pathname);
                applyFilters();
            });
        }

        applyFilters();
    }
});