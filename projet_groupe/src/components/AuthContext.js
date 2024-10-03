// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Création du provider pour encapsuler l'application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialiser l'utilisateur à null

  // Fonction pour connecter l'utilisateur
  const login = (userData) => {
    setUser(userData); // Mettre à jour l'état utilisateur
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null); // Remettre l'utilisateur à null
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  return useContext(AuthContext);
};
