/* eslint-disable */
import '@babel/polyfill';

import { login, logout, signup, forgotPassword, resetPassword } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';

// DOM Elements
const loginForm = document.querySelector('.login_form_action');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const signupForm = document.querySelector('.signup_form_action');
const forgetPasswordForm = document.querySelector(
  '.forgot_password_form_action',
);
const resetPasswordForm = document.querySelector('.reset_password_form_action');

const mapBox = document.getElementById('map');

// DOM ELEMENTS .form if found in the document
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--login').textContent = 'Please wait...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //   console.log(email, password);
    await login(email, password);
    document.querySelector('.btn--login').textContent = 'Login';
  });
}
//logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
  });
}
// DOM ELEMENTS .map if found in the document
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

// DOM ELEMENTS .form-user-data if found in the document
if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-settings').textContent = 'Updating...';

    const form = new FormData();

    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;

    await updateSettings(form, 'data');

    document.querySelector('.btn--save-settings').textContent = 'Save settings';
  });
}

// DOM ELEMENTS .form-user-password if found in the document
if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
  });
}

// DOM ELEMENTS .signup-form if found in the document
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--signup').textContent = 'Signing up...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await signup(name, email, password, passwordConfirm);

    document.querySelector('.btn--signup').textContent = 'Sign up';
  });
}

// DOM ELEMENTS .forgot-password-form if found in the document
if (forgetPasswordForm) {
  forgetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--forgot-password').textContent =
      'Please wait...';

    const email = document.getElementById('email').value;
    await forgotPassword(email).then(() => {
      // reset the email
      document.getElementById('email').value = '';
    });

    document.querySelector('.btn--forgot-password').textContent = 'Submit';
  });
}

// DOM ELEMENTS .reset-password-form if found in the document
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--reset-password').textContent =
      'Please wait...';

    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const token = document.getElementById('token').value;

    await resetPassword(password, passwordConfirm, token);

    document.querySelector('.btn--reset-password').textContent =
      'Reset Password';
  });
}
