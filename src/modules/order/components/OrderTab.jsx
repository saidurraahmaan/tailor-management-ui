import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NewOrderTabConstant } from "../../../constants/application";

export default function OrderTab({ value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
    >
      <Tab value={NewOrderTabConstant.Measurement} label="Measurements" />
      <Tab value={NewOrderTabConstant.OrderInfo} label="Order info" />
    </Tabs>
  );
}
