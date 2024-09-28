import React from 'react';
import './ServicePage.css';

const Accounting = () => {
  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Accounting Services</h1>
        <p>Providing accurate and efficient accounting services for your business.</p>
      </div>
      <div className="service-details">
        <div className="service-section">
          <h2>Our Expertise</h2>
          <p>Our certified accountants ensure that your financial records are accurate, timely, and compliant with regulations.</p>
        </div>
        <div className="service-section">
          <h2>Accounting Services</h2>
          <ul>
            <li>Financial Statement Preparation</li>
            <li>Tax Preparation and Filing</li>
            <li>Payroll Services</li>
            <li>Audit Support</li>
          </ul>
        </div>
        <div className="testimonial-section">
          <h2>Client Testimonials</h2>
          <p>"Brishna Accountancy has streamlined our accounting processes, saving us time and money." - Jane Smith</p>
        </div>
        <div className="call-to-action">
          <a href="/contact" className="cta-button">Contact Us</a>
          <a href="/services" className="cta-button">Book a Consultation</a>
        </div>
      </div>
    </div>
  );
};

export default Accounting;