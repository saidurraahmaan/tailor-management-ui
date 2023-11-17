import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import CustomerCopy from "./components/CustomerCopy";

const OrderCustomerCopy = () => {
  const { id } = useParams();

  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("কাস্টমার কপি");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData && (
        <div>
          <CustomerCopy
            orderNo={responseData.orderNo}
            advance={responseData.advance}
            discount={responseData.discount}
            delivery={responseData.deliveryDate}
            orderDate={responseData.orderDate}
            clothPrice={responseData.clothPrice}
            customerName={responseData.customerName}
            measuredItems={responseData.measuredItems}
          />
        </div>
      )}
    </div>
  );
};

export default OrderCustomerCopy;
