import React, { Fragment } from "react";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const OrderMeasurementProduction = ({ measurements, descriptions }) => {
  return (
    <div className="font-12">
      <div className="pt-2 pb-1 font-w-700">মাপ</div>
      <div className="flex align-items-center g-2 ">
        {measurements.map((ele) => (
          <div className="text-center" key={ele._id}>
            <div className="production-order-item-field">{ele.label}</div>
            <div className="production-order-item-value">{ele.value || 0}</div>
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default OrderMeasurementProduction;