import React from "react";
import { Container, Link, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import { registerUser } from "./authApi";
import { APPROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";

const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    storeName: "",
    storeAddress: "",
    phone: "",
  });
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (error) => {
    // console.log(error.data.message);
    setStatus(STATUS.ERROR);
    setErrorMessage(error.data.message);
  };

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleSubmit = async () => {
    setStatus(STATUS.LOADING);
    setErrorMessage("");
    const response = await registerUser(userInfo).catch((e) =>
      handleError(e.response)
    );
    setStatus(STATUS.SUCCESS);
    if (response) {
      navigate(APPROUTES.registrationSuccess);
      return;
    }
  };

  return (
    <Container maxWidth="lg">
      <div className="flex align-items-center py-1">
        <div className="box">
          <div className="font-20 font-w-700">Register </div>
          <div className="pb-2">to get started</div>
          <div className="py-1">
            <TextField
              label="আপনার নাম"
              variant="outlined"
              fullWidth
              value={userInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="py-1">
            <TextField
              label="ইউজারনেম"
              variant="outlined"
              fullWidth
              required
              value={userInfo.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>
          <div className="py-1">
            <TextField
              label="ইমেইল"
              variant="outlined"
              fullWidth
              value={userInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="py-1">
            <TextField
              label="পাসওয়ার্ড"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={userInfo.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div className="py-1">
            <TextField
              label="দোকানের নাম"
              variant="outlined"
              fullWidth
              required
              value={userInfo.storeName}
              onChange={(e) => handleChange("storeName", e.target.value)}
            />
          </div>
          <div className="py-1">
            <TextField
              label="দোকানের ঠিকানা"
              variant="outlined"
              fullWidth
              required
              value={userInfo.storeAddress}
              onChange={(e) => handleChange("storeAddress", e.target.value)}
            />
          </div>
          <div className="py-1">
            <TextField
              label="মোবাইল"
              variant="outlined"
              fullWidth
              required
              value={userInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          <div className="py-1 font-error">{errorMessage}</div>
          <div className="py-1">
            <LoadingButton
              variant="contained"
              fullWidth
              loading={status === STATUS.LOADING}
              onClick={handleSubmit}
            >
              Register
            </LoadingButton>
          </div>
          <div className="py-1 text-center">
            Already have account?{" "}
            <span className="font-w-700 cursor-pointer">
              <Link underline="none" onClick={() => navigate(APPROUTES.signin)}>
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
