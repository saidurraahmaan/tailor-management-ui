import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";

export const fetchUser = () => {
  return HttpInstance.get(APIROUTES.getUser);
};

export const registerUser = (data) => {
  return HttpInstance.post(APIROUTES.register, data);
};

export const loginUser = (credential) => {
  return HttpInstance.post(APIROUTES.login, credential);
};
