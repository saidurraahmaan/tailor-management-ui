import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderInfoProduction = ({
  orderNo,
  deliveryDate,
  productName,
  quantity,
}) => {
  return (
    <Grid className="font-14" container spacing={2}>
      <Grid xs={6}>
        <span className="font-w-700">অর্ডার নং: </span>
        {orderNo}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">ডেলিভারি তারিখ: </span>
        {deliveryDate}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">আইটেমের নাম: </span>
        {productName}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">কোয়ান্টিটি: </span>
        {quantity}
      </Grid>
    </Grid>
  );
};

export default OrderInfoProduction;
