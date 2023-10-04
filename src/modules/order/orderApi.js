import { createAsyncThunk } from "@reduxjs/toolkit";
import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const getOrderNo = () => {
  return HttpInstance.get(APIROUTES.getOrderNo);
};

export const newOrder = (order) => {
  return HttpInstance.post(APIROUTES.placeOrder, order);
};

export const userOrderList = () => {
  return HttpInstance.get(APIROUTES.placeOrder);
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

export const getUserOrderList = createAsyncThunk(
  "order/getUserOrders",
  async ({ rejectWithValue }) => {
    try {
      const { data } = await userOrderList();
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
