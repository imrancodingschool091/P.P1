// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { accessToken } = useSelector((state) => state.auth);

  // if no access token → redirect to login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
