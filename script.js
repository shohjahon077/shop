// ============ DOM ELEMENTLARI ============
const loading = document.querySelector('.loading');
const navLinks = document.querySelector('.nav-links');
const menuBtn = document.getElementById('menuBtn');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartBody = document.getElementById('cartBody');
const cartTotalPrice = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const orderModal = document.getElementById('orderModal');
const closeOrderBtn = document.getElementById('closeOrderModal');
const orderForm = document.getElementById('orderForm');
const successModal = document.getElementById('successModal');
const continueBtn = document.getElementById('continueBtn');
const cancelModal = document.getElementById('cancelModal');
const closeCancelBtn = document.getElementById('closeCancelModal');
const cancelForm = document.getElementById('cancelForm');
const overlay = document.querySelector('.overlay');
const adminBtn = document.getElementById('adminBtn');
const telegramModal = document.getElementById('telegramModal');
const closeTelegramBtn = document.getElementById('closeTelegramModal');
const adminModal = document.getElementById('adminModal');
const closeAdminBtn = document.getElementById('closeAdminModal');
const scrollTopBtn = document.getElementById('scrollTop');
const ordersList = document.getElementById('ordersList');
const saveTelegramBtn = document.getElementById('saveTelegramBtn');
const testTelegramBtn = document.getElementById('testTelegramBtn');
const clearOrdersBtn = document.getElementById('clearOrdersBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const customerNameInput = document.getElementById('customerName');
const customerPhoneInput = document.getElementById('customerPhone');
const customerAddressInput = document.getElementById('customerAddress');
const telegramTokenInput = document.getElementById('telegramToken');
const telegramChatIdInput = document.getElementById('telegramChatId');
const successOrderNumber = document.getElementById('successOrderNumber');
const successOrderTotal = document.getElementById('successOrderTotal');

// ============ GLOBAL O'ZGARGUVCHILAR ============
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
let telegramConfig = JSON.parse(localStorage.getItem('telegramConfig')) || {
    token: '',
    chatId: ''
};

// ============ SAYT YUKLANGANDA ============
document.addEventListener('DOMContentLoaded', function() {
    // Loadingni yashirish
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);

    // Mahsulotlarni yuklash
    loadProducts();
    
    // Savatni yangilash
    updateCart();
    
    // Telegram sozlamalarini yuklash
    loadTelegramConfig();
    
    // Event listenerlarni o'rnatish
    setupEventListeners();
    
    // Scroll event
    window.addEventListener('scroll', handleScroll);
});

// ============ EVENT LISTENERLARNI O'RNATISH ============
function setupEventListeners() {
    // Mobile menu
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Savat ochish/yopish
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // Mahsulot filtrlash
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn));
    });
    
    // Buyurtma berish
    checkoutBtn.addEventListener('click', openOrderModal);
    closeOrderBtn.addEventListener('click', () => closeModal(orderModal));
    
    // Order form
    orderForm.addEventListener('submit', handleOrderSubmit);
    
    // Success modal
    continueBtn.addEventListener('click', () => closeModal(successModal));
    
    // Cancel order
    closeCancelBtn.addEventListener('click', () => closeModal(cancelModal));
    cancelForm.addEventListener('submit', handleCancelSubmit);
    
    // Overlay
    overlay.addEventListener('click', closeAllModals);
    
    // Admin panel
    adminBtn.addEventListener('click', openAdminPanel);
    closeAdminBtn.addEventListener('click', () => closeModal(adminModal));
    
    // Telegram modal
    closeTelegramBtn.addEventListener('click', () => closeModal(telegramModal));
    
    // Scroll to top
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Telegram sozlamalari
    if (saveTelegramBtn) {
        saveTelegramBtn.addEventListener('click', saveTelegramSettings);
    }
    
    if (testTelegramBtn) {
        testTelegramBtn.addEventListener('click', testTelegram);
    }
    
    // Admin actions
    if (clearOrdersBtn) {
        clearOrdersBtn.addEventListener('click', clearAllOrders);
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearAllCart);
    }
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Admin tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });
}

