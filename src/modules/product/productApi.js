import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const addProduct = (data) => {
  return HttpInstance.post(APIROUTES.addProduct, data);
};
