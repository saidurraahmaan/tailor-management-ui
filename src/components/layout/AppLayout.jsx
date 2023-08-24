import React from "react";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const ApplicationLayout = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default ApplicationLayout;
