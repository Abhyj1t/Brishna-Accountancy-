// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-right">
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
