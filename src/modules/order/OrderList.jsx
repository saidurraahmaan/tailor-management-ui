import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { OrderListDataTable } from "./index";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderList = () => {
  const { setDrawerText } = useOutletContext();
  let apiRoute = APIROUTES.placeOrder;

  let [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");

  if (queryString) {
    apiRoute += "?" + queryString;
  }

  const { fetchStatus, responseData } = useApiHook("get", apiRoute);
  const [width, setWidth] = useState(0);
  const targetRef = useRef();

  useEffect(() => {
    setDrawerText("Order List");
  }, [setDrawerText]);

  useEffect(() => {
    setWidth(Math.floor(targetRef.current.offsetWidth / 8.1));
  }, []);

  if (fetchStatus === STATUS.LOADING) return <CircularWithValueLabel />;

  if (fetchStatus === STATUS.ERROR)
    return (
      <>
        <div className="text-center">
          দুঃখিত আপনি যা খুঁজছেন তা পাওয়া যায় নি
        </div>
        <div className="text-center">
          <WarningAmberIcon color="error" fontSize="large" />
        </div>
        <div className="text-center">দয়া করে আবার চেষ্টা করুন</div>
      </>
    );

  return (
    <div className="order-list-container" ref={targetRef}>
      {fetchStatus === STATUS.SUCCESS && (
        <OrderListDataTable orderDataList={responseData} mxWidth={width} />
      )}
    </div>
  );
};

export default OrderList;
