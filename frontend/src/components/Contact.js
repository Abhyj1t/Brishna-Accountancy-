import React from 'react';
import ContactForm from './ContactForm';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-form-container">
        <ContactForm />
      </div>
      <div className="map-container">
        <h3>Our Office Location</h3>
        <p>Queensland Arcade 7, 181 Church St, Parramatta NSW 2150, Australia</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.8564087112993!2d150.99638391521377!3d-33.817315880667756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a31a2e8366a9%3A0xaef1e1a4a09e1191!2sQueensland%20Arcade%207%2C%20181%20Church%20St%2C%20Parramatta%20NSW%202150%2C%20Australia!5e0!3m2!1sen!2sin!4v1631108627749!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
