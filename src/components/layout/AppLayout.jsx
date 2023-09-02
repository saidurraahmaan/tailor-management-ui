import React from "react";
// import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import PermanentDrawerLeft from "./AppDrawer";

const ApplicationLayout = () => {
  const [drawerText, setDrawerText] = React.useState("Order List");
  return (
    <>
      {/* <Container maxWidth="xl"> */}
      <PermanentDrawerLeft
        drawerText={drawerText}
        setDrawerText={setDrawerText}
      >
        <Outlet context={{ setDrawerText, drawerText }} />
      </PermanentDrawerLeft>
      {/* </Container> */}
    </>
  );
};

export default ApplicationLayout;
