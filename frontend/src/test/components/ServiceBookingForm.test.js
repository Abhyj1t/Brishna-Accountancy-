import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceBookingForm from '../../components/ServiceBookingForm';

describe('ServiceBookingForm', () => {
  it('renders service booking form', () => {
    render(<ServiceBookingForm />);
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Service Required')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument();
  });

  it('updates form data on input change', () => {
    render(<ServiceBookingForm />);
    const nameInput = screen.getByPlaceholderText('Full Name');
    const emailInput = screen.getByPlaceholderText('Email Address');
    const serviceInput = screen.getByPlaceholderText('Service Required');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(serviceInput, { target: { value: 'Haircut' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(serviceInput).toHaveValue('Haircut');
  });
});