// 订单确认相关脚本 - 包含学生ID后三位678

document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    const isLoggedIn = requireLogin678();
    if (isLoggedIn) {
        // 显示订单确认内容
        document.getElementById('login-message').style.display = 'none';
        document.getElementById('order-confirmation-container').style.display = 'block';
        
        // 获取当前登录用户
        const username = sessionStorage.getItem('loggedInUser');
        document.getElementById('logged-in-user').textContent = username;
        
        // 加载订单详情
        loadOrderDetails678();
        
        // 添加确认订单按钮事件监听
        document.getElementById('confirm-order-btn').addEventListener('click', confirmOrder678);
    }
});

// 加载订单详情 - 包含学生ID后三位678
function loadOrderDetails678() {
    const cart = getCart678();
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    
    // 检查购物车是否为空
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty. Please add items to your cart before checking out.</p>';
        document.getElementById('confirm-order-btn').disabled = true;
        orderTotalElement.textContent = formatPrice678(0);
        return;
    }
    
    // 显示订单商品
    orderItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-details">
                <h4>${item.title}</h4>
                <span class="resource-code">Unit: ${item.unitNumber}</span>
                <p>${formatPrice678(item.price)}</p>
            </div>
            <div class="order-item-quantity">
                Quantity: ${item.quantity}
            </div>
            <div class="order-item-subtotal">
                ${formatPrice678(item.price * item.quantity)}
            </div>
        `;
        
        orderItemsContainer.appendChild(orderItem);
    });
    
    // 计算并显示订单总额
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderTotalElement.textContent = formatPrice678(total);
}

// 确认订单 - 包含学生ID后三位678
function confirmOrder678() {
    const cart = getCart678();
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before checking out.');
        return;
    }
    
    const username = sessionStorage.getItem('loggedInUser');
    if (!username) {
        alert('You must be logged in to place an order.');
        window.location.href = 'login.html';
        return;
    }
    
    // 计算订单总额
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 创建订单对象（与orders.js中的加载逻辑对应）
    const order = {
        id: Date.now(), // 时间戳作为唯一订单ID
        username: username,
        items: cart,
        total: total,
        date: new Date().toISOString()
    };
    
    // 保存订单（此函数已在orders.js中实现）
    saveOrder678(order);
    
    // 清空购物车
    saveCart678([]);
    
    // 跳转至订单历史页
    alert('Your order has been confirmed! Thank you for your purchase.');
    window.location.href = 'orders.html';
}