import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../index.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#b0b5c2",
}));

const OrderedItemListCustomer = ({ orderedItems, advance, discount }) => {
  const calculateTotalPrice = () => {
    let totalCost = 0;
    orderedItems.forEach((element) => {
      totalCost =
        totalCost +
        (Number(element.makingCost) + Number(element.clothPrice)) *
          Number(element.quantity);
    });

    const discountAmount = (Number(discount) / 100) * totalCost;

    return totalCost - discountAmount;
  };
  return (
    <div>
      <Grid container spacing={1} className="font-12">
        <Grid xs={9}>
          <Item className="text-center ">Description</Item>
        </Grid>
        <Grid xs={3}>
          <Item className="text-center ">Price</Item>
        </Grid>

        {orderedItems.map((ele) => (
          <React.Fragment key={ele.id}>
            <Grid xs={9}>
              <Paper className="text-center ">
                {ele.productName}
                {ele.isTakingCloth && " + cloth"}
                {" X "} {ele.quantity}
              </Paper>
            </Grid>
            <Grid xs={3}>
              <Paper className="text-center ">
                {(ele.makingCost + ele.clothPrice) * ele.quantity}
              </Paper>
            </Grid>
          </React.Fragment>
        ))}
        <Grid xs={9}>
          <Paper className="text-center">Discount</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{discount} %</Paper>
        </Grid>
        <Grid xs={9}>
          <Paper className="text-center">Total</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{calculateTotalPrice()}</Paper>
        </Grid>
        <Grid xs={9}>
          <Paper className="text-center">Advance</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">{advance}</Paper>
        </Grid>

        <Grid xs={9}>
          <Paper className="text-center">Due</Paper>
        </Grid>
        <Grid xs={3}>
          <Paper className="text-center">
            {calculateTotalPrice() - advance}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderedItemListCustomer;
