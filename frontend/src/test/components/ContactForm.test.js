// test/components/ContactForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../../src/components/ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    render(<ContactForm />);
  });

  test('renders the form fields correctly', () => {
    // Check if the form fields are rendered
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
  });

  test('allows the user to fill out the form', () => {
    // Simulate user typing in the form fields
    userEvent.type(screen.getByPlaceholderText('Full Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email Address'), 'john.doe@example.com');
    userEvent.type(screen.getByPlaceholderText('Your Message'), 'Hello, this is a test message.');

    // Check if the input values are updated
    expect(screen.getByPlaceholderText('Full Name').value).toBe('John Doe');
    expect(screen.getByPlaceholderText('Email Address').value).toBe('john.doe@example.com');
    expect(screen.getByPlaceholderText('Your Message').value).toBe('Hello, this is a test message.');
  });

  test('submits the form and displays an alert', () => {
    // Mock the global alert function
    global.alert = jest.fn();

    // Simulate user typing and form submission
    userEvent.type(screen.getByPlaceholderText('Full Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email Address'), 'john.doe@example.com');
    userEvent.type(screen.getByPlaceholderText('Your Message'), 'Hello, this is a test message.');
    userEvent.click(screen.getByText('Send Message'));

    // Check if alert is called with the correct message
    expect(global.alert).toHaveBeenCalledWith('Message sent: Hello, this is a test message.');
  });
});
