import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Brishna Accountancy Pty</h1>
        <p>Your Trusted Accounting Professionals</p>
      </div>
      
      <div className="about-content">
        <p>
          At Brishna Accountancy, we specialize in a variety of accounting services with outstanding support.
          We understand how busy you are, and with our expertise, we can take care of your accounting needs quickly and effectively.
          Our firm is equipped to handle all your bookkeeping and accounting needs, leaving you to focus on what matters most.
        </p>
        <p>
          Our registered Tax Agent, Brishna Azizi, has years of experience in the field of accounting, providing clients with personalized services
          tailored to meet their unique needs. Whether it's at the corporate or personal level, our goal is to make your financial life easier.
        </p>
        <p>
          At Brishna Accountancy, integrity, professionalism, and excellence guide our approach to every client. We take the time to get to know
          you and your financial needs, so we can provide accurate, reliable services that deliver results.
        </p>
      </div>
      
      <div className="about-footer">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide accounting services that you can trust. Your satisfaction is our top priority, and we strive to deliver
          services with integrity, excellence, and professionalism.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;