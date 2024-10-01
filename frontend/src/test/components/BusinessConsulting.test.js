import React from 'react';
import { render, screen } from '@testing-library/react';
import BusinessConsulting from '../../components/BusinessConsulting';

test('renders Business Consulting component', () => {
  render(<BusinessConsulting />);

  // Check if the main heading (h1) is rendered
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Business Consulting Services');

  // Check if the description under the main heading is rendered
  expect(screen.getByText(/Empowering your business with strategic consulting services/i)).toBeInTheDocument();

  // Check if the "Our Expertise" section is rendered
  expect(screen.getByRole('heading', { level: 2, name: /Our Expertise/i })).toBeInTheDocument();
  expect(screen.getByText(/We provide expert consulting services/i)).toBeInTheDocument();

  // Check if the "Consulting Services" section is rendered
  expect(screen.getByRole('heading', { level: 2, name: /Consulting Services/i })).toBeInTheDocument();
  expect(screen.getByText(/Business Strategy Development/i)).toBeInTheDocument();
  expect(screen.getByText(/Process Improvement/i)).toBeInTheDocument();
  expect(screen.getByText(/Financial Planning/i)).toBeInTheDocument();
  expect(screen.getByText(/Risk Management/i)).toBeInTheDocument();

  // Check if the "Client Testimonials" section is rendered
  expect(screen.getByRole('heading', { level: 2, name: /Client Testimonials/i })).toBeInTheDocument();
  expect(screen.getByText(/The best business consulting services we've ever experienced/i)).toBeInTheDocument();

  // Check if the call-to-action buttons are rendered
  expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  expect(screen.getByText(/Book a Consultation/i)).toBeInTheDocument();
});
