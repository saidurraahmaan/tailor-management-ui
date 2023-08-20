import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ApplicationLayout = ({ showNavBackBtn }) => {
  return (
    <>
      <Container maxWidth="sm">
        <Navbar showNavBackBtn={showNavBackBtn} />
        <Outlet />
      </Container>
    </>
  );
};

export default ApplicationLayout;
