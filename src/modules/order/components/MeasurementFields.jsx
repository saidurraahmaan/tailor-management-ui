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
      {productMeasurements.map((ele) => (
        <Grid key={ele._id} container spacing={3} alignItems={"center"}>
          <Grid xs={6} sm={5} lg={4}>
            {ele.label}
          </Grid>
          <Grid xs={6} sm={5} lg={4}>
            <TextField
              type={"number"}
              size="small"
              inputProps={{
                style: { padding: "4px 12px", textAlign: "center" },
              }}
              value={ele.value}
              onChange={(e) => handleChange(e.target.value, ele._id)}
            />
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default MeasurementFields;
