import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderInfoProduction = ({
  orderNo,
  orderDate,
  deliveryDate,
  customerName,
}) => {
  return (
    <Grid className="font-14" container spacing={2}>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার নং: </span>
        {orderNo}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার তারিখ: </span>
        {orderDate}
      </Grid>

      <Grid xs={6}>
        <span className="font-w-700">কাস্টমারের নাম: </span>
        {customerName}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">ডেলিভারি তারিখ: </span>
        {deliveryDate}
      </Grid>
    </Grid>
  );
};

export default OrderInfoProduction;
