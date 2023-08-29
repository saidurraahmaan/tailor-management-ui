import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const ProductListDetails = ({ productName, type, id }) => {
  return (
    <>
      <Grid xs={3}>{productName}</Grid>
      <Grid xs={3}>{type}</Grid>
      <Grid xs={3}>
        <Button variant="contained">Edit</Button>
      </Grid>
      <Grid xs={3}>
        <Button variant="contained" color="error">Delete</Button>
      </Grid>
    </>
  );
};

export default ProductListDetails;
