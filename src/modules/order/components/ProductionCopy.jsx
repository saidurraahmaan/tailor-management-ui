import React from "react";
import dayjs from "dayjs";
import { usePDF } from "react-to-pdf";
import { useSelector } from "react-redux";
import { Button, Divider } from "@mui/material";
import {
  ProductionCopyHeader,
  OrderInfoProduction,
  OrderMeasurementProduction,
} from "../../../components";
import { getOrderReducer } from "../orderSlice";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";

const ProductionCopy = () => {
  const { orderNo, delivery, measuredItems } = useSelector(getOrderReducer);
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
          Preview Production Copy
        </Button>
      </div>
    </div>
  );
};

export default ProductionCopy;
