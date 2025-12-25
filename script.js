// ===== KONFIGURATSIYA =====
const CONFIG = {
    TELEGRAM_BOT_TOKEN: '8055090268:AAHtu9cy9lnZw_GFZqo8mc860Bj9G3H7vOU',
    TELEGRAM_CHAT_ID: '8136720315',
    API_URL: 'https://api.telegram.org/bot'
};

// ===== DOM ELEMENTLAR =====
const loader = document.querySelector('.loader');
const navMenu = document.querySelector('.nav-menu');
const menuBtn = document.querySelector('#menuBtn');
const cartBtn = document.querySelector('#cartBtn');
const cartCount = document.querySelector('#cartCount');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('#closeCart');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const checkoutBtn = document.querySelector('#checkoutBtn');
const productsGrid = document.querySelector('#productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const orderModal = document.querySelector('#orderModal');
const closeOrderModal = document.querySelector('#closeOrderModal');
const orderForm = document.querySelector('#orderForm');
const successModal = document.querySelector('#successModal');
const continueShoppingBtn = document.querySelector('#continueShoppingBtn');
const orderSummary = document.querySelector('#orderSummary');
const cancelModal = document.querySelector('#cancelModal');
const closeCancelModal = document.querySelector('#closeCancelModal');
const cancelForm = document.querySelector('#cancelForm');
const telegramSettings = document.querySelector('#telegramSettings');
const adminPanel = document.querySelector('#adminPanel');
const adminBtn = document.querySelector('#adminBtn');
const closeAdminPanel = document.querySelector('#closeAdminPanel');
const overlay = document.querySelector('#overlay');
const botTokenInput = document.querySelector('#botToken');
const chatIdInput = document.querySelector('#chatId');
const saveTelegramBtn = document.querySelector('#saveTelegramBtn');
const testTelegramBtn = document.querySelector('#testTelegramBtn');
const ordersList = document.querySelector('#ordersList');

// ===== GLOBAL O'ZGARGUVCHILAR =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let orderCounter = parseInt(localStorage.getItem('orderCounter')) || 1000;
let telegramConfig = JSON.parse(localStorage.getItem('telegramConfig')) || CONFIG;

// ===== YUKLASH ANIMATSIYASI =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        loadProducts();
        updateCart();
        loadTelegramConfig();
        loadOrders();
    }, 1000);
});

// ===== NAVIGATSIYA =====
menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Navigation linklarini faollashtirish
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Active classni o'zgartirish
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        // Mobile menyuni yopish
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// Scroll bo'yicha active linkni yangilash
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== MAHSULOTLARNI YUKLASH =====
function loadProducts() {
    // Demo mahsulotlar
    products = [
        {
            id: 1,
            name: 'Erkaklar koylak',
            category: 'men',
            price: 120000,
            originalPrice: 150000,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: 'Yangi',
            rating: 4.5
        },
        {
            id: 2,
            name: 'Ayollar ko\'ylak',
            category: 'women',
            price: 180000,
            originalPrice: 220000,
            image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: 'Chegirma',
            rating: 4.8
        },
        {
            id: 3,
            name: 'Bolalar futbolkasi',
            category: 'kids',
            price: 65000,
            originalPrice: 80000,
            image: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: null,
            rating: 4.2
        },
        {
            id: 4,
            name: 'Erkaklar shim',
            category: 'men',
            price: 200000,
            originalPrice: 250000,
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: null,
            rating: 4.7
        },
        {
            id: 5,
            name: 'Ayollar yubka',
            category: 'women',
            price: 160000,
            originalPrice: 200000,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: 'Yangi',
            rating: 4.4
        },
        {
            id: 6,
            name: 'Bolalar shim',
            category: 'kids',
            price: 90000,
            originalPrice: 110000,
            image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: null,
            rating: 4.6
        },
        {
            id: 7,
            name: 'Erkaklar kostyum',
            category: 'men',
            price: 450000,
            originalPrice: 550000,
            image: 'https://images.unsplash.com/photo-1594938374182-6e5d3f8e65ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: 'Premium',
            rating: 4.9
        },
        {
            id: 8,
            name: 'Ayollar palto',
            category: 'women',
            price: 350000,
            originalPrice: 420000,
            image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            badge: 'Chegirma',
            rating: 4.7
        }
    ];
    
    renderProducts();
}

