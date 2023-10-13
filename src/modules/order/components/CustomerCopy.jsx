import React, { useRef, useLayoutEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import generatePDF from "react-to-pdf";
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
  const [height, setHeight] = useState(0);
  const targetRef = useRef();
  const { orderNo, delivery, measuredItems, advance, discount } =
    useSelector(getOrderReducer);

  useLayoutEffect(() => {
    setHeight(targetRef.current.offsetHeight);
  }, []);
  console.log(height);
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
          <div className="text-center py-2 font-12">
            ডেলিভারি নেওয়ার সময় দয়া করে কপিটি নিয়ে আসবেন
          </div>
        </div>
      </div>
      <div className="flex justify-content-center py-2">
        <Button
          variant="contained"
          onClick={() =>
            generatePDF(targetRef, {
              filename: `customer-copy-${orderNo}.pdf`,
              method: "open",
              page: {
                unit: "px",
                format: [height - 50, height - 250],
                // default is 'portrait'
                orientation: "landscape",
              },
            })
          }
        >
          Download Customer Copy
        </Button>
      </div>
    </div>
  );
};

export default CustomerCopy;
