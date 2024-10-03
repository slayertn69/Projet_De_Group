// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice'; // Import du authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Ajouter le authReducer au store
  },
});

export default store;
