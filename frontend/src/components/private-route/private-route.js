import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  return role === 'admin'? children: <Navigate to='/' />
}
export default ProtectedRoute;
