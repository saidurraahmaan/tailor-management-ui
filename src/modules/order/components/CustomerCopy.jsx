import React, { useRef, useLayoutEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import generatePDF from "react-to-pdf";
import {
  CustomerCopyHeader,
  OrderInfoCustomer,
  OrderedItemListCustomer,
} from "../../../components";
import dayjs from "dayjs";
import { measuredItemsToCustomerOrderItems } from "../../../utils/objectConverter";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";

const CustomerCopy = ({
  orderNo,
  delivery,
  advance,
  discount,
  orderDate,
  clothPrice,
  customerName,
  measuredItems,
}) => {
  const [height, setHeight] = useState(0);
  const targetRef = useRef();

  useLayoutEffect(() => {
    setHeight(targetRef.current.offsetHeight);
  }, []);

  return (
    <div>
      <div className="flex justify-content-center" ref={targetRef}>
        <div className="customer-copy-container wd-100">
          <CustomerCopyHeader />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
          <OrderInfoCustomer
            orderNo={orderNo}
            orderDate={dayjs(orderDate).format(dateTimeFormat.invoiceDate)}
            deliveryDate={dayjs(delivery).format(dateTimeFormat.invoiceDate)}
            customerName={customerName}
          />
          <Divider sx={{  marginBlock: 1 }} />
          <OrderedItemListCustomer
            advance={advance}
            discount={discount}
            clothPrice={clothPrice}
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
          কাস্টমার কপি প্রিন্ট করুন
        </Button>
      </div>
    </div>
  );
};

export default CustomerCopy;
