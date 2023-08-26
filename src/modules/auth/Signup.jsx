import React from "react";
import { Button, Container, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <div className="flex align-items-center py-1">
        <div className="box">
          <div className="font-20 font-w-700">Register </div>
          <div className="pb-2">to get started</div>
          <div className="py-1">
            <TextField label="Full Name" variant="outlined" fullWidth />
          </div>
          <div className="py-1">
            <TextField label="Username" variant="outlined" fullWidth required />
          </div>
          <div className="py-1">
            <TextField label="Email" variant="outlined" fullWidth />
          </div>
          <div className="py-1">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
            />
          </div>
          <div className="py-1">
            <TextField
              label="Store Name"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="py-1">
            <TextField
              label="Store Address"
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <div className="py-1">
            <TextField label="Phone" variant="outlined" fullWidth required />
          </div>

          <div className="py-1">
            <Button variant="contained" fullWidth>
              Register
            </Button>
          </div>
          <div className="py-1 text-center">
            Already have account?{" "}
            <span className="font-w-700 cursor-pointer">
              <Link underline="none" onClick={() => navigate("/signin")}>
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
