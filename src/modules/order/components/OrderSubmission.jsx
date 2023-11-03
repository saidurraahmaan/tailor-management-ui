import React from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ResponsiveCalendar from "../../../components/patterns/ResponsiveCalendar";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReducer, updateOrderField } from "../orderSlice";
import { LoadingButton } from "@mui/lab";
import { STATUS } from "../../../constants/fetch";
import { placeNewOrder } from "../orderApi";

const OrderSubmission = () => {
  const dispatch = useDispatch();

  const {
    advance,
    discount,
    delivery,
    clothPrice,
    customerName,
    mobileNumber,
    measuredItems,
    status,
  } = useSelector(getOrderReducer);

  const calculateTotalPrice = () => {
    let totalCost = 0;
    measuredItems.forEach((element) => {
      totalCost =
        totalCost + Number(element.makingCost) * Number(element.quantity);
    });

    return totalCost + Number(clothPrice);
  };

  const handleChange = ({ field, value }) => {
    dispatch(updateOrderField({ field, value }));
  };

  const handlePlaceOrderClick = async () => {
    const orderData = {
      advance,
      delivery,
      discount,
      clothPrice,
      customerName,
      mobileNumber,
      measuredItems,
    };
    // console.log(orderData);
    dispatch(placeNewOrder(orderData));
  };

  return (
    <>
      <Grid container spacing={4} mt={2}>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            value={customerName}
            onChange={(e) =>
              handleChange({ field: "customerName", value: e.target.value })
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobileNumber}
            onChange={(e) =>
              handleChange({ field: "mobileNumber", value: e.target.value })
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <ResponsiveCalendar
            label={"Delivery Date"}
            value={delivery}
            handleChange={(date) =>
              handleChange({ field: "delivery", value: date })
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Cloth Price"
            variant="outlined"
            type="number"
            fullWidth
            value={clothPrice}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              handleChange({ field: "clothPrice", value: +e.target.value })
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Discount (tk)"
            variant="outlined"
            type="number"
            fullWidth
            inputProps={{ min: "0" }}
            value={discount}
            onChange={(e) =>
              handleChange({ field: "discount", value: +e.target.value })
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Total Price (tk)"
            variant="outlined"
            type="number"
            fullWidth
            inputProps={{ readOnly: true }}
            value={calculateTotalPrice()}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Advance (tk)"
            variant="outlined"
            type="number"
            fullWidth
            value={advance}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              handleChange({ field: "advance", value: +e.target.value })
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Due (tk)"
            variant="outlined"
            type="number"
            fullWidth
            value={calculateTotalPrice() - Number(advance) - Number(discount)}
            inputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
      <div className="py-2 flex justify-content-end">
        <LoadingButton
          variant="contained"
          color="secondary"
          loading={status === STATUS.LOADING}
          onClick={handlePlaceOrderClick}
        >
          অর্ডার করুন 
        </LoadingButton>
      </div>
    </>
  );
};

export default OrderSubmission;
