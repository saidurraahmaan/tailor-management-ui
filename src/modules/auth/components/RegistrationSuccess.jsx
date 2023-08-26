import { Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APPROUTES } from "../../../constants/routes";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>You have successfully registered</div>
      <div className="font-w-700 cursor-pointer">
        <Link underline="none" onClick={() => navigate(APPROUTES.signin)}>
          Login
        </Link>
      </div>
    </>
  );
};

export default RegistrationSuccess;
