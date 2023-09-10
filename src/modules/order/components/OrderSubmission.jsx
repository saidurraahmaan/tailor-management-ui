import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { STATUS } from "../../../constants/fetch";
import ResponsiveCalendar from "../../../components/patterns/ResponsiveCalendar";
import dayjs from "dayjs";

const OrderSubmission = ({ measurementInfo }) => {
  const [orderFinalData, setOrderFinalData] = useState({
    quantity: 1,
    delivery: dayjs(),
    makingCost: 0,
    advance: 0,
    mobileNumber: "",
    customerName: "",
    discount: 0,
    clothPrice: 0,
    status: STATUS.IDLE,
  });
  const calculateTotalPrice = () => {
    const totalCost =
      Number(orderFinalData.makingCost) + Number(orderFinalData.clothPrice);

    const afterQuantity = Number(totalCost) * Number(orderFinalData.quantity);

    const discountAmount =
      (Number(orderFinalData.discount) / 100) * afterQuantity;

    return afterQuantity - discountAmount;
  };

  return (
    <>
      <Grid container spacing={4} mt={2}>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Customer Name"
            variant="outlined"
            fullWidth
            value={orderFinalData.customerName}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
                ...prev,
                customerName: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={orderFinalData.mobileNumber}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
                ...prev,
                mobileNumber: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <ResponsiveCalendar
            label={"Delivery Date"}
            value={orderFinalData.delivery}
            handleChange={(date) =>
              setOrderFinalData((prev) => ({ ...prev, delivery: date }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Cloth Price"
            variant="outlined"
            type="number"
            fullWidth
            value={orderFinalData.clothPrice}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
                ...prev,
                clothPrice: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Making Cost"
            variant="outlined"
            type="number"
            fullWidth
            value={orderFinalData.makingCost}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
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
            fullWidth
            value={orderFinalData.quantity}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Discount (%)"
            variant="outlined"
            type="number"
            fullWidth
            inputProps={{ min: "0", max: "100" }}
            value={orderFinalData.discount}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 2);
            }}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
                ...prev,
                discount: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Total Price"
            variant="outlined"
            type="number"
            fullWidth
            inputProps={{ readOnly: true }}
            value={calculateTotalPrice()}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Advance"
            variant="outlined"
            type="number"
            fullWidth
            value={orderFinalData.advance}
            inputProps={{ min: "0" }}
            onChange={(e) =>
              setOrderFinalData((prev) => ({
                ...prev,
                advance: e.target.value,
              }))
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Due"
            variant="outlined"
            type="number"
            fullWidth
            value={calculateTotalPrice() - Number(orderFinalData.advance)}
            inputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
      <div className="py-2 flex justify-content-end">
        <Button variant="contained" color="secondary">
          Place the order
        </Button>
      </div>
    </>
  );
};

export default OrderSubmission;
