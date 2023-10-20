import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const getOrderState = () => {
  return HttpInstance.get(APIROUTES.orderState);
};
