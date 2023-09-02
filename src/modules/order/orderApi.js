import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const getUserProductById = (type) => {
  return HttpInstance.get(APIROUTES.getUserProductByType(type));
};
