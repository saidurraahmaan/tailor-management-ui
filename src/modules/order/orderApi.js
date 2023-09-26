import HttpInstance from "../../config/axiosClient";
import { APIROUTES } from "../../constants/routes";


export const getOrderNo = () => {
    return HttpInstance.get(APIROUTES.getOrderNo);
}