import React, { useRef } from "react";
import { Button, Divider } from "@mui/material";
import generatePDF from "react-to-pdf";
import { ProductionCopyHeader, OrderInfoProduction } from "../../../components";

const ProductionCopy = () => {
  const targetRef = useRef();

  return (
    <div>
      <div className="flex justify-content-center" ref={targetRef}>
        <div className="production-container wd-100">
          <ProductionCopyHeader />
          <Divider sx={{ backgroundColor: "aqua", marginBlock: "8px" }} />
          <OrderInfoProduction />
        </div>
      </div>
      <div className="flex justify-content-center py-2">
        <Button
          variant="contained"
          onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
        >
          Download Production Copy
        </Button>
      </div>
    </div>
  );
};

export default ProductionCopy;
