import React from 'react';
import { render, screen } from '@testing-library/react';
import TaxPreparation from '../../components/TaxPreparation';

test('renders Tax Preparation component', () => {
  render(<TaxPreparation />);

  // Check if the main heading is rendered
  expect(screen.getByText('Tax Preparation')).toBeInTheDocument();

  // Check if the description is rendered
  expect(screen.getByText(/Our professional tax preparation services ensure/i)).toBeInTheDocument();

  // Check if the pricing section is rendered
  expect(screen.getByText('Pricing')).toBeInTheDocument();
  expect(screen.getByText('Starting from $150')).toBeInTheDocument();

  // Check if the FAQs section is rendered
  expect(screen.getByText('FAQs')).toBeInTheDocument();
  expect(screen.getByText('What documents do I need for tax preparation?')).toBeInTheDocument();
  expect(screen.getByText('How long does it take to prepare taxes?')).toBeInTheDocument();

  // Check if the contact information is rendered
  expect(screen.getByText(/Contact us for more information/i)).toBeInTheDocument();
});
