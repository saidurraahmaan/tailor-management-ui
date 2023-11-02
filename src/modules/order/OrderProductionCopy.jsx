import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import ProductionCopy from "./components/ProductionCopy";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderProductionCopy = () => {
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
          <ProductionCopy
            orderNo={responseData.orderNo}
            orderDate={responseData.orderDate}
            delivery={responseData.deliveryDate}
            customerName={responseData.customerName}
            measuredItems={responseData.measuredItems}
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

export default OrderProductionCopy;
