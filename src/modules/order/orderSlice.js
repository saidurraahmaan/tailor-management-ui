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
  extraReducers: (builder) => {},
});

export const getOrderReducer = (state) => state.order;
export const { updateOrderField } = orderSlice.actions;

export default orderSlice.reducer;
