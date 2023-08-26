import React from "react";
// import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import PermanentDrawerLeft from "./AppDrawer";

const ApplicationLayout = () => {
  return (
    <>
      {/* <Container maxWidth="xl"> */}
        <PermanentDrawerLeft>
          <Outlet />
        </PermanentDrawerLeft>
      {/* </Container> */}
    </>
  );
};

export default ApplicationLayout;
