import React from "react";
import { Box, TextField } from "@mui/material";
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
      <Grid container spacing={2} alignItems={"center"}>
        {productMeasurements.map((ele) => (
          <Grid key={ele._id} xs={4} sm={3} lg={2}>
            <Box className="py-1 text-center">{ele.label}</Box>

            <TextField
              type={"number"}
              fullWidth
              size="small"
              inputProps={{
                min: "0",
                // style: { textAlign: "center" },
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
