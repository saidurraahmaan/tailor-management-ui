import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2/Grid2.js";
import { authInformation } from "../../modules/auth/authSlice.js";
import "../index.css";

const InvoiceHeader = () => {
  const { user } = useSelector(authInformation);

  return (
    <Grid className="font-14" container spacing={2}>
      <Grid
        className="py-1 font-32 font-w-700 text-center"
        style={{ fontFamily: "cursive " }}
        xs={12}
      >
        {user.storeName}
      </Grid>
      <Grid className="py-1 font-12 text-center font-w-700" xs={12}>
        {user.storeAddress}
      </Grid>

      <Grid className="py-1" xs={6}>
        <span className="font-w-700">Mobile:</span> {user.phone}
      </Grid>
      <Grid className="py-1" xs={6}>
        <span className="font-w-700">Email:</span> {user.email}
      </Grid>
    </Grid>
  );
};

export default InvoiceHeader;
