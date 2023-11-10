import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useOutletContext } from "react-router-dom";
import { APPROUTES } from "../../constants/routes.js";
import { getOrderState } from "./statisticsApi.js";
import { STATUS } from "../../constants/fetch.js";
import { dateTimeFormat } from "../../constants/dateTimeFormat.js";
import "./index.css";
import LastThirtyDayOrderCountBar from "./components/LastThirtyDayOrderCountBar.jsx";
import CostAccordion from "./components/CostAccordion.jsx";

const OveralState = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    totalAmount: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    nextWeekDelivery: 0,
    todayTotalOrder: 0,
    lastWeekTotalOrder: 0,
    lastThirtyDayOrderList: [],
    status: STATUS.IDLE,
  });

  const handleError = (e) => {
    console.log(e);
    setStatistics((prev) => ({ ...prev, status: STATUS.ERROR }));
  };

  useEffect(() => {
    setDrawerText("পরিসংখ্যান");
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
          todayTotalOrder,
          lastWeekTotalOrder,
          lastThirtyDayOrderList,
        } = response.data;
        setStatistics((prev) => ({
          ...prev,
          totalAmount,
          totalOrders,
          pendingOrders,
          deliveredOrders,
          nextWeekDelivery,
          todayTotalOrder,
          lastWeekTotalOrder,
          lastThirtyDayOrderList,
          status: STATUS.SUCCESS,
        }));
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <div className="py-2  flex  g-3 align-items-center flex-wrap">
        <div
          className="box-design bg-color-1"
          onClick={() =>
            navigate(
              `${APPROUTES.orderList}?orderDate=${dayjs().format(
                dateTimeFormat.orderGridDate
              )}`
            )
          }
        >
          <div>আজকে মোট অর্ডার</div>
          <div>{statistics.todayTotalOrder} টি</div>
        </div>
        <div
          className="box-design bg-color-2"
          onClick={() =>
            navigate(
              `${APPROUTES.orderList}?orderFromDate=${dayjs()
                .subtract(7, "day")
                .format(dateTimeFormat.orderGridDate)}&orderTillDate=${dayjs()
                .subtract(1, "day")
                .format(dateTimeFormat.orderGridDate)}`
            )
          }
        >
          <div>গত সপ্তাহে মোট অর্ডার</div>
          <div>{statistics.lastWeekTotalOrder} টি</div>
        </div>

        <div
          className="box-design bg-color-3"
          onClick={() => navigate(`${APPROUTES.orderList}`)}
        >
          <div>মোট অর্ডার</div>
          <div>{statistics.totalOrders} টি</div>
        </div>
        <div
          className="box-design bg-color-7"
          onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=false`)}
        >
          <div>মোট পেন্ডিং ডেলিভারি</div>
          <div>{statistics.pendingOrders} টি</div>
        </div>
        <div
          className="box-design bg-color-4"
          onClick={() =>
            navigate(
              `${
                APPROUTES.orderList
              }?isDelivered=false&deliveryTillDate=${dayjs()
                .add(7, "day")
                .format(dateTimeFormat.orderGridDate)}`
            )
          }
        >
          <div>আগামী সপ্তাহে ডেলিভারি</div>
          <div>{statistics.nextWeekDelivery} টি</div>
        </div>
        <div
          className="box-design bg-color-5"
          onClick={() => navigate(`${APPROUTES.orderList}?isDelivered=true`)}
        >
          <div>মোট ডেলিভারেড অর্ডার</div>
          <div>{statistics.deliveredOrders} টি</div>
        </div>
        <div
          className="box-design bg-color-6"
          onClick={() => navigate(`${APPROUTES.orderList}`)}
        >
          <div>মোট আয়</div>
          <div>{statistics.totalAmount} টাকা</div>
        </div>
      </div>
      <CostAccordion />
      {statistics.status === STATUS.SUCCESS && (
        <LastThirtyDayOrderCountBar data={statistics.lastThirtyDayOrderList} />
      )}
    </div>
  );
};

export default OveralState;
