import React, { useEffect } from "react";
import {  useOutletContext, useParams } from "react-router-dom";
import useApiHook from "../../utils/ApiCustomHook";
import { APPROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import CustomerCopy from "./components/CustomerCopy";

const OrderCustomerCopy = () => {
  const { id } = useParams();
//   const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APPROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("Order Details");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData && (
        <div>
          <CustomerCopy />
        </div>
      )}
    </div>
  );
};

export default OrderCustomerCopy;
