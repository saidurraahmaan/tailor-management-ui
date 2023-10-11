import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderInfoCustomer = ({ orderNo, deliveryDate, orderDate }) => {
  return (
    <Grid className="font-12" container spacing={2}>
      <Grid xs={12}>
        <span className="font-w-700">অর্ডার নং: </span>
        {orderNo}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার তারিখ: </span>
        {deliveryDate}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">ডেলিভারি তারিখ: </span>
        {orderDate}
      </Grid>
    </Grid>
  );
};

export default OrderInfoCustomer;
