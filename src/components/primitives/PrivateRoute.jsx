import React from "react";
import { useSelector } from "react-redux";
import { authInformation } from "../../modules/auth/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, token } = useSelector(authInformation);

  if (!isLoggedIn || !token) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default PrivateRoute;
