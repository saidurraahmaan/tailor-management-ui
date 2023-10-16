import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useApiHook from "../../../utils/ApiCustomHook";
import { APIROUTES } from "../../../constants/routes";
import { STATUS } from "../../../constants/fetch";
import CircularWithValueLabel from "../../../components/primitives/CircularLoader";
import DeliveryCopy from "./DeliveryCopy";

const DeliveryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();
  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("Order Delivery");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <>
      {fetchStatus === STATUS.SUCCESS && responseData.isDelivered && (
        <>
          <div className="text-center">অর্ডারটি ডেলিভারি করা হয়েছে।</div>
          <DeliveryCopy
            orderNo={responseData.orderNo}
            measuredItems={responseData.measuredItems}
            advance={responseData.advance}
            delivery={responseData.delivery}
            discount={responseData.discount}
          />
        </>
      )}
      {fetchStatus === STATUS.SUCCESS && !responseData.isDelivered && (
        <div className="flex align-items-center g-2 flex-column">
          <div>এই অর্ডারটি এখনো ডেলিভারি করা হয় নি!!</div>
        </div>
      )}
      <div className="py-2">
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default DeliveryPage;
