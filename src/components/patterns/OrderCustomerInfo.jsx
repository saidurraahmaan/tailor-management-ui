import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderCustomerInfo = ({
  orderNo,
  customerName,
  orderDate,
  deliveryDate,
}) => {
  return (
    <Grid className="font-14" container spacing={2}>
      <Grid xs={6}>
        <span className="font-w-700">Order no :</span>
        {orderNo}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">Order Date :</span> {orderDate}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">Customer Name :</span>
        {customerName}
      </Grid>
      <Grid xs={6}>
        <span className="font-w-700">Delivery Date :</span>
        {deliveryDate}
      </Grid>
    </Grid>
  );
};

export default OrderCustomerInfo;
