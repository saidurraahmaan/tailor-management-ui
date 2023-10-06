import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../constants/fetch";
import { getUserOrderList } from "./orderApi";

const initialState = {
  orderList: [],
  status: STATUS.IDLE,
  error: null,
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrderList.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getUserOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload;
      })
      .addCase(getUserOrderList.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.orderList = [];
        state.error = action.payload;
      });
  },
});

export default orderListSlice.reducer;
