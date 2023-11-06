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
        <span className="font-16">{orderNo}</span>
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার তারিখ: </span>
        <span className="font-16">{orderDate}</span>
      </Grid>

      <Grid xs={6}>
        <span className="font-w-700">কাস্টমারের নাম: </span>
        <span className="font-16">{customerName}</span>
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">ডেলিভারি তারিখ: </span>

        <span className="font-16">{deliveryDate}</span>
      </Grid>
    </Grid>
  );
};

export default OrderInfoProduction;
