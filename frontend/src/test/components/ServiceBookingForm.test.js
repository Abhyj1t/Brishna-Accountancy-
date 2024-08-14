// src/components/ServiceBookingForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServiceBookingForm from '../../components/ServiceBookingForm';

describe('ServiceBookingForm Component', () => {
  
  // Test if the component renders correctly
  test('renders ServiceBookingForm component', () => {
    render(<ServiceBookingForm />);
    
    // Check if the form and its elements are rendered
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Service Required')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
  });
  
  // Test if inputs are updated correctly
  test('updates input values on change', () => {
    render(<ServiceBookingForm />);
    
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const serviceInput = screen.getByPlaceholderText('Service Required');
    const dateInput = screen.getByPlaceholderText('Date');
    
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(serviceInput, { target: { value: 'Cleaning' } });
    fireEvent.change(dateInput, { target: { value: '2024-09-15' } });
    
    expect(nameInput.value).toBe('Jane Doe');
    expect(emailInput.value).toBe('jane.doe@example.com');
    expect(serviceInput.value).toBe('Cleaning');
    expect(dateInput.value).toBe('2024-09-15');
  });

  // Test form validation
  test('shows validation errors for empty fields', () => {
    render(<ServiceBookingForm />);
    
    // Submit the form without filling out the fields
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check if validation errors are shown
    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email Address is required')).toBeInTheDocument();
    expect(screen.getByText('Service Required is required')).toBeInTheDocument();
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  test('shows validation error for invalid email', () => {
    render(<ServiceBookingForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check if the email validation error is shown
    expect(screen.getByText('Email Address is invalid')).toBeInTheDocument();
  });

  // Test form submission
  test('shows alert with booking details on form submit', () => {
    // Mock the alert function
    global.alert = jest.fn();

    render(<ServiceBookingForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Service Required'), { target: { value: 'Cleaning' } });
    fireEvent.change(screen.getByPlaceholderText('Date'), { target: { value: '2024-09-15' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check if the alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith('Service booked: Cleaning on 2024-09-15');
  });

  // Test that form resets after successful submission
  test('resets form and errors after successful submission', () => {
    // Mock the alert function
    global.alert = jest.fn();

    render(<ServiceBookingForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Service Required'), { target: { value: 'Cleaning' } });
    fireEvent.change(screen.getByPlaceholderText('Date'), { target: { value: '2024-09-15' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));
    
    // Check if the form data is reset
    expect(screen.getByPlaceholderText('Full Name').value).toBe('');
    expect(screen.getByPlaceholderText('Email Address').value).toBe('');
    expect(screen.getByPlaceholderText('Service Required').value).toBe('');
    expect(screen.getByPlaceholderText('Date').value).toBe('');
    
    // Check if errors are cleared
    expect(screen.queryByText('Full Name is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Email Address is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Service Required is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Date is required')).not.toBeInTheDocument();
  });
  
});
