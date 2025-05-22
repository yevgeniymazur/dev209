import { setCookie } from './utils.js';

const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        setCookie('authToken', data.token, 1);
        window.location.href = 'todo.html';
      } catch {
        document.getElementById('loginError').style.display = 'block';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        const res = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error('Registration failed');
        const data = await res.json();
        setCookie('authToken', data.token, 1);
        window.location.href = 'todo.html';
      } catch {
        document.getElementById('registerError').style.display = 'block';
      }
    });
  }
});
