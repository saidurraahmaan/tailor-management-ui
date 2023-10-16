import React, { useRef, useLayoutEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import generatePDF from "react-to-pdf";
import {
  CustomerCopyHeader,
  OrderedItemListCustomer,
} from "../../../components";
import dayjs from "dayjs";
import { measuredItemsToCustomerOrderItems } from "../../../utils/objectConverter";
import { dateTimeFormat } from "../../../constants/dateTimeFormat";
import paidimage from "../../../assets/images/paid.png";

const DeliveryCopy = ({
  orderNo,
  delivery,
  measuredItems,
  advance,
  discount,
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
          <Grid className="font-12" container spacing={2}>
            <Grid xs={6}>
              <span className="font-w-700">অর্ডার নং: </span>
              {orderNo}
            </Grid>
            <Grid xs={6}>
              <span className="font-w-700">তারিখ: </span>
              {dayjs(delivery).format(dateTimeFormat.invoiceDate)}
            </Grid>
          </Grid>
          <Divider sx={{ backgroundColor: "aqua", marginBlock: 1 }} />
          <OrderedItemListCustomer
            advance={advance}
            discount={discount}
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
                orientation: "landscape",
              },
            })
          }
        >
          ডেলিভারি কপি দেখুন
        </Button>
      </div>
    </div>
  );
};

export default DeliveryCopy;
