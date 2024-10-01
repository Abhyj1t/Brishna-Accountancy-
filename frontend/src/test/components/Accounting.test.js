import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accounting from '../../components/Accounting';

describe('Accounting Component', () => {

  // Test if the component renders correctly
  test('renders Accounting component with correct content', () => {
    render(<Accounting />);
    
    // Check if the main heading is rendered correctly
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accounting Services');
    
    // Check if the introductory paragraph is rendered correctly
    expect(screen.getByText(/Providing accurate and efficient accounting services for your business/i)).toBeInTheDocument();
    
    // Check if the "Our Expertise" section is rendered
    expect(screen.getByText(/Our Expertise/i)).toBeInTheDocument();
    expect(screen.getByText(/Our certified accountants ensure that your financial records are accurate, timely, and compliant with regulations/i)).toBeInTheDocument();

    // Check if the "Accounting Services" section is rendered (get the second occurrence of "Accounting Services")
    const accountingServicesHeadings = screen.getAllByText(/Accounting Services/i);
    expect(accountingServicesHeadings[1]).toBeInTheDocument(); // Second occurrence in <h2>

    expect(screen.getByText(/Financial Statement Preparation/i)).toBeInTheDocument();
    expect(screen.getByText(/Tax Preparation and Filing/i)).toBeInTheDocument();
    expect(screen.getByText(/Payroll Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Audit Support/i)).toBeInTheDocument();

    // Check if the "Client Testimonials" section is rendered
    expect(screen.getByText(/Client Testimonials/i)).toBeInTheDocument();
    expect(screen.getByText(/Brishna Accountancy has streamlined our accounting processes/i)).toBeInTheDocument();

    // Check if the call-to-action buttons are rendered
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Book a Consultation/i)).toBeInTheDocument();
  });
});
