import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NewOrderTabConstant } from "../../../constants/application";

export default function OrderTab({ value, setValue, setShowingState }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowingState((prev) => ({
      ...prev,
      productType: false,
      measurementTabAddBtn: true,
      productMeasurement: false,
    }));
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
    >
      <Tab
        className={`${
          value !== NewOrderTabConstant.ProductList ? "tab-btn-color" : ""
        }`}
        value={NewOrderTabConstant.ProductList}
        label="Measured Products"
      />
      <Tab
        className={`${
          value !== NewOrderTabConstant.OrderInfo ? "tab-btn-color" : ""
        }`}
        value={NewOrderTabConstant.OrderInfo}
        label="Order info"
      />
      <Tab
        className={`${
          value !== NewOrderTabConstant.ProductionCopy ? "tab-btn-color" : ""
        }`}
        value={NewOrderTabConstant.ProductionCopy}
        label="Production Copy"
      />
      <Tab
        className={`${
          value !== NewOrderTabConstant.CustomerCopy ? "tab-btn-color" : ""
        }`}
        value={NewOrderTabConstant.CustomerCopy}
        label="Customer Copy"
      />
    </Tabs>
  );
}
