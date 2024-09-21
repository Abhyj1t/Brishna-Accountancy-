// src/components/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/login', { // Ensure this URL matches your backend route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage('Login successful!');
        // You can store the token received from the backend for future authenticated requests
        // localStorage.setItem('token', data.token); // Uncomment if you plan to use JWT
        // Reset form data after successful login
        setFormData({
          email: '',
          password: '',
        });
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message || 'Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
        {responseMessage && <p className={`response-message ${responseMessage.includes('successful') ? 'success-message' : 'error-message'}`}>{responseMessage}</p>}
      </form>
    </div>
  );
};

export default LoginForm;