// ============ MAHSULOTLARNI YUKLASH VA KO'RSATISH ============
function loadProducts() {
    products = [
        {
            id: 1,
            name: 'Erkaklar koylak',
            category: 'men',
            price: 120000,
            originalPrice: 150000,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            badge: 'Yangi',
            rating: 4.5
        },
        {
            id: 2,
            name: 'Ayollar ko\'ylak',
            category: 'women',
            price: 180000,
            originalPrice: 220000,
            image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            badge: 'Chegirma',
            rating: 4.8
        },
        {
            id: 3,
            name: 'Bolalar futbolkasi',
            category: 'kids',
            price: 65000,
            originalPrice: 80000,
            image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            badge: null,
            rating: 4.2
        },
        {
            id: 4,
            name: 'Erkaklar shim',
            category: 'men',
            price: 200000,
            originalPrice: 250000,
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            badge: null,
            rating: 4.7
        },
        {
            id: 5,
            name: 'Ayollar yubka',
            category: 'women',
            price: 160000,
            originalPrice: 200000,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            badge: 'Yangi',
            rating: 4.4
        },
        {
            id: 6,
            name: 'Bolalar shim',
            category: 'kids',
            price: 90000,
            originalPrice: 110000,
            image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            badge: null,
            rating: 4.6
        }
    ];
    
    renderProducts();
}

function renderProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? 
                        `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : 
                        ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Savatga</button>
                    <button class="wishlist-btn">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Savatga qo'shish
        const addBtn = productCard.querySelector('.add-to-cart');
        addBtn.addEventListener('click', () => addToCart(product));
        
        // Sevimlilarga qo'shish
        const wishBtn = productCard.querySelector('.wishlist-btn');
        wishBtn.addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            showNotification(
                icon.classList.contains('fas') 
                    ? 'Sevimlilarga qo\'shildi' 
                    : 'Sevimlilardan olindi'
            );
        });
        
        productsGrid.appendChild(productCard);
    });
}

function filterProducts(button) {
    // Active classni o'zgartirish
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter qilish
    const filter = button.getAttribute('data-filter');
    renderProducts(filter);
}

// ============ SAVAT FUNKSIYALARI ============
function addToCart(product) {
    // Mahsulot savatda bormi?
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Mahsulot savatga qo\'shildi');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Mahsulot savatdan olindi');
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCart();
        }
    }
}

function updateCart() {
    // LocalStorage ga saqlash
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cart badge yangilash
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Cart items ni chizish
    renderCartItems();
    
    // Total summa
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = formatPrice(total);
}

function renderCartItems() {
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Savatda mahsulot yo'q</p>
                <a href="#products" class="btn secondary-btn">Xarid qilish</a>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Quantity buttons
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        minusBtn.addEventListener('click', () => {
            const item = cart.find(i => i.id === parseInt(minusBtn.dataset.id));
            if (item) {
                updateQuantity(item.id, item.quantity - 1);
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const item = cart.find(i => i.id === parseInt(plusBtn.dataset.id));
            if (item) {
                updateQuantity(item.id, item.quantity + 1);
            }
        });
        
        removeBtn.addEventListener('click', () => {
            removeFromCart(parseInt(removeBtn.dataset.id));
        });
        
        cartBody.appendChild(cartItem);
    });
}

function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// ============ BUYURTMA BERISH ============
function openOrderModal() {
    if (cart.length === 0) {
        showNotification('Savat bo\'sh', 'warning');
        return;
    }
    
    closeCart();
    orderModal.classList.add('active');
    overlay.classList.add('active');
    
    // Formani tozalash
    orderForm.reset();
}

async function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Ma'lumotlarni olish
    const name = customerNameInput.value.trim();
    const phone = customerPhoneInput.value.trim();
    const address = customerAddressInput.value.trim();
    const note = document.getElementById('customerNote')?.value.trim() || '';
    
    // Validatsiya
    if (!name || !phone || !address) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        
        // Bo'sh maydonlarni belgilash
        if (!name) customerNameInput.style.borderColor = '#ff4757';
        if (!phone) customerPhoneInput.style.borderColor = '#ff4757';
        if (!address) customerAddressInput.style.borderColor = '#ff4757';
        
        // 3 soniyadan keyin belgilashni olib tashlash
        setTimeout(() => {
            customerNameInput.style.borderColor = '';
            customerPhoneInput.style.borderColor = '';
            customerAddressInput.style.borderColor = '';
        }, 3000);
        
        return;
    }
    
    // Telefon raqamini tekshirish
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
        showNotification('Telefon raqami noto\'g\'ri', 'warning');
        customerPhoneInput.style.borderColor = '#ff4757';
        setTimeout(() => {
            customerPhoneInput.style.borderColor = '';
        }, 3000);
        return;
    }
    
    // Loading ko'rsatish
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ishlanmoqda...';
    submitBtn.disabled = true;
    
    try {
        // Buyurtma yaratish
        const order = createOrder(name, phone, address, note);
        
        // Modalni yopish
        closeModal(orderModal);
        
        // Success modalni ochish
        showSuccessModal(order);
        
        // Formani tozalash
        orderForm.reset();
        
        // Telegramga yuborish
        await sendOrderToTelegram(order);
        
        // Savatni tozalash
        cart = [];
        updateCart();
        
    } catch (error) {
        console.error('Xatolik:', error);
        showNotification('Xatolik yuz berdi', 'error');
    } finally {
        // Buttonni tiklash
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function createOrder(name, phone, address, note) {
    orderCounter++;
    localStorage.setItem('orderCounter', orderCounter.toString());
    
    const order = {
        id: `ORD-${orderCounter}`,
        date: new Date().toLocaleString('uz-UZ'),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'yetkazilmoqda',
        customer: { name, phone, address, note },
        telegramSent: false
    };
    
    // Buyurtmalar ro'yxatiga qo'shish
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    return order;
}

function showSuccessModal(order) {
    // Ma'lumotlarni to'ldirish
    successOrderNumber.textContent = order.id;
    successOrderTotal.textContent = formatPrice(order.total);
    
    // Modalni ochish
    successModal.classList.add('active');
    overlay.classList.add('active');
}

// ============ TELEGRAM FUNKSIYALARI ============
function loadTelegramConfig() {
    if (telegramTokenInput && telegramChatIdInput) {
        telegramTokenInput.value = telegramConfig.token || '8055090268:AAHtu9cy9lnZw_GFZqo8mc860Bj9G3H7vOU';
        telegramChatIdInput.value = telegramConfig.chatId || '8136720315';
    }
}

function saveTelegramSettings() {
    const token = telegramTokenInput.value.trim();
    const chatId = telegramChatIdInput.value.trim();
    
    if (!token || !chatId) {
        showNotification('Iltimos, ikkala maydonni ham to\'ldiring', 'warning');
        return;
    }
    
    telegramConfig = { token, chatId };
    localStorage.setItem('telegramConfig', JSON.stringify(telegramConfig));
    
    showNotification('Telegram sozlamalari saqlandi', 'success');
    closeModal(telegramModal);
}

async function testTelegram() {
    const token = telegramTokenInput.value.trim();
    const chatId = telegramChatIdInput.value.trim();
    
    if (!token || !chatId) {
        showNotification('Avval token va Chat ID ni kiriting', 'warning');
        return;
    }
    
    try {
        const message = `✅ <b>Test xabar!</b>\n\nModaDo'kon boti to'g\'ri ishlayapti.\nVaqt: ${new Date().toLocaleString('uz-UZ')}`;
        
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            showNotification('Test xabar yuborildi! Telegramni tekshiring.', 'success');
        } else {
            showNotification('Xatolik: Token yoki Chat ID noto\'g\'ri', 'error');
        }
    } catch (error) {
        showNotification('Ulanish xatosi', 'error');
    }
}

