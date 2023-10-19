import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { APPROUTES } from "../../constants/routes.js";
import { OrderDeliveryPie } from "./index.js";
import "./index.css";

const OveralState = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  useEffect(() => {
    setDrawerText("Statistics");
  }, [setDrawerText]);

  return (
    <div>
      <div className="flex justify-content-between align-items-center g-2">
        <div className="py-2 flex justify-content-between g-3 align-items-center">
          <div
            className="box-design bg-color-1"
            onClick={() => navigate(`${APPROUTES.orderList}`)}
          >
            <div>মোট অর্ডার</div>
            <div className="text-center">0</div>
          </div>
          <div
            className="box-design bg-color-3"
            onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=false`)}
          >
            <div>পেন্ডিং অর্ডার</div>
            <div className="text-center">0</div>
          </div>
          <div
            className="box-design bg-color-2"
            onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=true`)}
          >
            <div>ডেলিভারেড অর্ডার</div>
            <div className="text-center">0</div>
          </div>
        </div>
        <OrderDeliveryPie />
      </div>
    </div>
  );
};

export default OveralState;
