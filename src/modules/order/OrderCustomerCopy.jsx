import React, { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import CustomerCopy from "./components/CustomerCopy";
import { Button } from "@mui/material";

const OrderCustomerCopy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("Order Customer Copy");
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
            delivery={responseData.delivery}
            advance={responseData.advance}
            measuredItems={responseData.measuredItems}
            discount={responseData.discount}
          />
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
    </div>
  );
};

export default OrderCustomerCopy;
