import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const ProductListWithoutDelete = ({ productName, type, handleEdit }) => {
  return (
    <>
      <Grid xs={9} container spacing={2} alignItems={"center"}>
        <Grid xs={3}>{productName}</Grid>
        <Grid xs={3}>{type}</Grid>
        <Grid xs={3}>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </Grid>
      </Grid>
      <Grid xs={3}></Grid>
    </>
  );
};

export default ProductListWithoutDelete;
