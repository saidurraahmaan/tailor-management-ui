import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderInfoCustomer = ({
  orderNo,
  deliveryDate,
  orderDate,
  customerMobile,
}) => {
  return (
    <Grid className="font-12" container spacing={2}>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার নং: </span>
        {orderNo}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">কাস্টমার মোবাইল: </span>
        {customerMobile}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার তারিখ: </span>
        {orderDate}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">ডেলিভারি তারিখ: </span>
        {deliveryDate}
      </Grid>
    </Grid>
  );
};

export default OrderInfoCustomer;
