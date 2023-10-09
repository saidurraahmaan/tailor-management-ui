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
  const { fetchStatus } = useApiHook("get", APIROUTES.getOrderDetailsById(id));
  useEffect(() => {
    setDrawerText("Order Delivery");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      <div className="flex align-items-center g-2 flex-column">
        <div>Are you sure?</div>
        <div>
          <Button variant="contained">Yes</Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
