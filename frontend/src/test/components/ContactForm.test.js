// src/components/ContactForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from '../../components/ContactForm';

describe('ContactForm Component', () => {
  
  // Test if the component renders correctly
  test('renders ContactForm component', () => {
    render(<ContactForm />);
    
    // Check if the form and its elements are rendered
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
  
  // Test if inputs are updated correctly
  test('updates input values on change', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const messageInput = screen.getByPlaceholderText('Your Message');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(messageInput.value).toBe('Hello, this is a test message.');
  });

  // Test form submission
  test('shows alert with message on form submit', () => {
    // Mock the alert function
    global.alert = jest.fn();

    render(<ContactForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello, this is a test message.' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Check if the alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith('Message sent: Hello, this is a test message.');
  });
  
});
