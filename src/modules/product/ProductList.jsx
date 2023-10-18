import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useApiHook from "../../utils/ApiCustomHook";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { APIROUTES, APPROUTES } from "../../constants/routes";
import { useNavigate, useOutletContext } from "react-router-dom";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import { STATUS } from "../../constants/fetch";
import { ProductListWithoutDelete } from "./index.js";

const ProductList = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getUserAllProduct
  );

  useEffect(() => {
    setDrawerText("Product List");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      <div className="py-1 pb-3 flex justify-content-center">
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(APPROUTES.newProduct)}
        >
          Add new product
        </Button>
      </div>
      {fetchStatus === STATUS.SUCCESS && responseData.length === 0 && (
        <>You have no product</>
      )}
      {fetchStatus === STATUS.SUCCESS && responseData.length > 0 && (
        <Grid container spacing={2} alignItems={"center"}>
          <Grid xs={4}>ProductName</Grid>
          <Grid xs={4}>Type</Grid>
          <Grid xs={4}>Action</Grid>
          {responseData.map((ele) => (
            <ProductListWithoutDelete
              key={ele._id}
              type={ele.productType}
              productName={ele.productName}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductList;
