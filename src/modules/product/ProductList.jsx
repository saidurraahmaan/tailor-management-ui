import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useApiHook from "../../utils/ApiCustomHook";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { APIROUTES, APPROUTES } from "../../constants/routes";
import ProductListDetails from "./components/ProductListDetails";
import { useNavigate, useOutletContext } from "react-router-dom";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const ProductList = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { loading, responseData } = useApiHook(
    "get",
    APIROUTES.getUserAllProduct
  );

  useEffect(() => {
    setDrawerText("Product List");
  }, [setDrawerText]);

  if (loading) {
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
      {!responseData ? (
        <></>
      ) : !responseData.length ? (
        <>You have no product</>
      ) : (
        <Grid container spacing={2} alignItems={"center"}>
          <Grid xs={3}>ProductName</Grid>
          <Grid xs={3}>Type</Grid>
          <Grid xs={6}>Action</Grid>
          {responseData.map((ele) => (
            <ProductListDetails
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
