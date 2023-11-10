import React, { useRef } from "react";
import { Button, Divider } from "@mui/material";
import {
  CustomerCopyHeader,
  OrderInfoCustomer,
  OrderedItemListCustomer,
} from "../../../components";
import dayjs from "dayjs";
import { measuredItemsToCustomerOrderItems } from "../../../utils/objectConverter";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";
import paidimage from "../../../assets/images/paid.png";
import { useReactToPrint } from "react-to-print";

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
  const targetRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `delivery_copy_${orderNo}`,
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });

  return (
    <>
      <div ref={targetRef}>
        <div className="flex justify-content-center py-2">
          <div className="customer-copy-container wd-100">
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
            <div className="flex justify-content-center">
              <img
                src={paidimage}
                alt="paid-img"
                height={"50px"}
                width={"50px"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-content-center py-2">
        <Button variant="contained" onClick={handlePrint}>
          প্রিন্ট ডেলিভারি কপি
        </Button>
      </div>
    </>
  );
};

export default DeliveryCopy;
