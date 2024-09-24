import React from 'react';
import './Header.css';
import logo from '/Users/abhyjitsingh/Documents/GitHub/Brishna-Accountancy-/frontend/src/assests/images/websitelogo.webpcd'; 

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <img
          src={logo}
          alt="Brishna Accountancy Logo"
          className="logo"
        />
        <h1 className="header-title">Brishna Accountancy</h1>
      </div>
      <div className="header-bg-overlay"></div> {/* Background overlay */}
    </header>
  );
};

export default Header;