import React, { useState } from 'react';

export default function Register({ onSuccess, onToggle }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const API_URL = 'http://localhost:3000';

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Registration failed');
      onSuccess(); // switches back to login screen
    } catch {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>Registration failed</p>}
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>

      <p style={{ marginTop: '10px' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onToggle}
          style={{ textDecoration: 'underline', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          Login
        </button>
      </p>
    </form>
  );
}
