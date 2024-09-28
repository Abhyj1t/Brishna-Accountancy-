import React from 'react';
import './ServicePage.css';

const BusinessConsulting = () => {
  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Business Consulting Services</h1>
        <p>Empowering your business with strategic consulting services.</p>
      </div>
      <div className="service-details">
        <div className="service-section">
          <h2>Our Expertise</h2>
          <p>We provide expert consulting services to help businesses navigate complex challenges. From strategy formulation to process optimization, we guide you at every step.</p>
        </div>
        <div className="service-section">
          <h2>Consulting Services</h2>
          <ul>
            <li>Business Strategy Development</li>
            <li>Process Improvement</li>
            <li>Financial Planning</li>
            <li>Risk Management</li>
          </ul>
        </div>
        <div className="testimonial-section">
          <h2>Client Testimonials</h2>
          <p>"The best business consulting services we've ever experienced." - John Doe</p>
        </div>
        <div className="call-to-action">
          <a href="/contact" className="cta-button">Contact Us</a>
          <a href="/services" className="cta-button">Book a Consultation</a>
        </div>
      </div>
    </div>
  );
};

export default BusinessConsulting;