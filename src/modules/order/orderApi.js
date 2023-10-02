import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const getOrderNo = () => {
  return HttpInstance.get(APIROUTES.getOrderNo);
};

export const newOrder = (order) => {
  return HttpInstance.post(APIROUTES.placeOrder, order);
};

export const placeNewOrder = createAsyncThunk(
  "order/placeNewOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await newOrder(order);
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
