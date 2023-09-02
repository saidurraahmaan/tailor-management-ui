import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OrderList = () => {
  const { setDrawerText } = useOutletContext();

  useEffect(() => {
    setDrawerText("Order List");
  }, [setDrawerText]);

  return <div>OrderList</div>;
};

export default OrderList;
