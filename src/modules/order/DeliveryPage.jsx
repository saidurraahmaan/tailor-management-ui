import React, { useEffect } from "react";

import { useOutletContext, useParams } from "react-router-dom";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import DeliveryCopy from "./components/DeliveryCopy";

const DeliveryPage = () => {
  const { id } = useParams();

  const { setDrawerText } = useOutletContext();
  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("অর্ডার ডেলিভারি");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }
  // console.log(responseData)
  return (
    <>
      {fetchStatus === STATUS.SUCCESS && responseData.isDelivered && (
        <>
          <div className="text-center">অর্ডারটি ডেলিভারি করা হয়েছে।</div>
          <DeliveryCopy
            clothPrice={responseData.clothPrice}
            orderNo={responseData.orderNo}
            orderDate={responseData.orderDate}
            measuredItems={responseData.measuredItems}
            advance={responseData.advance}
            delivery={responseData.finalDelivery}
            customerName={responseData.customerName}
            discount={responseData.discount}
          />
        </>
      )}
      {fetchStatus === STATUS.SUCCESS && !responseData.isDelivered && (
        <div className="flex align-items-center g-2 flex-column">
          <div>এই অর্ডারটি এখনো ডেলিভারি করা হয় নি!!</div>
        </div>
      )}
    </>
  );
};

export default DeliveryPage;
