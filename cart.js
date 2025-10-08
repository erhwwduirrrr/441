// 购物车相关脚本 - 包含学生ID后三位678

document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    const isLoggedIn = requireLogin678();
    if (isLoggedIn) {
        // 显示购物车内容
        document.getElementById('login-message').style.display = 'none';
        document.getElementById('cart-container').style.display = 'block';
        
        // 加载购物车
        loadCart678();
        
        // 添加结账按钮事件监听
        document.getElementById('checkout-btn').addEventListener('click', function() {
            window.location.href = 'order-confirmation.html';
        });
    }
});

// 加载购物车内容 - 包含学生ID后三位678
function loadCart678() {
    const cart = getCart678();
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // 更新购物车显示
    if (cart.length === 0) {
        // 购物车为空
        cartItemsContainer.innerHTML = '';
        emptyCartMessage.style.display = 'block';
        checkoutBtn.disabled = true;
        updateCartTotal678();
    } else {
        // 购物车有商品
        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;
        
        // 显示购物车商品
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p>${item.description.substring(0, 50)}${item.description.length > 50 ? '...' : ''}</p>
                    <span class="resource-code">Unit: ${item.unitNumber}</span>
                </div>
                <div class="cart-item-price">
                    ${formatPrice678(item.price)}
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="updateQuantity678(${item.id}, -1)">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" onclick="updateQuantity678(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-subtotal">
                    ${formatPrice678(item.price * item.quantity)}
                </div>
                <button class="remove-item-btn" onclick="removeFromCart678(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // 添加数量输入框事件监听
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const newQuantity = parseInt(this.value) || 1;
                setQuantity678(id, newQuantity);
            });
        });
        
        // 更新购物车总额
        updateCartTotal678();
    }
}

// 更新商品数量 - 包含学生ID后三位678
function updateQuantity678(id, change) {
    let cart = getCart678();
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        
        // 确保数量不小于1
        if (item.quantity < 1) {
            item.quantity = 1;
        }
        
        // 保存购物车并重新加载
        saveCart678(cart);
        loadCart678();
    }
}

// 设置商品数量 - 包含学生ID后三位678
function setQuantity678(id, quantity) {
    let cart = getCart678();
    const item = cart.find(item => item.id === id);
    
    if (item) {
        // 确保数量不小于1
        item.quantity = Math.max(1, quantity);
        
        // 保存购物车并重新加载
        saveCart678(cart);
        loadCart678();
    }
}

// 从购物车移除商品 - 包含学生ID后三位678
function removeFromCart678(id) {
    let cart = getCart678();
    // 过滤掉要移除的商品
    cart = cart.filter(item => item.id !== id);
    
    // 保存购物车并重新加载
    saveCart678(cart);
    loadCart678();
}

// 更新购物车总额 - 包含学生ID后三位678
function updateCartTotal678() {
    const cart = getCart678();
    const totalElement = document.getElementById('cart-total');
    
    // 计算总额
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 显示总额
    totalElement.textContent = formatPrice678(total);
}
    