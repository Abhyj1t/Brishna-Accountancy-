import React from 'react';
import './ServicePage.css';  // General style for all service pages

const TaxPreparation = () => {
  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Tax Preparation Services</h1>
        <p>Maximizing your tax savings and ensuring compliance.</p>
      </div>
      <div className="service-details">
        <div className="service-section">
          <h2>Why Choose Us?</h2>
          <p>Our tax professionals are experts in current tax laws and regulations. We work hard to maximize your tax refund while ensuring you're fully compliant with the latest legislation.</p>
        </div>
        <div className="service-section">
          <h2>Services We Provide</h2>
          <ul>
            <li>Personal and business tax return preparation</li>
            <li>Tax planning and consulting</li>
            <li>Audit support</li>
            <li>Corporate tax services</li>
          </ul>
        </div>
        <div className="testimonial-section">
          <h2>Client Testimonials</h2>
          <p>"Brishna Accountancy helped me save thousands on my taxes! Highly recommend." - Jane Doe</p>
          <p>"Fast, efficient, and reliable tax services." - John Smith</p>
        </div>
        <div className="call-to-action">
          <a href="/contact" className="cta-button">Contact Us</a>
          <a href="/services" className="cta-button">Book a Consultation</a>
        </div>
      </div>
    </div>
  );
};

export default TaxPreparation;