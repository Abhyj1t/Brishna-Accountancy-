// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-center">
        <li>
          <NavLink 
            exact 
            to="/" 
            activeClassName="active-link" 
            className="nav-link"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/services" 
            activeClassName="active-link" 
            className="nav-link"
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            activeClassName="active-link" 
            className="nav-link"
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="navbar-right">
        <NavLink 
          to="/login" 
          activeClassName="active-link" 
          className="login-link"
        >
          Login
        </NavLink>
        <NavLink 
          to="/signup" 
          activeClassName="active-link" 
          className="signup-link"
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
