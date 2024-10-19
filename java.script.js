
// Student database (replace with actual database or API)
const students = [
  { id: 1, username: 'johnDoe', password: 'password123', role: 'student' },
  { id: 2, username: 'janeDoe', password: 'password456', role: 'student' },
  { id: 3, username: 'admin', password: 'admin123', role: 'admin' },
];

// Login form elements
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-btn');
const errorMessage = document.getElementById('error-message');

// Add event listener for login button click
loginButton.addEventListener('click', verifyStudentLogin);

// Verify student login credentials
function verifyStudentLogin(e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Check for empty fields
  if (username === '' || password === '') {
    displayErrorMessage('Please enter both username and password');
    return;
  }

  // Find matching student in database
  const student = students.find((student) => student.username === username && student.password === password);

  if (student) {
    // Login successful, redirect to dashboard
    if (student.role === 'student') {
      window.location.href = 'student-dashboard.html';
    } else if (student.role === 'admin') {
      window.location.href = 'admin-dashboard.html';
    }
  } else {
    displayErrorMessage('Invalid username or password');
  }
}

// Display error message
function displayErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 3000);
}

// Password validation
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Username validation
function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{4,12}$/;
  return usernameRegex.test(username);
}

// Validate login form
function validateLoginForm() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!validateUsername(username)) {
    displayErrorMessage('Invalid username');
    return false;
  }

  if (!validatePassword(password)) {
    displayErrorMessage('Invalid password');
    return false;
  }

  return true;
}

