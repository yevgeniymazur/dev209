import React from 'react';
import { deleteCookie } from '../utils';

export default function LogoutButton() {
  const handleLogout = () => {
    deleteCookie('authToken');
    window.location.href = '/';
  };

  return (
    <button id="logoutBtn" onClick={handleLogout}>
      Logout
    </button>
  );
}
