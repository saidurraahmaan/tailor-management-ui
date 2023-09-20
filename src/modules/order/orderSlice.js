import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { STATUS } from "../../constants/fetch";

const initialState = {
  orderNo: 0,
  customerName: "",
  delivery: dayjs(),
  advance: 0,
  mobileNumber: "",
  discount: 0,
  measuredProducts: [],
  status: STATUS.IDLE,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getOrderReducer = (state) => state.order;

export default orderSlice.reducer;
