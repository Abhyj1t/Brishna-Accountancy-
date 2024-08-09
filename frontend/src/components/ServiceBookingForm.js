// src/components/ServiceBookingForm.js
import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Service:
        <input type="text" name="service" value={formData.service} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <button type="submit">Book Service</button>
    </form>
  );
};

export default ServiceBookingForm;
