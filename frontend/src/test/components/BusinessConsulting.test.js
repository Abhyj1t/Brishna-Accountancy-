import React from 'react';
import { render, screen } from '@testing-library/react';
import BusinessConsulting from '../../components/BusinessConsulting';

test('renders Business Consulting component', () => {
  render(<BusinessConsulting />);

  // Check if the main heading is rendered
  expect(screen.getByText('Business Consulting')).toBeInTheDocument();

  // Check if the description is rendered
  expect(screen.getByText(/Our business consulting services provide expert advice/i)).toBeInTheDocument();

  // Check if the pricing section is rendered
  expect(screen.getByText('Pricing')).toBeInTheDocument();
  expect(screen.getByText('Starting from $300 per session')).toBeInTheDocument();

  // Check if the FAQs section is rendered
  expect(screen.getByText('FAQs')).toBeInTheDocument();
  expect(screen.getByText('What is included in a consulting session?')).toBeInTheDocument();
  expect(screen.getByText('Can you help with market research?')).toBeInTheDocument();

  // Check if the contact information is rendered
  expect(screen.getByText(/Contact us for more information/i)).toBeInTheDocument();
});
