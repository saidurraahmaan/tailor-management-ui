import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { STATUS } from "../../constants/fetch";
import { placeNewOrder } from "./orderApi";

const initialState = {
  orderNo: 0,
  customerName: "",
  delivery: dayjs(),
  advance: 0,
  mobileNumber: "",
  discount: 0,
  measuredItems: [],
  status: STATUS.IDLE,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrderField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeNewOrder.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(placeNewOrder.fulfilled, (state) => {
        state.orderNo = initialState.orderNo;
        state.customerName = initialState.customerName;
        state.advance = initialState.advance;
        state.delivery = initialState.delivery;
        state.measuredItems = initialState.measuredItems;
        state.mobileNumber = initialState.mobileNumber;
        state.discount = initialState.discount;
        state.status = STATUS.SUCCESS;
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload.message;
      });
  },
});

export const getOrderReducer = (state) => state.order;
export const { updateOrderField } = orderSlice.actions;

export default orderSlice.reducer;
