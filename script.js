// DOM elementlarini tanlab olish
const loading = document.querySelector('.loading');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
const cartBtn = document.getElementById('cartBtn');
const cartBadge = document.getElementById('cartBadge');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartBody = document.getElementById('cartBody');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const orderModal = document.getElementById('orderModal');
const closeOrderBtn = document.getElementById('closeOrderModal');
const orderForm = document.getElementById('orderForm');
const successModal = document.getElementById('successModal');
const continueBtn = document.getElementById('continueBtn');
const cancelModal = document.getElementById('cancelModal');
const cancelForm = document.getElementById('cancelForm');
const closeCancelBtn = document.getElementById('closeCancelModal');
const overlay = document.querySelector('.overlay');
const adminBtn = document.getElementById('adminBtn');
const telegramModal = document.getElementById('telegramModal');
const closeTelegramBtn = document.getElementById('closeTelegramModal');
const adminModal = document.getElementById('adminModal');
const closeAdminBtn = document.getElementById('closeAdminModal');
const scrollTopBtn = document.getElementById('scrollTop');

// Global o'zgaruvchilar
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
let telegramConfig = JSON.parse(localStorage.getItem('telegramConfig')) || {
    token: '8055090268:AAHtu9cy9lnZw_GFZqo8mc860Bj9G3H7vOU',
    chatId: '8136720315'
};

// Sayt yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
    
    loadProducts();
    updateCart();
    loadTelegramConfig();
    setupEventListeners();
    window.addEventListener('scroll', handleScroll);
});

// Event listenerlarni o'rnatish
function setupEventListeners() {
    // Mobile menu
    if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Cart
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn));
    });
    
    // Checkout
    if (checkoutBtn) checkoutBtn.addEventListener('click', openOrderModal);
    if (closeOrderBtn) closeOrderBtn.addEventListener('click', () => closeModal(orderModal));
    
    // Order form
    if (orderForm) orderForm.addEventListener('submit', handleOrderSubmit);
    
    // Success modal
    if (continueBtn) continueBtn.addEventListener('click', () => closeModal(successModal));
    
    // Cancel modal
    if (closeCancelBtn) closeCancelBtn.addEventListener('click', () => closeModal(cancelModal));
    if (cancelForm) cancelForm.addEventListener('submit', handleCancelSubmit);
    
    // Overlay
    if (overlay) overlay.addEventListener('click', closeAllModals);
    
    // Admin
    if (adminBtn) adminBtn.addEventListener('click', openAdminPanel);
    if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => closeModal(adminModal));
    if (closeTelegramBtn) closeTelegramBtn.addEventListener('click', () => closeModal(telegramModal));
    
    // Scroll to top
    if (scrollTopBtn) scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Admin tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });
    
    // Telegram buttons
    const saveTelegramBtn = document.getElementById('saveTelegramBtn');
    const testTelegramBtn = document.getElementById('testTelegramBtn');
    
    if (saveTelegramBtn) saveTelegramBtn.addEventListener('click', saveTelegramSettings);
    if (testTelegramBtn) testTelegramBtn.addEventListener('click', testTelegram);
    
    // Admin actions
    const clearOrdersBtn = document.getElementById('clearOrdersBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    
    if (clearOrdersBtn) clearOrdersBtn.addEventListener('click', clearAllOrders);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearAllCart);
}

// Mahsulotlarni yuklash
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

// Mahsulotlarni ko'rsatish
function renderProducts(filter = 'all') {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
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
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Savatga</button>
                    <button class="wishlist-btn">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        const addBtn = productCard.querySelector('.add-to-cart');
        addBtn.addEventListener('click', () => addToCart(product));
        
        const wishBtn = productCard.querySelector('.wishlist-btn');
        wishBtn.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
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

// Mahsulotlarni filtrlash
function filterProducts(button) {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    renderProducts(filter);
}

// Savatga mahsulot qo'shish
function addToCart(product) {
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

// Savatdan mahsulot o'chirish
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Mahsulot savatdan olindi');
}

// Miqdorni yangilash
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

// Savatni yangilash
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }
    
    renderCartItems();
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = formatPrice(total);
    }
}

// Savat elementlarini chizish
function renderCartItems() {
    if (!cartBody) return;
    
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
        
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        minusBtn.addEventListener('click', function() {
            const item = cart.find(i => i.id === parseInt(this.dataset.id));
            if (item) updateQuantity(item.id, item.quantity - 1);
        });
        
        plusBtn.addEventListener('click', function() {
            const item = cart.find(i => i.id === parseInt(this.dataset.id));
            if (item) updateQuantity(item.id, item.quantity + 1);
        });
        
        removeBtn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.id));
        });
        
        cartBody.appendChild(cartItem);
    });
}

// Savatni ochish
function openCart() {
    if (cartSidebar) cartSidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
}

