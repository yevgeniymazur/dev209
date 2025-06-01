import React from 'react';

export default function Header() {
  return (
    <div>
      <img
        src="/images/kinglogo.png"
        alt="King Logo"
        style={{
          width: '120px',
          display: 'block',
          margin: '0 auto 20px auto',
          borderRadius: '8px'
        }}
      />
      <h1>My Todo List</h1>
    </div>
  );
}
