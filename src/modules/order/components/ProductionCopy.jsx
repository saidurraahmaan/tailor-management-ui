import React from "react";
import dayjs from "dayjs";
import { usePDF } from "react-to-pdf";
import { Button, Divider } from "@mui/material";
import {
  ProductionCopyHeader,
  OrderInfoProduction,
  OrderMeasurementProduction,
} from "../../../components";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";

const ProductionCopy = ({
  orderNo,
  delivery,
  orderDate,
  measuredItems,

  customerName,
}) => {
  const { toPDF, targetRef } = usePDF({
    method: "open",
    filename: "multipage-example.pdf",
  });
  
  return (
    <div>
      <div ref={targetRef}>
        {measuredItems.map((ele) => (
          <div className="flex justify-content-center" key={ele._id}>
            <div className="production-container wd-100">
              <ProductionCopyHeader />
              <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
              <OrderInfoProduction
                orderNo={orderNo}
                productName={ele.productName}
                quantity={ele.quantity}
                deliveryDate={dayjs(delivery).format(
                  dateTimeFormat.invoiceDate
                )}
                orderDate={dayjs(orderDate).format(dateTimeFormat.invoiceDate)}
                customerName={customerName}
              />
              <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
              <OrderMeasurementProduction
                measurements={ele.productMeasurements}
                descriptions={ele.productDescriptions}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-content-center py-2">
        <Button variant="contained" onClick={toPDF}>
          প্রোডাকশন কপি প্রিন্ট করুন
        </Button>
      </div>
    </div>
  );
};

export default ProductionCopy;
