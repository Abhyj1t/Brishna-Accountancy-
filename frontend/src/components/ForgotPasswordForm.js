import React, { useState } from 'react';
import './ForgotPasswordForm.css'; // Add styling for this form if needed
import CryptoJS from 'crypto-js'; // Import crypto-js for token generation

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Function to generate a random token (optional)
  const generateRandomToken = () => {
    return CryptoJS.lib.WordArray.random(16).toString(); // 16-byte random token
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = generateRandomToken(); // Generate token (optional use)
    
    try {
      const response = await fetch('http://localhost:5001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }), // Send email and token (if needed)
      });

      if (response.ok) {
        setResponseMessage('Password reset email sent successfully.');
      } else {
        setResponseMessage('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Forgot Password</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Reset Link</button>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
