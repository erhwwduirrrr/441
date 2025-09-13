// Nathan- 441 Project

// Login verification
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert('Login successful!');
        window.location.href = 'cart.html';
    } else {
        alert('Please enter valid credentials.');
    }
});