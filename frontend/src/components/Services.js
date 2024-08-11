import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';
import ServiceBookingForm from './ServiceBookingForm';  // Make sure to import the booking form component

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-heading">Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <h3>Tax Preparation</h3>
          <p>Professional tax preparation services for individuals and businesses.</p>
          <Link to="/services/tax-preparation" className="learn-more-link">Learn More</Link>
        </div>
        <div className="service-card">
          <h3>Accounting</h3>
          <p>Comprehensive accounting services tailored to your needs.</p>
          <Link to="/services/accounting" className="learn-more-link">Learn More</Link>
        </div>
        <div className="service-card">
          <h3>Business Consulting</h3>
          <p>Expert advice to help grow your business.</p>
          <Link to="/services/business-consulting" className="learn-more-link">Learn More</Link>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="booking-form-container">
        <h3>Book a Service</h3>
        <ServiceBookingForm />
      </div>
    </div>
  );
};

export default Services;
