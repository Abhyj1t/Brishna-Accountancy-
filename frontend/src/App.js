import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact'; 
import AboutUs from './components/AboutUs';
import Header from './components/Header';
import TaxPreparation from './components/TaxPreparation';
import Accounting from './components/Accounting';
import BusinessConsulting from './components/BusinessConsulting';
import SignupForm from './components/SignupForm';  // Import SignupForm
import LoginForm from './components/LoginForm';    // Import LoginForm
import ForgotPasswordForm from './components/ForgotPasswordForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/tax-preparation" element={<TaxPreparation />} />
          <Route path="/services/accounting" element={<Accounting />} />
          <Route path="/services/business-consulting" element={<BusinessConsulting />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/signup" element={<SignupForm />} />  {/* Add SignupForm route */}
          <Route path="/login" element={<LoginForm />} />    {/* Add LoginForm route */}
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/about-us" element={<AboutUs />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
