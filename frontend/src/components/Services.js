// src/components/Services.js
import React from 'react';
import ServiceItem from './ServiceItem';
import ServiceBookingForm from './ServiceBookingForm';

const Services = () => {
  const services = [
    { title: 'Tax Preparation', description: 'Professional tax preparation services for individuals and businesses.' },
    { title: 'Accounting', description: 'Comprehensive accounting services tailored to your needs.' },
    { title: 'Business Consulting', description: 'Expert advice to help grow your business.' },
    // Add more services as needed
  ];

  return (
    <div>
      <h1>Our Services</h1>
      {services.map((service, index) => (
        <ServiceItem key={index} title={service.title} description={service.description} />
      ))}
      <h2>Book a Service</h2>
      <ServiceBookingForm />
    </div>
  );
};

export default Services;
