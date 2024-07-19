/* eslint-disable */
import '@babel/polyfill';

import { login, logout } from './login';
import { displayMap } from './mapbox';

// DOM Elements
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

const mapBox = document.getElementById('map');

// DOM ELEMENTS .form if found in the document
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //   console.log(email, password);
    await login(email, password);
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
