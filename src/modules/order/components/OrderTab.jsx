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
      <Tab value={NewOrderTabConstant.ProductList} label="Measured Products" />
      <Tab value={NewOrderTabConstant.OrderInfo} label="Order info" />
      <Tab value={NewOrderTabConstant.ProductionCopy} label="Production Copy" />
      <Tab value={NewOrderTabConstant.CustomerCopy} label="Customer Copy" />
    </Tabs>
  );
}
