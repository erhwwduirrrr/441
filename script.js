// 通用功能脚本

// 导航栏切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户登录状态并更新导航链接
    checkLoginStatus678();
    
    // 移动导航菜单切换
    const navSlide = function() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');
        
        burger.addEventListener('click', function() {
            // 切换导航菜单
            nav.classList.toggle('nav-active');
            
            // 动画链接
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // 切换汉堡图标
            burger.classList.toggle('toggle');
        });
    }
    
    navSlide();
});

// 检查用户登录状态并更新导航链接 - 包含学生ID后三位678
function checkLoginStatus678() {
    const user = sessionStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const ordersLink = document.getElementById('orders-link');
    
    if (user) {
        // 用户已登录，隐藏登录和注册链接，显示订单链接
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (ordersLink) ordersLink.style.display = 'block';
    } else {
        // 用户未登录，显示登录和注册链接，隐藏订单链接
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (ordersLink) ordersLink.style.display = 'none';
    }
}

// 检查用户是否已登录，如果未登录则重定向到登录页面 - 包含学生ID后三位678
function requireLogin678() {
    const user = sessionStorage.getItem('loggedInUser');
    if (!user) {
        // 存储当前页面URL，以便登录后返回
        sessionStorage.setItem('redirectUrl', window.location.href);
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// 格式化价格为货币格式 - 包含学生ID后三位678
function formatPrice678(price) {
    return '$' + parseFloat(price).toFixed(2);
}

// 从localStorage获取购物车数据 - 包含学生ID后三位678
function getCart678() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// 保存购物车数据到localStorage - 包含学生ID后三位678
function saveCart678(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 从localStorage获取订单历史 - 包含学生ID后三位678
function getOrders678(username) {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    return allOrders[username] || [];
}

// 保存订单到localStorage - 包含学生ID后三位678
function saveOrder678(order) {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    if (!allOrders[order.username]) {
        allOrders[order.username] = [];
    }
    allOrders[order.username].push(order);
    localStorage.setItem('orders', JSON.stringify(allOrders));
}

// 移动导航菜单切换
const navSlide = function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', function() {
        // 切换导航菜单
        nav.classList.toggle('nav-active');
        
        // 动画链接
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // 切换汉堡图标
        burger.classList.toggle('toggle');
    });
}

// 初始化导航功能
navSlide();

// 购物车操作函数（供全局调用）
function getCart678() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart678(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 价格格式化函数（全局可用）
function formatPrice678(price) {
    return `$${price.toFixed(2)}`;
}

// 登录状态验证函数
function requireLogin678() {
    const isLoggedIn = !!sessionStorage.getItem('loggedInUser');
    // 根据登录状态显示/隐藏导航链接
    document.getElementById('login-link').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('register-link').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('orders-link').style.display = isLoggedIn ? 'block' : 'none';
    return isLoggedIn;
}