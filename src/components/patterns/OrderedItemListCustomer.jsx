import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {  Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../index.css";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#b0b5c2",
  fontWeight: 700,
  padding: "8px",
  border: "1px solid",
}));

const PaperItem = styled(Paper)(({ theme }) => ({
  padding: "4px 8px",
  border: "1px solid",
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
          <Item className="text-center">বর্ণনা</Item>
        </Grid>
        <Grid xs={3}>
          <Item className="text-center">মুল্য</Item>
        </Grid>
        {/* <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} /> */}
        <Grid xs={9}>
          <PaperItem>কাপড়</PaperItem>
        </Grid>
        <Grid xs={3}>
          <PaperItem>{clothPrice} টাকা</PaperItem>
        </Grid>
        {orderedItems.map((ele) => (
          <React.Fragment key={ele.id}>
            <Grid xs={9}>
              <PaperItem>
                {ele.productName}
                {" X "} {ele.quantity}
              </PaperItem>
            </Grid>
            <Grid xs={3}>
              <PaperItem>
                {Number(ele.makingCost) * Number(ele.quantity)} টাকা
              </PaperItem>
            </Grid>
          </React.Fragment>
        ))}

        <Grid xs={9}>
          <PaperItem>মোট</PaperItem>
        </Grid>
        <Grid xs={3}>
          <PaperItem>{calculateTotalPrice()} টাকা</PaperItem>
        </Grid>
        <Grid xs={9}>
          <PaperItem>ডিস্কাউন্ট</PaperItem>
        </Grid>
        <Grid xs={3}>
          <PaperItem>{discount} টাকা</PaperItem>
        </Grid>

        <Grid xs={9}>
          <PaperItem>এডভান্স</PaperItem>
        </Grid>
        <Grid xs={3}>
          <PaperItem>{advance} টাকা</PaperItem>
        </Grid>

        <Grid xs={9}>
          <PaperItem>বাকী</PaperItem>
        </Grid>
        <Grid xs={3}>
          <PaperItem>
            {calculateTotalPrice() - Number(advance) - Number(discount)} টাকা
          </PaperItem>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderedItemListCustomer;
