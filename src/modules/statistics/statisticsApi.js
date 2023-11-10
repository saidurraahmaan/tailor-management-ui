import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const getOrderState = () => {
  return HttpInstance.get(APIROUTES.orderState);
};

export const getRangeState = (url) => {
  return HttpInstance.get(url);
};