// ===== MAHSULOTLARNI CHIZISH =====
function renderProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => filter === 'sale' 
            ? product.badge === 'Chegirma' 
            : product.category === filter);
    
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
        productsGrid.appendChild(productCard);
    });
    
    // Savatga qo'shish event listenerlar
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
    
    // Wishlist event listenerlar
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const icon = e.currentTarget.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-red-500');
            
            showNotification(
                icon.classList.contains('fas') 
                    ? 'Sevimlilarga qo\'shildi' 
                    : 'Sevimlilardan o\'chirildi'
            );
        });
    });
}

// ===== FILTRLASH =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        renderProducts(filter);
    });
});

// ===== SAVAT FUNKSIYALARI =====
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Mahsulot savatga qo\'shildi');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Mahsulot savatdan o\'chirildi');
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
    
    // Cart count yangilash
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Cart items ni chizish
    renderCartItems();
    
    // Total summani hisoblash
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatPrice(total);
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Savatda mahsulot yo'q</p>
                <a href="#products" class="btn btn-outline">Xarid qilishni boshlash</a>
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
        cartItems.appendChild(cartItem);
    });
    
    // Quantity buttons eventlar
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === productId);
            
            if (e.target.classList.contains('minus')) {
                updateQuantity(productId, item.quantity - 1);
            } else if (e.target.classList.contains('plus')) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    // Remove buttons eventlar
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('button').dataset.id);
            removeFromCart(productId);
        });
    });
}

// ===== SAVAT SIDEBAR =====
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// ===== BUYURTMA BERISH =====
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Savat bo\'sh. Avval mahsulot qo\'shing.', 'warning');
        return;
    }
    
    cartSidebar.classList.remove('active');
    orderModal.classList.add('active');
    overlay.classList.add('active');
    renderOrderSummary();
});

closeOrderModal.addEventListener('click', () => {
    orderModal.classList.remove('active');
    overlay.classList.remove('active');
});

// Order summary chizish
function renderOrderSummary() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    orderSummary.innerHTML = `
        <div class="order-items">
            ${cart.map(item => `
                <div class="order-item-summary">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>${formatPrice(item.price * item.quantity)}</span>
                </div>
            `).join('')}
        </div>
        <div class="order-total-summary">
            <span>Jami (${itemsCount} ta mahsulot):</span>
            <span class="total-amount">${formatPrice(total)}</span>
        </div>
    `;
}

// Order form submit
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        note: formData.get('note')
    };
    
    // Validatsiya
    if (!orderData.name || !orderData.phone || !orderData.address) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        return;
    }
    
    if (orderData.phone.length < 9) {
        showNotification('Telefon raqami noto\'g\'ri', 'warning');
        return;
    }
    
    // Buyurtma yaratish
    const order = createOrder(orderData);
    
    // Modalni yopish
    orderModal.classList.remove('active');
    
    // Success modalni ochish
    successModal.classList.add('active');
    
    // Buyurtma ma'lumotlarini ko'rsatish
    document.querySelector('#orderNumber').textContent = order.id;
    document.querySelector('#orderTotal').textContent = formatPrice(order.total);
    
    // Telegramga yuborish
    const sent = await sendToTelegram(order);
    
    if (sent) {
        showNotification('Buyurtma Telegramga yuborildi!', 'success');
    } else {
        showNotification('Telegramga yuborishda xatolik. Ma\'lumotlar saqlangan.', 'warning');
    }
    
    // Savatni tozalash
    cart = [];
    updateCart();
});

// ===== BUYURTMA YARATISH =====
function createOrder(customerData) {
    orderCounter++;
    localStorage.setItem('orderCounter', orderCounter);
    
    const order = {
        id: `ORD-${orderCounter}`,
        date: new Date().toLocaleString('uz-UZ'),
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'yetkazilmoqda',
        customer: customerData,
        telegramSent: false
    };
    
    // Orders arrayga qo'shish
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Admin panelni yangilash
    updateOrdersList();
    
    return order;
}

// ===== TELEGRAM INTEGRATSIYA =====
function loadTelegramConfig() {
    telegramConfig = JSON.parse(localStorage.getItem('telegramConfig')) || CONFIG;
    
    if (botTokenInput && chatIdInput) {
        botTokenInput.value = telegramConfig.TELEGRAM_BOT_TOKEN || '';
        chatIdInput.value = telegramConfig.TELEGRAM_CHAT_ID || '';
    }
}

