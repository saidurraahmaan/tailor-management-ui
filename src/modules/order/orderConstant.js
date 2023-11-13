import { STATUS } from "../../constants/fetch";

export const newOrderInitialState = {
  orderNo: 0,
  productType: "",
  productList: [],
  selectedProduct: "",
  productFetchStatus: STATUS.IDLE,
  productInfoFetchStatus: STATUS.IDLE,
};

export const orderInfoInitialState = {
  _id: "",
  productName: "",
  productType: "",
  productMeasurements: [],
  productDescriptions: [],
  makingCost: "",
  quantity: "",
};

export const showingStateInitialState = {
  productType: true,
  productMeasurement: false,
  measurementTabAddBtn: true,
};

export const showingStateInitialStateEdit = {
  productType: false,
  productMeasurement: false,
  measurementTabAddBtn: true,
};
