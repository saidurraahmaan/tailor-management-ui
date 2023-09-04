export const prepareNewOrderMeasurementList = (measurements) => {
  let result = [];
  measurements.forEach((element) => {
    result.push({ _id: Date.now(), label: element, value: 0 });
  });
  return result;
};

export const prepareNewOrderDescriptionList = (descriptions) => {
  let result = [];
  descriptions.forEach((element) => {
    result.push({ _id: Date.now(), label: element, value: false });
  });
  return result;
};
