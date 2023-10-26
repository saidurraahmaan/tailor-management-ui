import { Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../../../assets/images/success.gif";
import { APPROUTES } from "../../../constants/routes";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-content-center align-items-center  h-70v">
      <div className="box text-center pt-4 pb-4">
        <div>আপনার রেজিস্ট্রেশন সফল হয়েছে</div>
        <div>
          <img src={successImg} alt="f" />
        </div>
        <div className="font-w-700 cursor-pointer">
          <Link underline="none" onClick={() => navigate(APPROUTES.signin)}>
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
