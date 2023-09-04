import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const addProduct = (data) => {
  return HttpInstance.post(APIROUTES.addProduct, data);
};

export const getUserProductByType = (type) => {
  return HttpInstance.get(APIROUTES.getUserProductByType(type));
};

export const getUserProductById = (id) => {
  return HttpInstance.get(APIROUTES.getUserProductById(id));
};
