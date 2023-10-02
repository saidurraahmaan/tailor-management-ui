import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { OrderListDataTable } from "./index";

const OrderList = () => {
  const { setDrawerText } = useOutletContext();

  useEffect(() => {
    setDrawerText("Order List");
  }, [setDrawerText]);

  return (
    <div>
      <OrderListDataTable />
    </div>
  );
};

export default OrderList;
