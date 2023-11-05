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
    <>
      <div ref={targetRef}>
        <div className="flex justify-content-center my-1">
          <div className="production-container wd-100">
            <ProductionCopyHeader />
            <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
            <OrderInfoProduction
              orderNo={orderNo}
              deliveryDate={dayjs(delivery).format(dateTimeFormat.invoiceDate)}
              orderDate={dayjs(orderDate).format(dateTimeFormat.invoiceDate)}
              customerName={customerName}
            />
            <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
            {measuredItems.map((ele) => (
              <React.Fragment key={ele._id}>
                <OrderMeasurementProduction
                  productName={ele.productName}
                  quantity={ele.quantity}
                  measurements={ele.productMeasurements}
                  descriptions={ele.productDescriptions}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-content-center py-2">
        <Button variant="contained" onClick={toPDF}>
          প্রোডাকশন কপি প্রিন্ট করুন
        </Button>
      </div>
    </>
  );
};

export default ProductionCopy;