async function sendOrderToTelegram(order) {
    if (!telegramConfig.token || !telegramConfig.chatId) {
        console.log('Telegram bot sozlanmagan');
        return false;
    }
    
    try {
        const message = formatTelegramMessage(order);
        
        const response = await fetch(`https://api.telegram.org/bot${telegramConfig.token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            // Buyurtma holatini yangilash
            const orderIndex = orders.findIndex(o => o.id === order.id);
            if (orderIndex !== -1) {
                orders[orderIndex].telegramSent = true;
                localStorage.setItem('orders', JSON.stringify(orders));
            }
            
            return true;
        } else {
            console.error('Telegram xatosi:', data);
            return false;
        }
    } catch (error) {
        console.error('Ulanish xatosi:', error);
        return false;
    }
}

function formatTelegramMessage(order) {
    const itemsText = order.items.map(item => 
        `├ ${item.name}\n│   ${item.quantity} ta × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
    ).join('\n');
    
    return `🛒 <b>YANGI BUYURTMA!</b>

📦 <b>Buyurtma raqami:</b> ${order.id}
📅 <b>Sana:</b> ${order.date}
👤 <b>Mijoz:</b> ${order.customer.name}
📞 <b>Telefon:</b> ${order.customer.phone}
📍 <b>Manzil:</b> ${order.customer.address}
${order.customer.note ? `💬 <b>Izoh:</b> ${order.customer.note}\n` : ''}

📋 <b>Mahsulotlar:</b>
${itemsText}

💰 <b>Jami summa:</b> ${formatPrice(order.total)}
🚚 <b>Holati:</b> ${order.status}

⏰ <b>Vaqt:</b> ${new Date().toLocaleTimeString('uz-UZ')}`;
}

// ============ BUYURTMA BEKOR QILISH ============
function handleCancelSubmit(e) {
    e.preventDefault();
    
    const orderNumber = document.getElementById('cancelOrderNumber').value.trim();
    const phone = document.getElementById('cancelPhone').value.trim();
    const reason = document.getElementById('cancelReason').value;
    
    if (!orderNumber || !phone || !reason) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        return;
    }
    
    // Buyurtmani topish
    const orderIndex = orders.findIndex(order => order.id === orderNumber);
    
    if (orderIndex === -1) {
        showNotification('Buyurtma topilmadi', 'error');
        return;
    }
    
    // Statusni o'zgartirish
    orders[orderIndex].status = 'bekor qilindi';
    orders[orderIndex].cancelled = {
        date: new Date().toLocaleString('uz-UZ'),
        reason: reason,
        phone: phone
    };
    
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Modalni yopish
    closeModal(cancelModal);
    
    // Formani tozalash
    cancelForm.reset();
    
    // Xabar berish
    showNotification('Buyurtma bekor qilindi', 'success');
    
    // Telegramga xabar yuborish
    sendCancelToTelegram(orders[orderIndex]);
}

