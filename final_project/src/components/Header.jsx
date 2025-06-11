import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="container header-content">
        <div className="logo" aria-label="Logo">
          <img src="/images/logo.png" alt="3 Booketeers logo" />
          <span>The 3 Booketeers</span>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/bookclub">Book Club</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">
            <button className="btn-signup">Sign Up</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

