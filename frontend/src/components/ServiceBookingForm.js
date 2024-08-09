// src/components/ServiceBookingForm.js
import React, { useState } from 'react';
import './ServiceBookingForm.css';

const ServiceBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Service booked: ${formData.service} on ${formData.date}`);
    // Here you would usually send the form data to the server
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="service" placeholder="Service Required" value={formData.service} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Book Now</button>
      </form>
    </div>
  );
};

export default ServiceBookingForm;
