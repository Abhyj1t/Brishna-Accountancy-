import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import Header from './components/Header';
import TaxPreparation from './components/TaxPreparation';
import Accounting from './components/Accounting';
import BusinessConsulting from './components/BusinessConsulting';

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
