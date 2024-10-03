// src/pages/CryptoPrices.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Assure-toi que ce soit le bon chemin
import { useNavigate } from 'react-router-dom';

const CryptoPrices = () => {
  const [prices, setPrices] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | succeeded | failed
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirige vers la page d'accueil après déconnexion
  };

  const fetchPrices = async () => {
    setStatus('loading');
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      if (!response.ok) {
        throw new Error('Échec de la récupération des prix');
      }
      const data = await response.json();
      setPrices(data);
      setStatus('succeeded');
    } catch (error) {
      setError(error); // Ne pas accéder à error.message directement
      setStatus('failed');
    }
  };

  useEffect(() => {
    fetchPrices();

    const intervalId = setInterval(fetchPrices, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Prix des Cryptomonnaies</h1>
      <button onClick={handleLogout}>Déconnexion</button>
      {status === 'loading' && <p>Chargement des prix...</p>}
      {status === 'failed' && <p>Erreur : {error ? error.message : 'Une erreur inconnue s\'est produite'}</p>}
      {status === 'succeeded' && (
        <ul>
          <li>Bitcoin: ${prices.bitcoin?.usd}</li>
          <li>Ethereum: ${prices.ethereum?.usd}</li>
        </ul>
      )}
    </div>
  );
};

export default CryptoPrices;
