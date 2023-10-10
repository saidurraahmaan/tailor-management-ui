import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import useApiHook from "../../../utils/ApiCustomHook";
import { APIROUTES } from "../../../constants/routes";
import { STATUS } from "../../../constants/fetch";
import CircularWithValueLabel from "../../../components/primitives/CircularLoader";

const DeliveryPage = () => {
  const { id } = useParams();
  const { setDrawerText } = useOutletContext();
  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  console.log(responseData);

  useEffect(() => {
    setDrawerText("Order Delivery");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData.isDelivered && (
        <div className="flex align-items-center g-2 flex-column">
          <div>অর্ডারটি ডেলিভারি করা হয়েছে।</div>
          <div>
            <Button variant="contained">ডেলিভারি কপি ডাউনলোড করুন</Button>
          </div>
        </div>
      )}
      {fetchStatus === STATUS.SUCCESS && !responseData.isDelivered && (
        <div className="flex align-items-center g-2 flex-column">
          <div>এই অর্ডারটি এখনো ডেলিভারি করা হয় নি!!</div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
