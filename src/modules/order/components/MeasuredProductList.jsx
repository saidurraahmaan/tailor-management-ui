import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReducer, updateOrderField } from "../orderSlice";
import ProductListDetails from "../../product/components/ProductListDetails";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button } from "@mui/material";
import {
  newOrderInitialState,
  orderInfoInitialState,
  showingStateInitialState,
} from "../orderConstant";
import { STATUS } from "../../../constants/fetch";

const MeasuredProductList = ({
  setOrderInfo,
  setShowingState,
  showingState,
  setNewOrderState,
}) => {
  const dispatch = useDispatch();

  const { measuredItems } = useSelector(getOrderReducer);
  const handleEdit = (id) => {
    const editedItems = measuredItems.filter((ele) => ele._id === id)[0];
    setOrderInfo({ ...editedItems });
    setShowingState((prev) => ({
      ...prev,
      productType: false,
      productMeasurement: true,
      measurementTabAddBtn: false,
    }));
    setNewOrderState((prev) => ({
      ...prev,
      productInfoFetchStatus: STATUS.SUCCESS,
    }));
  };

  const handleDelete = (id) => {
    let items = [...measuredItems];

    items = items.filter((ele) => ele._id !== id);
    dispatch(updateOrderField({ field: "measuredItems", value: items }));
    if (!items.length) {
      setShowingState(showingStateInitialState);
      setNewOrderState(newOrderInitialState);
      setOrderInfo(orderInfoInitialState);
    }
  };

  const handleAddNewProduct = () => {
    // setShowProductType(true);
    setShowingState((prev) => ({
      ...prev,
      productType: true,
      productMeasurement: true,
      measurementTabAddBtn: false,
    }));
  };
  // console.log({ measuredItems });
  return (
    <div>
      {measuredItems.map((ele) => (
        <Grid key={ele._id} container spacing={2} mt={1}>
          <ProductListDetails
            type={ele.productType}
            productName={ele.productName}
            handleEdit={() => handleEdit(ele._id)}
            handleDelete={() => handleDelete(ele._id)}
          />
        </Grid>
      ))}
      {showingState.measurementTabAddBtn && (
        <div className="pt-4 flex justify-content-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddNewProduct}
          >
            Add new Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default MeasuredProductList;
