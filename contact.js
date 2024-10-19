function validateForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let usernameError = document.getElementById('usernameError');
    let passwordError = document.getElementById('passwordError');

    // Clear previous errors
    usernameError.textContent = '';
    passwordError.textContent = '';

    // Validate username and password
    if (username=='username') {
        usernameError.textContent = 'Please enter a username';
        return false;
    }
    
    if (password =='password') {
        passwordError.textContent = 'Please enter a password';
        return false;
    }

    return true;
}