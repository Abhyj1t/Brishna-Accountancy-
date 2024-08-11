import React, { useState } from 'react';
import './ServiceBookingForm.css';

const ServiceBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const formErrors = {};
    
    if (!formData.name.trim()) {
      formErrors.name = 'Full Name is required';
    }
    
    if (!formData.email) {
      formErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email Address is invalid';
    }
    
    if (!formData.service.trim()) {
      formErrors.service = 'Service Required is required';
    }
    
    if (!formData.date) {
      formErrors.date = 'Date is required';
    }
    
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      alert(`Service booked: ${formData.service} on ${formData.date}`);
      // Here you would usually send the form data to the server
      setFormData({
        name: '',
        email: '',
        service: '',
        date: ''
      });
      setErrors({});
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
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <input 
            type="text" 
            name="service" 
            placeholder="Service Required" 
            value={formData.service} 
            onChange={handleChange} 
            required 
            className={errors.service ? 'error' : ''}
          />
          {errors.service && <span className="error-text">{errors.service}</span>}
        </div>
        <div className="form-group">
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>
        <button type="submit" className="submit-button">Book Now</button>
      </form>
    </div>
  );
};

export default ServiceBookingForm;
