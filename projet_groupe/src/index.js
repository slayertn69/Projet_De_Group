// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css'; // Importer le style
import { Provider } from 'react-redux'; // Pour Redux
import store from './redux/store'; // Import du Redux store
import { AuthProvider } from './components/AuthContext'; // Importer le contexte

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);
