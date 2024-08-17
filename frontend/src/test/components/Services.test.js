import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Services from '../../components/Services';

test('renders Services component with service cards and booking form', () => {
  render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>
  );

  // Check if the main heading is rendered
  expect(screen.getByText('Our Services')).toBeInTheDocument();

  // Check if the service cards are rendered
  expect(screen.getByText('Tax Preparation')).toBeInTheDocument();
  expect(screen.getByText('Professional tax preparation services for individuals and businesses.')).toBeInTheDocument();

  expect(screen.getByText('Accounting')).toBeInTheDocument();
  expect(screen.getByText('Comprehensive accounting services tailored to your needs.')).toBeInTheDocument();

  expect(screen.getByText('Business Consulting')).toBeInTheDocument();
  expect(screen.getByText('Expert advice to help grow your business.')).toBeInTheDocument();

  // Check if the "Learn More" links are present
  expect(screen.getAllByText('Learn More').length).toBe(3);

  // Check if the booking form section is rendered
  expect(screen.getByText('Book a Service')).toBeInTheDocument();
});
