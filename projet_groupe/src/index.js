import React from 'react';
import ReactDOM from 'react-dom/client'; // <--- Import from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Créer un root à partir de l'élément avec l'id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Utiliser root.render pour afficher l'application
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
