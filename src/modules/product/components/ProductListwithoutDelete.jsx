import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const ProductListWithoutDelete = ({ productName, type, handleEdit }) => {
  return (
    <>
      <Grid xs={4}>{productName}</Grid>
      <Grid xs={4}>{type}</Grid>
      <Grid xs={4}>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
      </Grid>
    </>
  );
};

export default ProductListWithoutDelete;
