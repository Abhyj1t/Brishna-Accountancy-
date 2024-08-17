import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ServiceBookingForm from '../../components/ServiceBookingForm';

test('renders ServiceBookingForm component', () => {
  render(<ServiceBookingForm />);

  // Check if the input fields and the button are rendered
  expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Service Required')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
});

test('shows validation errors on empty form submission', () => {
  render(<ServiceBookingForm />);

  // Submit the form without entering any data
  fireEvent.click(screen.getByRole('button', { name: /book now/i }));

  // Check if validation errors are shown
  expect(screen.getByText('Full Name is required')).toBeInTheDocument();
  expect(screen.getByText('Email Address is required')).toBeInTheDocument();
  expect(screen.getByText('Service Required is required')).toBeInTheDocument();
  expect(screen.getByText('Date is required')).toBeInTheDocument();
});

test('shows invalid email error when email format is incorrect', () => {
  render(<ServiceBookingForm />);

  // Enter an invalid email and submit the form
  fireEvent.change(screen.getByPlaceholderText('Email Address'), {
    target: { value: 'invalid-email' },
  });
  fireEvent.click(screen.getByRole('button', { name: /book now/i }));

  // Check if the email validation error is shown
  expect(screen.getByText('Email Address is invalid')).toBeInTheDocument();
});


