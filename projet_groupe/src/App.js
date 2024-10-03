// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import CryptoPrices from './pages/CryptoPrices';
import CryptoPricesWS from './pages/CryptoPricesWS';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cryptoprices" element={<CryptoPrices />} />
          <Route path="/cryptopricesws" element={<CryptoPricesWS />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
