// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; 

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation(); // Récupérer l'emplacement actuel

  // Si l'utilisateur n'est pas authentifié, rediriger vers /login et sauvegarder l'URL actuelle
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
