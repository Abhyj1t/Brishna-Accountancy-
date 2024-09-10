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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name: formData.name,
      email: formData.email,
      service: formData.service,
      booking_date: formData.date,  // Ensure these fields match your backend
      booking_time: formData.time   // Add booking_time field if required
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings', { // Point to backend on port 5000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert('Booking successful!');
        setFormData({ name: '', email: '', service: '', date: '' });
      } else {
        console.error('Booking failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
