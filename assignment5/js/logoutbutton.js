// js/logoutbutton.js
import { deleteCookie } from './utils.js';

export function LogoutButton() {
  return React.createElement(
    'button',
    {
      id: 'logoutBtn',
      onClick: () => {
        deleteCookie('authToken');
        window.location.href = 'index.html';
      }
    },
    'Logout'
  );
}
