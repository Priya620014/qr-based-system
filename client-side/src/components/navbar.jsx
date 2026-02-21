// src/components/Navbar.js
import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🍽️ ZYKAA</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="http://localhost:5000/auth/google">Login</a></li>
        <li><a href="#">Register</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
