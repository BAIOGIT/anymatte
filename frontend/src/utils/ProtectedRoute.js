
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../context/Auth';

const ProtectedRoute = ({ element }) => {
  const authenticated = isAuthenticated();

  return authenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;