// src/components/ServiceItem.js
import React from 'react';

const ServiceItem = ({ title, description }) => {
  return (
    <div className="service-item">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ServiceItem;
