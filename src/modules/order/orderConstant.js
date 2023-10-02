import { STATUS } from "../../constants/fetch";

export const newOrderInitialState = {
    orderNo: 0,
    productType: "",
    productList: [],
    selectedProduct: "",
    productFetchStatus: STATUS.IDLE,
    productInfoFetchStatus: STATUS.IDLE,
}

export const orderInfoInitialState = {
    _id: "",
    productName: "",
    productType: "",
    productMeasurements: [],
    productDescriptions: [],
    clothPrice: 0,
    makingCost: 0,
    quantity: 1,
}

export const showingStateInitialState = {
    productType: true,
    productMeasurement: false,
    measurementTabAddBtn: true,
}