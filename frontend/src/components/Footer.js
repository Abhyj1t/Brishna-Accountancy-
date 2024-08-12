// src/components/Footer.js
import React from 'react';
import './Footer.css';  // Ensure the CSS for Footer is imported

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Brishna Accountancy. All Rights Reserved.</p>
      <div className="social-links">
        <a href="https://www.facebook.com">Facebook</a> | 
        <a href="https://www.linkedin.com">LinkedIn</a> | 
        <a href="https://www.twitter.com">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
