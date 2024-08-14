// src/components/ServiceItem.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServiceItem from '../../components/ServiceItem';

describe('ServiceItem Component', () => {

  // Test if the component renders with given props
  test('renders ServiceItem component with title and description', () => {
    const title = 'Service Title';
    const description = 'This is a description of the service.';
    
    render(<ServiceItem title={title} description={description} />);
    
    // Check if the title and description are rendered correctly
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(title);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // Test if the component handles empty title and description
  test('renders correctly with empty title and description', () => {
    render(<ServiceItem title="" description="" />);
    
    // Check if the empty title and description are rendered without errors
    expect(screen.getByRole('heading', { level: 2 })).toBeEmptyDOMElement();
    expect(screen.getByText('')).toBeInTheDocument(); // This checks that an empty description is rendered
  });

});
