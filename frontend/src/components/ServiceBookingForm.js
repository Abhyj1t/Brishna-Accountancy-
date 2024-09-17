import React, { useState } from 'react';
import './ServiceBookingForm.css';

const ServiceBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    booking_date: '',
    booking_time: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage('Booking successfully created!');
        setFormData({
          name: '',
          email: '',
          service: '',
          booking_date: '',
          booking_time: '',
        });
      } else {
        setResponseMessage('Failed to create the booking. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="service"
            placeholder="Service Required"
            value={formData.service}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="time"
            name="booking_time"
            value={formData.booking_time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Book Now</button>
        {responseMessage && <p className={`response-message ${responseMessage.includes('successfully') ? 'success-message' : 'error-message'}`}>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default ServiceBookingForm;
