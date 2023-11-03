import React from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const MeasurementFields = ({ orderInfo, setOrderInfo }) => {
  const { productMeasurements } = orderInfo;

  const handleChange = (value, id) => {
    const updatedMeasurements = productMeasurements.map((measurement) =>
      measurement._id === id ? { ...measurement, value } : measurement
    );

    setOrderInfo({ ...orderInfo, productMeasurements: updatedMeasurements });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} alignItems={"center"}>
        {productMeasurements.map((ele) => (
          <Grid key={ele._id} xs={3} sm={2} lg={1}>
            <div className="text-center py-1">{ele.label}</div>
            <TextField
              type={"number"}
              size="small"
              inputProps={{
                min: "0",
                style: { padding: "4px 12px", textAlign: "center" },
              }}
              value={ele.value}
              onChange={(e) => handleChange(+e.target.value, ele._id)}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default MeasurementFields;
