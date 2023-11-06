import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2/Grid2.js";
import { authInformation } from "../../modules/auth/authSlice.js";
import "../index.css";

const CustomerCopyHeader = () => {
  const { user } = useSelector(authInformation);

  return (
    <Grid className="font-14" container spacing={1}>
      <Grid
        className="  font-18 font-w-700 text-center text-uppercase font-i"
        xs={12}
      >
        {user.storeName}
      </Grid>
      <Grid className="py-1 font-14  font-w-700 text-center" xs={12}>
        {user.storeAddress}
      </Grid>

      <Grid className="py-1 font-14 text-center" xs={12}>
        <span className="font-w-700">মোবাইল:</span> {user.phone}
      </Grid>
    </Grid>
  );
};

export default CustomerCopyHeader;
