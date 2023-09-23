import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";

const ProductListDetails = ({
  productName,
  type,
  handleEdit,
  handleDelete,
}) => {
  return (
    <>
      <Grid xs={3}>{productName}</Grid>
      <Grid xs={3}>{type}</Grid>
      <Grid xs={3}>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
      </Grid>
      <Grid xs={3}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Grid>
    </>
  );
};

export default ProductListDetails;
