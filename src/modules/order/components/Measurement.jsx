import React from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DescriptionBoxes from "./DescriptionBoxes";
import MeasurementFields from "./MeasurementFields";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReducer, updateOrderField } from "../orderSlice";
import { newOrderInitialState, orderInfoInitialState } from "../orderConstant";

const Measurement = ({
  orderInfo,
  showingState,
  setOrderInfo,
  setShowingState,
  setNewOrderState,
}) => {
  const { _id } = orderInfo;
  const dispatch = useDispatch();
  const { measuredItems } = useSelector(getOrderReducer);

  const handleAddBtnClick = () => {
    let previousProducts = [...measuredItems];

    setNewOrderState(newOrderInitialState);
    setShowingState((prev) => ({
      ...prev,
      productType: false,
      productMeasurement: false,
      measurementTabAddBtn: true,
    }));
    if (!_id) {
      const itemDetails = { ...orderInfo, _id: Date.now() };
      previousProducts.push(itemDetails);
      dispatch(
        updateOrderField({ field: "measuredItems", value: previousProducts })
      );
      setOrderInfo(orderInfoInitialState);
      return;
    }
    // const editedItem = measuredItems.filter((ele) => ele._id === _id)[0];
    const updatedItems = previousProducts.map((ele) =>
      ele._id === _id ? { ...orderInfo } : { ...ele }
    );
    dispatch(updateOrderField({ field: "measuredItems", value: updatedItems }));
    setOrderInfo(orderInfoInitialState);
  };
  // console.log(orderInfo);
  return (
    <div>
      <div className="flex align-items-start g-3 py-1">
        <div className="wd-30">
          <MeasurementFields
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        </div>
        <div className="wd-70">
          <DescriptionBoxes orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
        </div>
      </div>
      <Grid container spacing={2} className="py-2">

        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Making Cost"
            variant="outlined"
            type="number"
            value={orderInfo.makingCost}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              setOrderInfo((prev) => ({
                ...prev,
                makingCost: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            value={orderInfo.quantity}
            inputProps={{ min: "1" }}
            onChange={(e) =>
              setOrderInfo((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>

      <div className="pt-4 flex justify-content-center">
        <Button variant="contained" onClick={handleAddBtnClick} color="success">
          {_id ? "Update" : "Add"}
        </Button>
      </div>
    </div>
  );
};

export default Measurement;