async function sendCancelToTelegram(order) {
    if (!telegramConfig.token || !telegramConfig.chatId) return;
    
    const message = `❌ <b>BUYURTMA BEKOR QILINDI!</b>\n\n📦 <b>Buyurtma:</b> ${order.id}\n📅 <b>Sana:</b> ${order.cancelled.date}\n📞 <b>Telefon:</b> ${order.cancelled.phone}\n📝 <b>Sabab:</b> ${getReasonText(order.cancelled.reason)}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${telegramConfig.token}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
    } catch (error) {
        console.error('Cancel notification error:', error);
    }
}

function getReasonText(reason) {
    const reasons = {
        'change_mind': 'Fikrimni o\'zgartirdim',
        'delivery_time': 'Yetkazib berish vaqti uzoq',
        'other': 'Boshqa sabab'
    };
    return reasons[reason] || reason;
}

// ============ ADMIN PANEL ============
function openAdminPanel() {
    adminModal.classList.add('active');
    overlay.classList.add('active');
    updateOrdersList();
}

function switchTab(button) {
    // Active classni o'zgartirish
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Tab contentlarni ko'rsatish/yashirish
    const tabName = button.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(`${tabName}Tab`);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
}

function updateOrdersList() {
    if (!ordersList) return;
    
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="text-center">Hozircha buyurtmalar yo\'q</p>';
        return;
    }
    
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item-admin';
        orderItem.innerHTML = `
            <div class="order-header">
                <span class="order-id">${order.id}</span>
                <span class="order-time">${order.date}</span>
            </div>
            <div class="order-products">
                ${order.items.map(item => `${item.name} (${item.quantity} ta)`).join(', ')}
            </div>
            <div class="order-customer">
                <span>👤 ${order.customer.name}</span>
                <span>📞 ${order.customer.phone}</span>
            </div>
            <div class="order-footer">
                <span class="order-status ${order.status === 'bekor qilindi' ? 'status-cancelled' : 'status-active'}">
                    ${order.status === 'bekor qilindi' ? '❌ ' : '✅ '}${order.status}
                </span>
                <span class="order-total">${formatPrice(order.total)}</span>
            </div>
        `;
        ordersList.appendChild(orderItem);
    });
}

function clearAllOrders() {
    if (confirm('Barcha buyurtmalarni o\'chirishni tasdiqlaysizmi?')) {
        orders = [];
        localStorage.removeItem('orders');
        localStorage.removeItem('orderCounter');
        orderCounter = 1000;
        updateOrdersList();
        showNotification('Barcha buyurtmalar o\'chirildi', 'success');
    }
}

function clearAllCart() {
    if (confirm('Savatni tozalashni tasdiqlaysizmi?')) {
        cart = [];
        updateCart();
        showNotification('Savat tozalandi', 'success');
    }
}

// ============ YORDAMCHI FUNKSIYALAR ============
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

function showNotification(message, type = 'success') {
    // Notification yaratish
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Icon va rang
    let icon = 'fa-check-circle';
    let color = '#4CAF50';
    
    if (type === 'warning') {
        icon = 'fa-exclamation-triangle';
        color = '#FFA502';
    } else if (type === 'error') {
        icon = 'fa-times-circle';
        color = '#FF4757';
    } else if (type === 'info') {
        icon = 'fa-info-circle';
        color = '#2D3047';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Style
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 4000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Ko'rinish animatsiyasi
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 3 soniyadan keyin yashirish
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
    }
    overlay.classList.remove('active');
}

function closeAllModals() {
    // Barcha modal va sidebar larni yopish
    const modals = [
        cartSidebar,
        orderModal,
        successModal,
        cancelModal,
        telegramModal,
        adminModal
    ];
    
    modals.forEach(modal => {
        if (modal) {
            modal.classList.remove('active');
        }
    });
    
    // Mobile menuni yopish
    navLinks.classList.remove('active');
    
    // Overlay ni yopish
    overlay.classList.remove('active');
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
}

function handleNavClick(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        // Active classni o'zgartirish
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll qilish
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Mobile menuni yopish
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
}

function handleScroll() {
    // Header background
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
    
    // Scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
    
    // Active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ KEYBOARD SHORTCUTS ============
document.addEventListener('keydown', function(e) {
    // ESC - barcha modal va sidebar larni yopish
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl + Shift + A - Admin panel
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminPanel();
    }
    
    // Ctrl + Shift + T - Telegram sozlamalari
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        telegramModal.classList.add('active');
        overlay.classList.add('active');
    }
});

// ============ DEBUG FUNKSIYALARI ============
// Konsolda test qilish uchun
window.debug = {
    getCart: () => cart,
    getOrders: () => orders,
    getTelegramConfig: () => telegramConfig,
    addTestProduct: () => {
        const testProduct = {
            id: Date.now(),
            name: 'Test mahsulot',
            price: 100000,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        };
        addToCart(testProduct);
    },
    clearAll: () => {
        cart = [];
        orders = [];
        localStorage.clear();
        updateCart();
        updateOrdersList();
        showNotification('Barcha ma\'lumotlar tozalandi', 'success');
    }
};

console.log('🔧 Debug funksiyalari mavjud: window.debug');
