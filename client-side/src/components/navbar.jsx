import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🍽️ ZY<span>KAA</span></div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="http://localhost:5000/auth/google">Login</a></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
