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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8438658031585!2d144.95564671531582!3d-37.817209979751634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sVictoria%2C%20Australia!5e0!3m2!1sen!2sin!4v1631108627749!5m2!1sen!2sin"
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
