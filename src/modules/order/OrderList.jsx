import React, { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OrderListDataTable } from "./index";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderList = () => {
  const { setDrawerText } = useOutletContext();
  const { fetchStatus, responseData, error } = useApiHook(
    "get",
    APIROUTES.placeOrder
  );
  const [width, setWidth] = useState(0);
  const targetRef = useRef();

  useEffect(() => {
    setDrawerText("Order List");
  }, [setDrawerText]);

  useEffect(() => {
    setWidth(Math.floor(targetRef.current.offsetWidth / 8.4));
  }, []);

  if (fetchStatus === STATUS.LOADING) return <CircularWithValueLabel />;

  return (
    <div className="order-list-container" ref={targetRef}>
      {fetchStatus === STATUS.SUCCESS && (
        <OrderListDataTable orderDataList={responseData} mxWidth={width} />
      )}
    </div>
  );
};

export default OrderList;
