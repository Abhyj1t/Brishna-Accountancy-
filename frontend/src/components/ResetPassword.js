import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './reset-password.css';  // Make sure the CSS is imported

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset successful!');
      } else {
        setMessage(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-header">Reset Password</h2>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="reset-password-button" type="submit">
          Reset Password
        </button>
      </form>
      {message && (
        <p className="reset-password-message">
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
