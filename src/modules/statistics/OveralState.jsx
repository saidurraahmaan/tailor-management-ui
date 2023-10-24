import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useOutletContext } from "react-router-dom";
import { APPROUTES } from "../../constants/routes.js";
import { getOrderState } from "./statisticsApi.js";
import { STATUS } from "../../constants/fetch.js";
import "./index.css";
import { dateTimeFormat } from "../../constants/dateTimeFormat.js";
import AppCard from "../../components/patterns/AppCard.jsx";

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
        <AppCard
          title={"আজকের অর্ডার"}
          value={`${statistics.totalOrders} টি`}
        />
        <AppCard
          title={"গত সপ্তাহে মোট অর্ডার"}
          value={`${statistics.totalOrders} টি`}
          onCardClick={() =>
            navigate(
              `${APPROUTES.orderList}?isDelivered=false&tillDate=${dayjs()
                .subtract(7, "day")
                .format(dateTimeFormat.orderGridDate)}`
            )
          }
        />
        <AppCard
          title={"মোট অর্ডার"}
          value={`${statistics.totalOrders} টি`}
          onCardClick={() => navigate(`${APPROUTES.orderList}`)}
        />
        <AppCard
          title={"মোট পেন্ডিং অর্ডার"}
          value={`${statistics.pendingOrders} টি`}
          onCardClick={() =>
            navigate(`${APPROUTES.orderList}?isDelivered=false`)
          }
        />
        <AppCard
          title={"আগামী সপ্তাহে ডেলিভারি"}
          value={`${statistics.nextWeekDelivery} টি`}
          onCardClick={() =>
            navigate(
              `${APPROUTES.orderList}?isDelivered=false&tillDate=${dayjs()
                .add(7, "day")
                .format(dateTimeFormat.orderGridDate)}`
            )
          }
        />
        <AppCard
          title={"মোট ডেলিভারেড অর্ডার"}
          value={`${statistics.deliveredOrders} টি`}
          onCardClick={() =>
            navigate(`${APPROUTES.orderList}?isDelivered=true`)
          }
        />
      </div>
    </div>
  );
};

export default OveralState;
