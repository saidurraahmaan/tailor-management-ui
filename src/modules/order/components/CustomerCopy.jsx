import React, { useRef } from "react";
import { Button, Divider } from "@mui/material";
import { useReactToPrint } from "react-to-print";
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
  const targetRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `customer_copy_${orderNo}`,
    onAfterPrint: () => console.log("Printed PDF successfully!"),
  });

  return (
    <>
      <div ref={targetRef}>
        <div className="flex justify-content-center pt-2">
          <div className="customer-copy-container wd-100">
            <CustomerCopyHeader />
            <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
            <OrderInfoCustomer
              orderNo={orderNo}
              orderDate={dayjs(orderDate).format(dateTimeFormat.invoiceDate)}
              deliveryDate={dayjs(delivery).format(dateTimeFormat.invoiceDate)}
              customerName={customerName}
            />
            <Divider sx={{ marginBlock: 1 }} />
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
      </div>
      <div className="flex justify-content-center py-2">
        <Button variant="contained" onClick={handlePrint}>
          কাস্টমার কপি প্রিন্ট করুন
        </Button>
      </div>
    </>
  );
};

export default CustomerCopy;
