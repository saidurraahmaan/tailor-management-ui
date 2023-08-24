// import React from "react";
// import { useSelector } from "react-redux";
// import { authInformation } from "../../modules/auth/authSlice";
// import { Navigate } from "react-router-dom";
// import { LOADING } from "../../constant/fetchContanstant";

const PrivateRoute = ({ children }) => {
  // const { isLoggedIn, token, status } = useSelector(authInformation);

  // if (status !== LOADING && (!isLoggedIn || !token)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }
  return children;
};

export default PrivateRoute;
