import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../index.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#b0b5c2",
}));

const OrderedItemListCustomer = ({
  advance,
  discount,
  clothPrice,
  orderedItems,
}) => {
  const calculateTotalPrice = () => {
    let totalCost = 0;
    orderedItems.forEach((element) => {
      totalCost =
        totalCost + Number(element.makingCost) * Number(element.quantity);
    });

    return totalCost + Number(clothPrice);
  };

  return (
    <div>
      <Grid container spacing={1} className="font-14">
        <Grid xs={9}>
          <Item className="text-center ">বর্ণনা</Item>
        </Grid>
        <Grid xs={3}>
          <Item className="text-center ">মুল্য</Item>
        </Grid>

        {orderedItems.map((ele) => (
          <React.Fragment key={ele.id}>
            <Grid xs={9}>
              <Paper className="text-center ">
                {ele.productName}
                {" X "} {ele.quantity}
              </Paper>
            </Grid>
            <Grid xs={3}>
              <Paper className="text-center ">
                {Number(ele.makingCost) * Number(ele.quantity)} টাকা
              </Paper>
            </Grid>
          </React.Fragment>
        ))}
        <Grid xs={9}>
          <Paper className="text-center">কাপড়</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{clothPrice} টাকা</Paper>
        </Grid>
        <Grid xs={9}>
          <Paper className="text-center">মোট</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{calculateTotalPrice()} টাকা</Paper>
        </Grid>
        <Grid xs={9}>
          <Paper className="text-center">ডিস্কাউন্ট</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{discount} টাকা</Paper>
        </Grid>

        <Grid xs={9}>
          <Paper className="text-center">এডভান্স</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{advance} টাকা</Paper>
        </Grid>

        <Grid xs={9}>
          <Paper className="text-center">বাকী</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">
            {calculateTotalPrice() - Number(advance) - Number(discount)} টাকা
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderedItemListCustomer;
