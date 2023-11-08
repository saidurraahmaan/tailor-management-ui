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
import paidimage from "../../../assets/images/paid.png";

const DeliveryCopy = ({
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
      <div className="flex justify-content-center py-2" >
        <div className="customer-copy-container wd-100" ref={targetRef}>
          <CustomerCopyHeader />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
          <OrderInfoCustomer
            orderNo={orderNo}
            orderDate={dayjs(orderDate).format(dateTimeFormat.invoiceDate)}
            deliveryDate={dayjs(delivery).format(dateTimeFormat.invoiceDate)}
            customerName={customerName}
          />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
          <OrderedItemListCustomer
            advance={advance}
            discount={discount}
            clothPrice={clothPrice}
            orderedItems={measuredItemsToCustomerOrderItems(measuredItems)}
          />
          <div className="py-2 flex justify-content-center">
            <img
              src={paidimage}
              alt="paid-img"
              height={"50px"}
              width={"50px"}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-content-center py-2">
        <Button
          variant="contained"
          onClick={() =>
            generatePDF(targetRef, {
              filename: `delivery-copy-${orderNo}.pdf`,
              method: "open",
              page: {
                unit: "px",
                format: [height - 50, height - 250],
                // default is 'portrait'
                // orientation: "landscape",
              },
            })
          }
        >
          প্রিন্ট ডেলিভারি কপি
        </Button>
      </div>
    </div>
  );
};

export default DeliveryCopy;
