import React from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DescriptionBoxes from "./DescriptionBoxes";
import MeasurementFields from "./MeasurementFields";

const MeasurementTab = ({ orderInfo, setOrderInfo }) => {
  return (
    <div>
      <div className="flex align-items-start g-3 py-1">
        <div className="wd-30">
          <MeasurementFields
            orderInfo={orderInfo}
            setOrderInfo={setOrderInfo}
          />
        </div>
        <div className="wd-70">
          <DescriptionBoxes orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
        </div>
      </div>
      <Grid container spacing={2} className='py-2'>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Cloth Price"
            variant="outlined"
            type="number"
            // fullWidth
            value={orderInfo.clothPrice}
            inputProps={{ min: "0" }}
            onChange={(e) =>
                setOrderInfo((prev) => ({
                ...prev,
                clothPrice: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TextField
            label="Making Cost"
            variant="outlined"
            type="number"
            
            value={orderInfo.makingCost}
            inputProps={{ min: "0" }}
            onChange={(e) =>
                setOrderInfo((prev) => ({
                ...prev,
                makingCost: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
            
          <TextField
            label="Quantity"
            variant="outlined"
            type="number"
            
            value={orderInfo.quantity}
            inputProps={{ min: "1" }}
            onChange={(e) =>
                setOrderInfo((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>
      <div className="pt-4 flex justify-content-center">
        <Button variant="contained">Add</Button>
      </div>
    </div>
  );
};

export default MeasurementTab;
