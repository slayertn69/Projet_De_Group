// src/components/CryptoPricesWS.js
import React, { useEffect, useState } from 'react';

const CryptoPricesWS = () => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices(data);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Prix des Cryptomonnaies (WebSocket)</h1>
      <ul>
        {Object.entries(prices).map(([key, value]) => (
          <li key={key}>
            {key.toUpperCase()}: ${value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPricesWS;
