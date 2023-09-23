import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReducer, updateOrderField } from "../orderSlice";
import ProductListDetails from "../../product/components/ProductListDetails";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";
import { STATUS } from "../../../constants/fetch";

const MeasuredProductList = ({
  setOrderInfo,
  setShowProductType,
  setNewOrderState,
}) => {
  const dispatch = useDispatch();

  const { measuredItems } = useSelector(getOrderReducer);
  const handleEdit = (id) => {};

  const handleDelete = (id) => {
    let items = [...measuredItems];

    items = items.filter((ele) => ele._id !== id);
    dispatch(updateOrderField({ field: "measuredItems", value: items }));
  };

  const handleAddNewProduct = () => {
    setShowProductType(true);
    setNewOrderState((prev) => ({
      ...prev,
      selectedProduct: "",
      productType: "",
      productFetchStatus: STATUS.IDLE,
      productInfoFetchStatus: STATUS.IDLE,
    }));
  };

  return (
    <div>
      {measuredItems.map((ele) => (
        <Grid id={ele._id} container spacing={2} mt={1}>
          <ProductListDetails
            type={ele.productType}
            productName={ele.productName}
            handleEdit={() => handleEdit(ele._id)}
            handleDelete={() => handleDelete(ele._id)}
          />
        </Grid>
      ))}
      <div className="pt-4 flex justify-content-center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddNewProduct}
        >
          Add new Product
        </Button>
      </div>
    </div>
  );
};

export default MeasuredProductList;
