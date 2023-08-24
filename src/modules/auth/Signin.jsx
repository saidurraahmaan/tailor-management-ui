import React from "react";
import { Button, Container, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signin = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <div className="flex align-items-center  h-100v">
        <div className="box">
          <div className="font-20 font-w-700">Login </div>
          <div className="pb-2">to get started</div>
          <div className="py-2">
            <TextField label="Username" variant="outlined" fullWidth />
          </div>
          <div className="py-2">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
            />
          </div>
          <div className="py-2">
            <Button variant="contained" fullWidth>
              Login
            </Button>
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
