// 用户认证脚本 - 包含学生ID后三位678

document.addEventListener('DOMContentLoaded', function() {
    // 检查注册表单
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            registerUser678();
        });
    }
    
    // 检查登录表单
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginUser678();
        });
    }
});

// 用户注册功能 - 包含学生ID后三位678
function registerUser678() {
    // 获取表单值
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    // 验证表单
    let isValid = true;
    
    // 验证用户名
    if (username.trim() === '') {
        showError678('username-error', 'Username is required');
        isValid = false;
    } else if (username.length < 3) {
        showError678('username-error', 'Username must be at least 3 characters');
        isValid = false;
    } else if (userExists678(username)) {
        showError678('username-error', 'Username already exists');
        isValid = false;
    } else {
        showError678('username-error', '');
    }
    
    // 验证密码 - 使用正则表达式确保密码强度
    // 密码至少8个字符，包含至少一个大写字母、一个小写字母、一个数字和一个特殊字符
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password === '') {
        showError678('password-error', 'Password is required');
        isValid = false;
    } else if (!passwordRegex.test(password)) {
        showError678('password-error', 'Password must be at least 8 characters and include a number, uppercase letter, and special character');
        isValid = false;
    } else {
        showError678('password-error', '');
    }
    
    // 验证确认密码
    if (confirmPassword === '') {
        showError678('confirm-password-error', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError678('confirm-password-error', 'Passwords do not match');
        isValid = false;
    } else {
        showError678('confirm-password-error', '');
    }
    
    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError678('email-error', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError678('email-error', 'Please enter a valid email address');
        isValid = false;
    } else {
        showError678('email-error', '');
    }
    
    // 验证电话号码
    const phoneRegex = /^\+?\d{8,15}$/;
    if (phone === '') {
        showError678('phone-error', 'Phone number is required');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showError678('phone-error', 'Please enter a valid phone number (8-15 digits)');
        isValid = false;
    } else {
        showError678('phone-error', '');
    }
    
    // 验证地址
    if (address.trim() === '') {
        showError678('address-error', 'Address is required');
        isValid = false;
    } else if (address.length < 10) {
        showError678('address-error', 'Address must be at least 10 characters');
        isValid = false;
    } else {
        showError678('address-error', '');
    }
    
    // 如果验证通过，保存用户信息
    if (isValid) {
        const user = {
            username,
            password,
            email,
            phone,
            address,
            registeredDate: new Date().toISOString()
        };
        
        // 获取现有用户
        const users = getUsers678();
        users.push(user);
        
        // 保存用户到localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // 显示成功消息并重置表单
        alert('Registration successful! You can now login.');
        document.getElementById('register-form').reset();
        
        // 重定向到登录页面
        window.location.href = 'login.html';
    }
}

// 用户登录功能 - 包含学生ID后三位678
function loginUser678() {
    // 获取表单值
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // 验证表单
    let isValid = true;
    
    if (username.trim() === '') {
        showError678('login-username-error', 'Username is required');
        isValid = false;
    } else {
        showError678('login-username-error', '');
    }
    
    if (password === '') {
        showError678('login-password-error', 'Password is required');
        isValid = false;
    } else {
        showError678('login-password-error', '');
    }
    
    if (isValid) {
        // 检查用户凭据
        const users = getUsers678();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // 登录成功，保存登录状态到sessionStorage
            sessionStorage.setItem('loggedInUser', username);
            
            // 检查是否有重定向URL
            const redirectUrl = sessionStorage.getItem('redirectUrl') || 'cart.html';
            
            // 清除重定向URL
            sessionStorage.removeItem('redirectUrl');
            
            // 重定向到相应页面
            window.location.href = redirectUrl;
        } else {
            // 登录失败
            showError678('login-password-error', 'Invalid username or password');
        }
    }
}

// 显示错误消息 - 包含学生ID后三位678
function showError678(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// 获取所有用户 - 包含学生ID后三位678
function getUsers678() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// 检查用户是否已存在 - 包含学生ID后三位678
function userExists678(username) {
    const users = getUsers678();
    return users.some(user => user.username === username);
}
    