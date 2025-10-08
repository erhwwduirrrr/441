// 订单管理相关脚本 - 包含学生ID后三位678

document.addEventListener('DOMContentLoaded', function() {
    // 检查用户是否登录
    const isLoggedIn = requireLogin678();
    if (isLoggedIn) {
        // 显示订单管理内容
        document.getElementById('login-message').style.display = 'none';
        document.getElementById('orders-container').style.display = 'block';

        // 获取当前登录用户
        const username = sessionStorage.getItem('loggedInUser');
        document.getElementById('logged-in-user').textContent = username || '未知用户';

        // 加载订单历史
        loadOrderHistory678();

        // 加载待办事项列表
        loadTodoList678();

        // 添加事件监听器
        document.getElementById('download-orders-btn').addEventListener('click', () => downloadOrders678(username));
        document.getElementById('clear-cart-btn').addEventListener('click', clearCart678);
        document.getElementById('clear-orders-btn').addEventListener('click', () => clearOrderHistory678(username));
        document.getElementById('logout-btn').addEventListener('click', logout678);
        document.getElementById('add-task-btn').addEventListener('click', addTask678);
    } else {
        // 未登录状态处理
        document.getElementById('login-message').style.display = 'block';
        document.getElementById('orders-container').style.display = 'none';
    }
});

// 加载并渲染订单历史
function loadOrderHistory678() {
    // 获取当前登录用户的用户名
    const username = sessionStorage.getItem('loggedInUser');
    // 传入用户名获取该用户的订单
    const orders = getOrders678(username); 
    const ordersContainer = document.getElementById('user-orders');
    const noOrdersMessage = document.getElementById('no-orders-message');
    const downloadBtn = document.getElementById('download-orders-btn');

    // 清空容器
    ordersContainer.innerHTML = '';

    if (orders.length === 0) {
        noOrdersMessage.style.display = 'block';
        downloadBtn.disabled = true;
        return;
    }

    noOrdersMessage.style.display = 'none';
    downloadBtn.disabled = false;

    orders.sort((a, b) => new Date(b.date) - new Date(a.date))
          .forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';

        const formattedDate = new Date(order.date).toLocaleDateString('en-AU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        orderCard.innerHTML = `
            <div class="order-header">
                <h4>Order #${order.id}</h4>
                <span class="order-date">${formattedDate}</span>
            </div>
            <div class="order-card-items">
                ${order.items.map(item => `
                    <div class="order-card-item">
                        <span>${item.title} (x${item.quantity})</span>
                        <span>${formatPrice678(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-card-summary">
                <span>Total</span>
                <span>${formatPrice678(order.total)}</span>
            </div>
        `;
        ordersContainer.appendChild(orderCard);
    });
}

// 下载订单历史（json格式）
function downloadOrders678(username) {
    const orders = getOrders678(username);
    if (orders.length === 0) return;
    
    const jsonContent = JSON.stringify(orders, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-history-${username}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// 清空订单历史
function clearOrderHistory678(username) {
    if (confirm('Are you sure you want to clear all order history? This action cannot be undone.')) {
        const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
        if (allOrders[username]) {
            delete allOrders[username];
            localStorage.setItem('orders', JSON.stringify(allOrders));
            loadOrderHistory678(); // 重新加载
        }
    }
}

// 清空购物车
function clearCart678() {
    if (confirm('Are you sure you want to clear your shopping cart?')) {
        localStorage.setItem('cart', JSON.stringify([]));
        alert('Shopping cart has been cleared.');
    }
}

// 登出功能
function logout678() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

// 待办事项相关功能
function loadTodoList678() {
    const username = sessionStorage.getItem('loggedInUser');
    if (!username) return;

    const tasks = JSON.parse(localStorage.getItem(`todo_${username}`) || '[]');
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span ${task.completed ? 'style="text-decoration: line-through; color: #7f8c8d"' : ''}>${task.text}</span>
            <div>
                <button onclick="toggleTaskStatus678(${index})" class="btn-sm">
                    ${task.completed ? '✓' : '✗'}
                </button>
                <button onclick="deleteTask678(${index})" class="btn-sm delete-btn">🗑️</button>
            </div>
        `;
        tasksList.appendChild(li);
    });
}

function addTask678() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const username = sessionStorage.getItem('loggedInUser');
    if (!username) return;

    const tasks = JSON.parse(localStorage.getItem(`todo_${username}`) || '[]');
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem(`todo_${username}`, JSON.stringify(tasks));

    taskInput.value = '';
    loadTodoList678();
}

function toggleTaskStatus678(index) {
    const username = sessionStorage.getItem('loggedInUser');
    if (!username) return;

    const tasks = JSON.parse(localStorage.getItem(`todo_${username}`) || '[]');
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem(`todo_${username}`, JSON.stringify(tasks));
    loadTodoList678();
}

function deleteTask678(index) {
    const username = sessionStorage.getItem('loggedInUser');
    if (!username) return;

    const tasks = JSON.parse(localStorage.getItem(`todo_${username}`) || '[]');
    tasks.splice(index, 1);
    localStorage.setItem(`todo_${username}`, JSON.stringify(tasks));
    loadTodoList678();
}