import { Button } from "@mui/material";
import React from "react";
import { useRef } from "react";
import generatePDF from "react-to-pdf";

const ProductionCopy = ({ measurementInfo, orderFinalData }) => {
  const targetRef = useRef();
  console.log({ measurementInfo, orderFinalData });
  return (
    <div>
      <div className="flex justify-content-center" ref={targetRef}>
        <div className="production-container">
          <div className="font-primary font-w-700">Hello Saidur</div>
          <div style={{ color: "red" }}>Where are you</div>
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
