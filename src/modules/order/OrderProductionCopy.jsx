import React, { useEffect } from "react";
import {  useOutletContext, useParams } from "react-router-dom";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import ProductionCopy from "./components/ProductionCopy";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderProductionCopy = () => {
  const { id } = useParams();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("প্রোডাকশন কপি");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData && (
        <div>
          <ProductionCopy
            orderNo={responseData.orderNo}
            orderDate={responseData.orderDate}
            delivery={responseData.deliveryDate}
            customerName={responseData.customerName}
            measuredItems={responseData.measuredItems}
          />
        </div>
      )}
 
    </div>
  );
};

export default OrderProductionCopy;
