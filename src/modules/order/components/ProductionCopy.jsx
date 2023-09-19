import { Button, Divider } from "@mui/material";
import React from "react";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import { InvoiceHeader, OrderCustomerInfo } from "../../../components";

const ProductionCopy = ({ measurementInfo, orderFinalData }) => {
  const targetRef = useRef();
  console.log({ measurementInfo, orderFinalData });
  return (
    <div>
      <div className="flex justify-content-center" ref={targetRef}>
        <div className="production-container wd-100">
          <InvoiceHeader />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: "8px" }} />
          <OrderCustomerInfo />
        </div>
      </div>
      <div className="flex justify-content-center py-2">
        <Button
          onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
        >
          Download Production Copy
        </Button>
      </div>
    </div>
  );
};

export default ProductionCopy;
