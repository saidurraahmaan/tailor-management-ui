import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Link, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./authApi";
import { successfulLogin } from "./authSlice";
import "./index.css";
import { STATUS } from "../../constants/fetch";
import { APPROUTES } from "../../constants/routes";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [status, setStatus] = useState(STATUS.IDLE);

  const handleError = (error) => {
    console.log(error);
    setStatus(STATUS.ERROR);
  };

  const handleSubmit = async () => {
    setStatus(STATUS.LOADING);
    const response = await loginUser(loginInfo).catch((e) =>
      handleError(e.response)
    );
    if (response) {
      setStatus(STATUS.SUCCESS);
      dispatch(successfulLogin(response.data));
      navigate(APPROUTES.home);
    }
  };

  return (
    <Container maxWidth="lg">
      <div className="flex align-items-center h-100v">
        <div className="box">
          <div className="font-20 font-w-700">Login </div>
          <div className="pb-2">to get started</div>
          <div className="py-2">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={loginInfo.username}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
            />
          </div>
          <div className="py-2">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
            />
          </div>
          <div className="py-2">
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              loading={status === STATUS.LOADING}
            >
              Login
            </LoadingButton>
          </div>
          <div className="py-2 text-center">
            New user?{" "}
            <span className="font-w-700 cursor-pointer">
              <Link underline="none" onClick={() => navigate("/signup")}>
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signin;
