import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderInfoCustomer = ({
  orderNo,
  orderDate,
  deliveryDate,
  customerName,
}) => {
  return (
    <Grid className="font-14" container spacing={2}>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার নং: </span>
      </Grid>
      <Grid xs={6}>{orderNo}</Grid>
      <Grid xs={6}>
        <span className="font-w-700">কাস্টমারের নাম: </span>
      </Grid>
      <Grid xs={6}>{customerName}</Grid>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার তারিখ: </span>
      </Grid>
      <Grid xs={6}>{orderDate}</Grid>
      <Grid xs={6}>
        <span className="font-w-700">ডেলিভারি তারিখ: </span>
      </Grid>
      <Grid xs={6}>{deliveryDate}</Grid>
    </Grid>
  );
};

export default OrderInfoCustomer;
