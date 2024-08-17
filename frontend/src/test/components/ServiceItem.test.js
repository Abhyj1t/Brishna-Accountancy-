// src/test/components/ServiceItem.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ServiceItem from '../../components/ServiceItem';

describe('ServiceItem Component', () => {

  test('renders correctly with empty title and description', () => {
    render(<ServiceItem title="" description="" />);
    
    // Check if the title is rendered and is an empty DOM element
    expect(screen.getByRole('heading', { level: 2 })).toBeEmptyDOMElement();
    
    // Check if the description is rendered and is an empty DOM element
    const descriptionElement = screen.getByText((content, element) => element.tagName.toLowerCase() === 'p' && content === '');
    expect(descriptionElement).toBeInTheDocument();
  });
  
});
