import React, { Fragment } from "react";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const OrderMeasurementProduction = ({
  quantity,
  productName,
  measurements,
  descriptions,
}) => {
  const isAnyTrue = () => {
    let isTrue = false;
    descriptions.forEach((element) => {
      if (element.value) {
        isTrue = true;
      }
    });
    return isTrue;
  };

  return (
    <div className="font-14 py-2">
      <Grid container spacing={2}>
        <Grid xs={6}>
          <span className="font-w-700">অর্ডার আইটেম: </span>
          {productName}
        </Grid>
        <Grid xs={6}>
          <span className="font-w-700">কোয়ান্টিটি: </span>
          <span className="font-16">{quantity}</span>
        </Grid>
      </Grid>
      <div className="py-1 font-w-700">মাপ</div>
      <div className="flex align-items-center g-2 ">
        {measurements.map((ele) => (
          <div className="text-center" key={ele._id}>
            <div className="production-order-item-field">{ele.label}</div>
            <div className="production-order-item-value font-16">{ele.value || 0}</div>
          </div>
        ))}
      </div>
      {isAnyTrue() ? (
        <>
          <div className="pt-2 pb-1 font-w-700">বর্ণনা</div>
          <div className="flex align-items-center g-2 ">
            {descriptions.map((ele) => (
              <Fragment key={ele._id}>
                {ele.value && (
                  <div className="flex align-items-center">
                    <div className="flex align-items-center">
                      <FiberManualRecordRoundedIcon />
                    </div>
                    <div className="flex align-items-center">{ele.label} </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderMeasurementProduction;
