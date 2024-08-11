// src/components/Services.js
import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-left">
        <h2 className="services-title">Our Services</h2>
        <div className="service-card">
          <h3>Tax Preparation</h3>
          <p>Professional tax preparation services for individuals and businesses.</p>
        </div>
        <div className="service-card">
          <h3>Accounting</h3>
          <p>Comprehensive accounting services tailored to your needs.</p>
        </div>
        <div className="service-card">
          <h3>Business Consulting</h3>
          <p>Expert advice to help grow your business.</p>
        </div>
      </div>
      <div className="services-right">
        <h2 className="booking-title">Book a Service</h2>
        <form className="booking-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Service Required" />
          <input type="date" placeholder="dd/mm/yyyy" />
          <button type="submit">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default Services;
