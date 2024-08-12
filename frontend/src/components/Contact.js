// src/components/Contact.js
import React from 'react';
import ContactForm from './ContactForm'; // Ensure this import
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us for any inquiries or support.</p>
      <ContactForm /> {/* Ensure this component is rendered */}
    </div>
  );
};

export default Contact;
