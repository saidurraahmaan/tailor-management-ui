import { v4 as uuidv4 } from "uuid";

export const prepareNewOrderMeasurementList = (measurements) => {
  let result = [];
  measurements.forEach((element) => {
    result.push({ _id: uuidv4(), label: element, value: "" });
  });
  return result;
};

export const prepareNewOrderDescriptionList = (descriptions) => {
  let result = [];
  descriptions.forEach((element) => {
    result.push({ _id: uuidv4(), label: element, value: false });
  });
  return result;
};
