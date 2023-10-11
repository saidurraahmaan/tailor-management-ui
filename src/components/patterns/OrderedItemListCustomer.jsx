import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper } from "@mui/material";
import "../index.css";

const OrderedItemListCustomer = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Paper className="text-center p-1">Items</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className="text-center p-1">Price</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className="text-center p-1">Shirt</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className="text-center p-1">4</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderedItemListCustomer;
