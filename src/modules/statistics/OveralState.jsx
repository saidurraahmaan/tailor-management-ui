import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useOutletContext } from "react-router-dom";
import { APPROUTES } from "../../constants/routes.js";
import { getOrderState } from "./statisticsApi.js";
import { STATUS } from "../../constants/fetch.js";
import "./index.css";
import { dateTimeFormat } from "../../constants/dateTimeFormat.js";

const OveralState = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    totalAmount: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    nextWeekDelivery: 0,
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
        const {
          totalOrders,
          totalAmount,
          pendingOrders,
          deliveredOrders,
          nextWeekDelivery,
        } = response.data;
        setStatistics((prev) => ({
          ...prev,
          totalAmount,
          totalOrders,
          pendingOrders,
          deliveredOrders,
          nextWeekDelivery,
          status: STATUS.SUCCESS,
        }));
        console.log({ totalAmount });
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <div className="py-2 flex justify-content-center g-3 align-items-center flex-wrap">
        <div
          className="box-design bg-color-1"
          onClick={() => navigate(`${APPROUTES.orderList}`)}
        >
          <div>মোট অর্ডার</div>
          <div className="font-14 pt-4px">{statistics.totalOrders} টি</div>
        </div>
        <div
          className="box-design bg-color-3"
          onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=false`)}
        >
          <div>পেন্ডিং অর্ডার</div>
          <div className="font-14 pt-4px">{statistics.pendingOrders} টি</div>
        </div>
        <div
          className="box-design bg-color-2"
          onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=true`)}
        >
          <div>ডেলিভারেড অর্ডার</div>
          <div className="font-14 pt-4px">{statistics.deliveredOrders} টি</div>
        </div>
        <div
          className="box-design bg-color-2"
          onClick={() =>
            navigate(
              `${APPROUTES.orderList}?isDelivered=false&tillDate=${dayjs()
                .add(7, "day")
                .format(dateTimeFormat.orderGridDate)}`
            )
          }
        >
          <div>আগামী সপ্তাহে ডেলিভারি </div>
          <div className="font-14 pt-4px">{statistics.nextWeekDelivery} টি</div>
        </div>
        <div
          className="box-design bg-color-4"
          onClick={() => navigate(`${APPROUTES.orderList}`)}
        >
          <div>মোট আয়</div>
          <div className="font-14 pt-4px">{statistics.totalAmount} টাকা</div>
        </div>
      </div>
    </div>
  );
};

export default OveralState;
