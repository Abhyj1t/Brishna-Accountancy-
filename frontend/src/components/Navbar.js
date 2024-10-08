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
            exact="true" // Use exact="true" for React Router v6 and above
            to="/" 
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/services" 
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/about-us" activeClassName="active-link" className="nav-link">
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="navbar-right">
        <NavLink 
          to="/login" 
          className={({ isActive }) => (isActive ? "login-link active-link" : "login-link")}
        >
          Login
        </NavLink>
        <NavLink 
          to="/signup" 
          className={({ isActive }) => (isActive ? "signup-link active-link" : "signup-link")}
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
