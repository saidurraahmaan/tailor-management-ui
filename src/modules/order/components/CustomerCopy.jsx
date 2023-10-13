import React, { useRef } from "react";
import { Divider } from "@mui/material";
// import generatePDF from "react-to-pdf";
import { useSelector } from "react-redux";
import {
  CustomerCopyHeader,
  OrderInfoCustomer,
  OrderedItemListCustomer,
} from "../../../components";
import { getOrderReducer } from "../orderSlice";
import dayjs from "dayjs";
import { measuredItemsToCustomerOrderItems } from "../../../utils/objectConverter";

const CustomerCopy = () => {
  const targetRef = useRef();
  const { orderNo, delivery, measuredItems, advance, discount } =
    useSelector(getOrderReducer);

  return (
    <div>
      <div className="flex justify-content-center" ref={targetRef}>
        <div className="customer-copy-container wd-100">
          <CustomerCopyHeader />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: "8px" }} />
          <OrderInfoCustomer
            orderNo={orderNo}
            deliveryDate={dayjs(delivery).format("D MMM YYYY")}
            orderDate={dayjs().format("D MMM YYYY")}
          />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: "8px" }} />
          <OrderedItemListCustomer
            advance={advance}
            discount={discount}
            orderedItems={measuredItemsToCustomerOrderItems(measuredItems)}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerCopy;
