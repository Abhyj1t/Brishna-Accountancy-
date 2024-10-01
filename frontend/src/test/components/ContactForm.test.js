import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ContactForm from '../../components/ContactForm';

describe('ContactForm Component', () => {
  
  // Test if the component renders correctly
  test('renders ContactForm component', () => {
    render(<ContactForm />);
    
    // Check if the form and its elements are rendered with the correct placeholders
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
  
  // Test if inputs are updated correctly
  test('updates input values on change', () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const messageInput = screen.getByPlaceholderText('Message');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(messageInput.value).toBe('Hello, this is a test message.');
  });

  // Test form submission and display of success message
  test('shows success message on form submit', async () => {
    render(<ContactForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello, this is a test message.' } });
    
    // Mock the fetch API to simulate a successful form submission
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    
    // Check if the success message is displayed
    const successMessage = await screen.findByText('Message sent successfully!');
    expect(successMessage).toBeInTheDocument();
  });
});