// Savatni yopish
function closeCart() {
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

// Buyurtma modali
function openOrderModal() {
    if (cart.length === 0) {
        showNotification('Savat bo\'sh', 'warning');
        return;
    }
    
    closeCart();
    
    if (orderModal) orderModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    
    if (orderForm) orderForm.reset();
}

// Buyurtma yuborish
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const note = document.getElementById('customerNote')?.value.trim() || '';
    
    if (!name || !phone || !address) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        return;
    }
    
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
        showNotification('Telefon raqami noto\'g\'ri', 'warning');
        return;
    }
    
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ishlanmoqda...';
    submitBtn.disabled = true;
    
    try {
        const order = createOrder(name, phone, address, note);
        
        closeModal(orderModal);
        showSuccessModal(order);
        
        if (orderForm) orderForm.reset();
        
        await sendOrderToTelegram(order);
        
        cart = [];
        updateCart();
        
    } catch (error) {
        console.error('Xatolik:', error);
        showNotification('Xatolik yuz berdi', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Buyurtma yaratish
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
    
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    return order;
}

// Muvaffaqiyat modali
function showSuccessModal(order) {
    const orderNumberElem = document.getElementById('successOrderNumber');
    const orderTotalElem = document.getElementById('successOrderTotal');
    
    if (orderNumberElem) orderNumberElem.textContent = order.id;
    if (orderTotalElem) orderTotalElem.textContent = formatPrice(order.total);
    
    if (successModal) successModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
}

// Telegram sozlamalari
function loadTelegramConfig() {
    const tokenInput = document.getElementById('telegramToken');
    const chatIdInput = document.getElementById('telegramChatId');
    
    if (tokenInput && chatIdInput) {
        tokenInput.value = telegramConfig.token || '';
        chatIdInput.value = telegramConfig.chatId || '';
    }
}

function saveTelegramSettings() {
    const tokenInput = document.getElementById('telegramToken');
    const chatIdInput = document.getElementById('telegramChatId');
    
    if (!tokenInput || !chatIdInput) return;
    
    const token = tokenInput.value.trim();
    const chatId = chatIdInput.value.trim();
    
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
    const tokenInput = document.getElementById('telegramToken');
    const chatIdInput = document.getElementById('telegramChatId');
    
    if (!tokenInput || !chatIdInput) return;
    
    const token = tokenInput.value.trim();
    const chatId = chatIdInput.value.trim();
    
    if (!token || !chatId) {
        showNotification('Avval token va Chat ID ni kiriting', 'warning');
        return;
    }
    
    const testBtn = document.getElementById('testTelegramBtn');
    const originalText = testBtn.innerHTML;
    testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testlanmoqda...';
    testBtn.disabled = true;
    
    try {
        const testMessage = `✅ <b>Test xabar!</b>\n\nModaDo'kon boti to'g\'ri ishlayapti.\n\n📅 Sana: ${new Date().toLocaleDateString('uz-UZ')}\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}`;
        
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: testMessage,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            showNotification('✅ Test xabar yuborildi! Telegramni tekshiring.', 'success');
            telegramConfig = { token, chatId };
            localStorage.setItem('telegramConfig', JSON.stringify(telegramConfig));
        } else {
            let errorMessage = 'Noma\'lum xatolik';
            if (data.description) errorMessage = data.description;
            showNotification(`❌ Xatolik: ${errorMessage}`, 'error');
        }
    } catch (error) {
        showNotification('❌ Ulanish xatosi', 'error');
    } finally {
        testBtn.innerHTML = originalText;
        testBtn.disabled = false;
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
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
    const itemsText = order.items.map((item, index) => {
        const total = item.price * item.quantity;
        return `${index + 1}. ${item.name}\n   Miqdor: ${item.quantity} ta\n   Narx: ${formatPrice(item.price)}\n   Jami: ${formatPrice(total)}`;
    }).join('\n\n');
    
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

// Buyurtmani bekor qilish
function handleCancelSubmit(e) {
    e.preventDefault();
    
    const orderNumber = document.getElementById('cancelOrderNumber').value.trim();
    const phone = document.getElementById('cancelPhone').value.trim();
    const reason = document.getElementById('cancelReason').value;
    
    if (!orderNumber || !phone || !reason) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        return;
    }
    
    const orderIndex = orders.findIndex(order => order.id === orderNumber);
    
    if (orderIndex === -1) {
        showNotification('Buyurtma topilmadi', 'error');
        return;
    }
    
    orders[orderIndex].status = 'bekor qilindi';
    orders[orderIndex].cancelled = {
        date: new Date().toLocaleString('uz-UZ'),
        reason: reason,
        phone: phone
    };
    
    localStorage.setItem('orders', JSON.stringify(orders));
    
    closeModal(cancelModal);
    cancelForm.reset();
    showNotification('Buyurtma bekor qilindi', 'success');
    sendCancelToTelegram(orders[orderIndex]);
}

async function sendCancelToTelegram(order) {
    if (!telegramConfig.token || !telegramConfig.chatId) return;
    
    const message = `❌ <b>BUYURTMA BEKOR QILINDI!</b>\n\n📦 <b>Buyurtma:</b> ${order.id}\n📅 <b>Sana:</b> ${order.cancelled.date}\n📞 <b>Telefon:</b> ${order.cancelled.phone}\n📝 <b>Sabab:</b> ${getReasonText(order.cancelled.reason)}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${telegramConfig.token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

// Admin panel
function openAdminPanel() {
    if (adminModal) adminModal.classList.add('active');
    if (overlay) overlay.classList.add('active');
    updateOrdersList();
}

function switchTab(button) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    const tabName = button.getAttribute('data-tab');
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    const activeTab = document.getElementById(`${tabName}Tab`);
    if (activeTab) activeTab.style.display = 'block';
}

function updateOrdersList() {
    const ordersList = document.getElementById('ordersList');
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

// Yordamchi funksiyalar
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    
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
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
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
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function closeAllModals() {
    const modals = [
        cartSidebar,
        orderModal,
        successModal,
        cancelModal,
        telegramModal,
        adminModal
    ];
    
    modals.forEach(modal => {
        if (modal) modal.classList.remove('active');
    });
    
    if (navLinks) navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function toggleMobileMenu() {
    if (navLinks) navLinks.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function handleNavClick(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
        
        if (window.innerWidth <= 768) {
            if (navLinks) navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    }
}

function handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    }
    
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
