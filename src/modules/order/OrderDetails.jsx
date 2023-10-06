import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderDetails = () => {
  const { setDrawerText } = useOutletContext();
  const { id } = useParams();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("Order Details");
  }, [setDrawerText]);
  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }
  return <div>{fetchStatus === STATUS.SUCCESS && responseData}</div>;
};

export default OrderDetails;
