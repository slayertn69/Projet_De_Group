// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenue sur CryptoTracker</h1>
      <nav>
        <Link to="/login">Se connecter</Link>
        <Link to="/register">S'inscrire</Link>
        <Link to="/cryptoprices">Prix des Cryptomonnaies</Link>
        <Link to="/cryptopricesws">Prix des Cryptomonnaies (WebSocket)</Link>
      </nav>
    </div>
  );
};

export default HomePage;