async function sendToTelegram(order) {
    // Telegram konfiguratsiyasini tekshirish
    if (!telegramConfig.TELEGRAM_BOT_TOKEN || !telegramConfig.TELEGRAM_CHAT_ID) {
        console.warn('Telegram bot sozlanmagan');
        return false;
    }
    
    try {
        // Xabar matnini tayyorlash
        const message = formatOrderMessage(order);
        
        // Telegram API ga so'rov
        const url = `${telegramConfig.API_URL}${telegramConfig.TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramConfig.TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            // Order statusni yangilash
            order.telegramSent = true;
            updateOrderInStorage(order);
            
            // Console ga log
            console.log('✅ Telegram xabar yuborildi:', order.id);
            console.log('📱 Chat ID:', telegramConfig.TELEGRAM_CHAT_ID);
            
            return true;
        } else {
            console.error('❌ Telegram xatosi:', data);
            return false;
        }
    } catch (error) {
        console.error('❌ Telegram ulanish xatosi:', error);
        return false;
    }
}

function formatOrderMessage(order) {
    const itemsList = order.items.map(item => 
        `├ ${item.name}\n│   ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
    ).join('\n');
    
    const total = formatPrice(order.total);
    
    return `🛒 <b>YANGI BUYURTMA!</b>

📦 <b>Buyurtma raqami:</b> ${order.id}
📅 <b>Sana:</b> ${order.date}
👤 <b>Mijoz:</b> ${order.customer.name}
📞 <b>Telefon:</b> ${order.customer.phone}
📍 <b>Manzil:</b> ${order.customer.address}
${order.customer.note ? `💬 <b>Izoh:</b> ${order.customer.note}\n` : ''}
📋 <b>Mahsulotlar:</b>
${itemsList}

💰 <b>Jami summa:</b> ${total}
🚚 <b>Holati:</b> ${order.status}

⏰ <b>Vaqt:</b> ${new Date().toLocaleTimeString('uz-UZ')}`;
}

// ===== TELEGRAM SOZLAMALARI =====
saveTelegramBtn.addEventListener('click', () => {
    const token = botTokenInput.value.trim();
    const chatId = chatIdInput.value.trim();
    
    if (!token || !chatId) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        return;
    }
    
    telegramConfig.TELEGRAM_BOT_TOKEN = token;
    telegramConfig.TELEGRAM_CHAT_ID = chatId;
    
    localStorage.setItem('telegramConfig', JSON.stringify(telegramConfig));
    
    showNotification('Telegram sozlamalari saqlandi!', 'success');
});

