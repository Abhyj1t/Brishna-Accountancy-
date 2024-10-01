import React from 'react';
import { render, screen } from '@testing-library/react';
import TaxPreparation from '../../components/TaxPreparation';

test('renders Tax Preparation component', () => {
  render(<TaxPreparation />);

  // Check if the main heading is rendered correctly
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tax Preparation Services');

  // Check if the description is rendered
  expect(screen.getByText(/Maximizing your tax savings and ensuring compliance/i)).toBeInTheDocument();

  // Check if the "Why Choose Us?" section is rendered
  expect(screen.getByRole('heading', { level: 2, name: /Why Choose Us?/i })).toBeInTheDocument();
  expect(screen.getByText(/Our tax professionals are experts in current tax laws/i)).toBeInTheDocument();

  // Check if the "Services We Provide" section is rendered
  expect(screen.getByRole('heading', { level: 2, name: /Services We Provide/i })).toBeInTheDocument();
  expect(screen.getByText(/Personal and business tax return preparation/i)).toBeInTheDocument();
  expect(screen.getByText(/Tax planning and consulting/i)).toBeInTheDocument();
  expect(screen.getByText(/Audit support/i)).toBeInTheDocument();
  expect(screen.getByText(/Corporate tax services/i)).toBeInTheDocument();

  // Check if the "Client Testimonials" section is rendered
  expect(screen.getByRole('heading', { level: 2, name: /Client Testimonials/i })).toBeInTheDocument();
  expect(screen.getByText(/Brishna Accountancy helped me save thousands on my taxes/i)).toBeInTheDocument();
  expect(screen.getByText(/Fast, efficient, and reliable tax services/i)).toBeInTheDocument();

  // Check if the call-to-action buttons are rendered
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  expect(screen.getByText(/Book a Consultation/i)).toBeInTheDocument();
});
