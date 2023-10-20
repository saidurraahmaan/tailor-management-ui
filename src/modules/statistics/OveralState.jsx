import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { APPROUTES } from "../../constants/routes.js";
import { getOrderState } from "./statisticsApi.js";
import { STATUS } from "../../constants/fetch.js";
import "./index.css";

const OveralState = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    totalAmount: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    status: STATUS.IDLE,
  });

  const handleError = (e) => {
    console.log(e);
    setStatistics((prev) => ({ ...prev, status: STATUS.ERROR }));
  };

  useEffect(() => {
    setDrawerText("Statistics");
  }, [setDrawerText]);

  useEffect(() => {
    const fetch = async () => {
      setStatistics((prev) => ({ ...prev, status: STATUS.LOADING }));
      const response = await getOrderState().catch((e) => handleError(e));
      if (response) {
        const { totalOrders, totalAmount, pendingOrders, deliveredOrders } =
          response.data;
        setStatistics((prev) => ({
          ...prev,
          totalAmount,
          totalOrders,
          pendingOrders,
          deliveredOrders,
          status: STATUS.SUCCESS,
        }));
        console.log({ totalAmount });
      }
    };

    fetch();
  }, []);
  console.log(statistics);
  return (
    <div>
      <div className="flex justify-content-between align-items-center g-2">
        <div className="py-2 flex justify-content-between g-3 align-items-center">
          <div
            className="box-design bg-color-1"
            onClick={() => navigate(`${APPROUTES.orderList}`)}
          >
            <div>মোট অর্ডার</div>
            <div className="text-center">{statistics.totalOrders}</div>
          </div>
          <div
            className="box-design bg-color-3"
            onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=false`)}
          >
            <div>পেন্ডিং অর্ডার</div>
            <div className="text-center">{statistics.pendingOrders}</div>
          </div>
          <div
            className="box-design bg-color-2"
            onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=true`)}
          >
            <div>ডেলিভারেড অর্ডার</div>
            <div className="text-center">{statistics.deliveredOrders}</div>
          </div>
        </div>
        {/* <OrderDeliveryPie data={statisticsObjectPieData(statistics)} /> */}
      </div>
    </div>
  );
};

export default OveralState;
