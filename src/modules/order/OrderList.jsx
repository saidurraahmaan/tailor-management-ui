import React, { useEffect } from "react";
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

  useEffect(() => {
    setDrawerText("Order List");
  }, [setDrawerText]);

  console.log({ fetchStatus, responseData, error });

  if (fetchStatus === STATUS.LOADING) return <CircularWithValueLabel />;

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && (
        <OrderListDataTable orderDataList={responseData} />
      )}
    </div>
  );
};

export default OrderList;