testTelegramBtn.addEventListener('click', async () => {
    if (!telegramConfig.TELEGRAM_BOT_TOKEN || !telegramConfig.TELEGRAM_CHAT_ID) {
        showNotification('Avval bot token va chat ID ni kiriting', 'warning');
        return;
    }
    
    const testMessage = `✅ <b>Test xabar!</b>\n\nBot to'g\'ri ishlayapti.\nVaqt: ${new Date().toLocaleString('uz-UZ')}`;
    
    try {
        const url = `${telegramConfig.API_URL}${telegramConfig.TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: telegramConfig.TELEGRAM_CHAT_ID,
                text: testMessage,
                parse_mode: 'HTML'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            showNotification('✅ Test xabar yuborildi! Telegramni tekshiring.', 'success');
        } else {
            showNotification('❌ Xatolik: Token yoki Chat ID noto\'g\'ri', 'error');
        }
    } catch (error) {
        showNotification('❌ Ulanish xatosi: Internetni tekshiring', 'error');
    }
});

// ===== SUCCESS MODAL =====
continueShoppingBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    overlay.classList.remove('active');
});

document.querySelector('#trackOrderBtn').addEventListener('click', () => {
    successModal.classList.remove('active');
    overlay.classList.remove('active');
    
    showNotification('Buyurtma kuzatish funksiyasi tez orada ishga tushadi', 'info');
});

// ===== BUYURTMA BEKOR QILISH =====
document.querySelector('#orderCancel').addEventListener('click', () => {
    cancelModal.classList.add('active');
    overlay.classList.add('active');
});

closeCancelModal.addEventListener('click', () => {
    cancelModal.classList.remove('active');
    overlay.classList.remove('active');
});

cancelForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(cancelForm);
    const orderNumber = formData.get('order_number');
    const reason = formData.get('reason');
    const phone = formData.get('phone');
    const details = formData.get('details');
    
    // Validatsiya
    if (!orderNumber || !reason || !phone) {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring', 'warning');
        return;
    }
    
    // Buyurtmani topish
    const orderIndex = orders.findIndex(order => order.id === orderNumber);
    
    if (orderIndex === -1) {
        showNotification('Buyurtma topilmadi', 'error');
        return;
    }
    
    const order = orders[orderIndex];
    
    // Cancel ma'lumotlarini saqlash
    order.cancelled = {
        date: new Date().toLocaleString('uz-UZ'),
        reason: reason,
        details: details,
        phone: phone
    };
    order.status = 'bekor qilindi';
    
    // LocalStorage ni yangilash
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Telegramga cancel xabarini yuborish
    const cancelMessage = `❌ <b>BUYURTMA BEKOR QILINDI!</b>\n\n📦 <b>Buyurtma:</b> ${order.id}\n📅 <b>Bekor qilingan vaqt:</b> ${order.cancelled.date}\n📞 <b>Telefon:</b> ${phone}\n📝 <b>Sabab:</b> ${getReasonText(reason)}\n${details ? `💬 <b>Izoh:</b> ${details}\n` : ''}\n👤 <b>Mijoz:</b> ${order.customer.name}\n💰 <b>Summa:</b> ${formatPrice(order.total)}`;
    
    await sendToTelegram(cancelMessage);
    
    // Modalni yopish
    cancelModal.classList.remove('active');
    overlay.classList.remove('active');
    
    // Formani tozalash
    cancelForm.reset();
    
    // Xabar berish
    showNotification('Buyurtma bekor qilindi! Telegramga xabar yuborildi.', 'success');
    
    // Admin panelni yangilash
    updateOrdersList();
});

function getReasonText(reason) {
    const reasons = {
        'change_mind': 'Fikrimni o\'zgartirdim',
        'delivery_time': 'Yetkazib berish vaqti uzoq',
        'found_cheaper': 'Arzonroq topdim',
        'other': 'Boshqa sabab'
    };
    return reasons[reason] || reason;
}

// ===== ADMIN PANEL =====
adminBtn.addEventListener('click', () => {
    adminPanel.classList.add('active');
    overlay.classList.add('active');
    updateOrdersList();
});

closeAdminPanel.addEventListener('click', () => {
    adminPanel.classList.remove('active');
    overlay.classList.remove('active');
});

function loadOrders() {
    orders = JSON.parse(localStorage.getItem('orders')) || [];
    updateOrdersList();
}

function updateOrdersList() {
    if (!ordersList) return;
    
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Hozircha buyurtmalar yo'q</p>
            </div>
        `;
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

function updateOrderInStorage(updatedOrder) {
    const index = orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
        orders[index] = updatedOrder;
        localStorage.setItem('orders', JSON.stringify(orders));
        updateOrdersList();
    }
}

// ===== YORDAMCHI FUNKSIYALAR =====
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

function showNotification(message, type = 'success') {
    // Notification elementini yaratish
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icon tanlash
    let icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';
    if (type === 'info') icon = 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Style berish
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : 
                     type === 'warning' ? '#FFA502' : 
                     type === 'error' ? '#FF4757' : '#2D3047'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Ko'rinish animatsiyasi
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 3 soniyadan keyin olib tashlash
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Escape - barcha modalarni yopish
    if (e.key === 'Escape') {
        cartSidebar.classList.remove('active');
        orderModal.classList.remove('active');
        successModal.classList.remove('active');
        cancelModal.classList.remove('active');
        telegramSettings.classList.remove('active');
        adminPanel.classList.remove('active');
        overlay.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Ctrl+Shift+A - Admin panel
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        adminPanel.classList.toggle('active');
        overlay.classList.toggle('active');
        if (adminPanel.classList.contains('active')) {
            updateOrdersList();
        }
    }
    
    // Ctrl+Shift+T - Telegram settings
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        telegramSettings.classList.toggle('active');
        overlay.classList.toggle('active');
    }
});

// ===== SERVICE WORKER (PWA uchun) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// ===== OFFLINE DETECTION =====
window.addEventListener('online', () => {
    showNotification('Internet ulandi', 'success');
});

window.addEventListener('offline', () => {
    showNotification('Internet uzildi. Offline rejimda ishlayapsiz', 'warning');
});

// ===== EXPORT FUNCTIONS (debug uchun) =====
window.debug = {
    clearCart: () => {
        cart = [];
        updateCart();
        showNotification('Savat tozalandi', 'info');
    },
    clearOrders: () => {
        orders = [];
        localStorage.removeItem('orders');
        updateOrdersList();
        showNotification('Buyurtmalar tozalandi', 'info');
    },
    testOrder: () => {
        cart.push({
            id: 999,
            name: 'Test mahsulot',
            price: 100000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c'
        });
        updateCart();
        showNotification('Test mahsulot qo\'shildi', 'info');
    },
    getStats: () => {
        return {
            cartItems: cart.length,
            totalOrders: orders.length,
            telegramConfigured: !!(telegramConfig.TELEGRAM_BOT_TOKEN && telegramConfig.TELEGRAM_CHAT_ID)
        };
    }
};

console.log('🔧 Debug funksiyalar mavjud: window.debug');
