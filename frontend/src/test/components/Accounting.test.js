// src/components/Accounting.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accounting from '../../components/Accounting';

describe('Accounting Component', () => {

  // Test if the component renders correctly
  test('renders Accounting component with correct content', () => {
    render(<Accounting />);
    
    // Check if the main heading is rendered correctly
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accounting');
    
    // Check if the introductory paragraph is rendered correctly
    expect(screen.getByText(/We offer comprehensive accounting services tailored to your needs/i)).toBeInTheDocument();
    
    // Check if the pricing section is rendered correctly
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Pricing');
    expect(screen.getByText('Starting from $200/month')).toBeInTheDocument();
    
    // Check if the FAQs section is rendered correctly
    const faqsHeading = screen.getAllByRole('heading', { level: 2 })[1]; // second h2 element
    expect(faqsHeading).toHaveTextContent('FAQs');
    
    const faqsListItems = screen.getAllByRole('listitem');
    expect(faqsListItems).toHaveLength(2);
    expect(faqsListItems[0]).toHaveTextContent('Do you offer remote accounting services?');
    expect(faqsListItems[1]).toHaveTextContent('Can you help with payroll management?');
    
    // Check if the contact information paragraph is rendered correctly
    expect(screen.getByText('Contact us for more information or to schedule an appointment.')).toBeInTheDocument();
  });
  
});
