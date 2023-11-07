import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { STATUS } from "../../constants/fetch";
import { placeNewOrder } from "./orderApi";

const initialState = {
  orderNo: 0,
  advance: 0,
  customerName: "",
  discount: 0,
  clothPrice: 0,
  delivery: dayjs(),
  mobileNumber: "",
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
    updateOrderStates(state, action) {
      const {
        orderNo,
        advance,
        customerName,
        discount,
        clothPrice,
        delivery,
        mobileNumber,
        measuredItems,
      } = action.payload;

      state.orderNo = orderNo;
      state.advance = advance;
      state.discount = discount;
      state.delivery = dayjs(delivery);
      state.clothPrice = clothPrice;
      state.customerName = customerName;
      state.mobileNumber = mobileNumber;
      state.measuredItems = measuredItems;
    },
    resetOrderSlice(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeNewOrder.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(placeNewOrder.fulfilled, (state) => {
        state.orderNo = initialState.orderNo;
        state.advance = initialState.advance;
        state.delivery = initialState.delivery;
        state.discount = initialState.discount;
        state.clothPrice = initialState.clothPrice;
        state.mobileNumber = initialState.mobileNumber;
        state.customerName = initialState.customerName;
        state.measuredItems = initialState.measuredItems;
        state.status = STATUS.SUCCESS;
      })
      .addCase(placeNewOrder.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload.message;
      });
  },
});

export const getOrderReducer = (state) => state.order;
export const { updateOrderField, resetOrderSlice, updateOrderStates } =
  orderSlice.actions;

export default orderSlice.reducer;
