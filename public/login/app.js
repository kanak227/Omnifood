const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const back_btn = document.querySelector(".back-btn");

back_btn.addEventListener("click", () => {
  window.location.href = "./index.html"; // Change this to your actual homepage link
});

// SIGN IN FORM VALIDATION
const signInForm = document.getElementById('signInForm');
const signInUsername = document.getElementById('signInUsername');
const signInPassword = document.getElementById('signInPassword');

// SIGN UP FORM VALIDATION
const signUpForm = document.getElementById('signUpForm');
const signUpUsername = document.getElementById('signUpUsername');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');

function showError(input, message) {
  const error = input.nextElementSibling;
  error.textContent = message;
  error.style.display = 'block';
  input.classList.add('invalid');
  input.classList.remove('valid');
}

function showSuccess(input) {
  const error = input.nextElementSibling;
  error.style.display = 'none';
  input.classList.add('valid');
  input.classList.remove('invalid');
}

function checkUsername(input) {
  if (input.value.trim() === '') {
    showError(input, 'Username is required');
  } else if (input.value.length < 3) {
    showError(input, 'Username must be at least 3 characters');
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (input.value.trim() === '') {
    showError(input, 'Email is required');
  } else if (!emailRegex.test(input.value.trim())) {
    showError(input, 'Email is not valid');
  } else {
    showSuccess(input);
  }
}

function checkPassword(input) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (input.value.trim() === '') {
    showError(input, 'Password is required');
  } else if (!passwordRegex.test(input.value.trim())) {
    showError(
      input,
      'Password must be at least 8 characters and include an uppercase letter, a number, and a special character'
    );
  } else {
    showSuccess(input);
  }
}

const server_url = 'http://localhost:5000';

// SIGN IN FORM HANDLING
signInForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  checkUsername(signInUsername);
  checkPassword(signInPassword);

  if (
    signInUsername.classList.contains('valid') &&
    signInPassword.classList.contains('valid')
  ) {
    try {
      const response = await fetch(`${server_url}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signInUsername.value,
          password: signInPassword.value,
        }),
      });
      const data = await response.json();

      alert(`${data.message}`);
      if (data.success) {
        window.location.replace(`${window.location.origin}/index.html`);
        localStorage.setItem('omni:username', signUpUsername.value);
        localStorage.setItem('omni:authenticated', 'true');
      }

      console.log(data)
    } catch (error) {
      console.log(error);
      alert(`${error.message}`);
    }
  }
});

// SIGN UP FORM HANDLING
signUpForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  checkUsername(signUpUsername);
  checkEmail(signUpEmail);
  checkPassword(signUpPassword);

  if (
    signUpUsername.classList.contains('valid') &&
    signUpEmail.classList.contains('valid') &&
    signUpPassword.classList.contains('valid')
  ) {
    try {
      const response = await fetch(`${server_url}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signUpUsername.value,
          email: signUpEmail.value,
          password: signUpPassword.value,
        }),
      });
      const data = await response.json();
      alert(`${data.message}`);
      if (data.success) {
        window.location.replace(`${window.location.origin}/index.html`);
        localStorage.setItem('omni:username', signUpUsername.value);
        localStorage.setItem('omni:authenticated', 'true');
      }
    } catch (error) {
      alert(`${error.message}`);
    }
  }
});