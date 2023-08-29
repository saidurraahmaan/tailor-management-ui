import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";

const NewProduct = () => {
  const [measurements, setMeasurement] = React.useState([]);
  const [descriptions, setDescriptions] = React.useState([]);

  const handleMeasurementChange = (newChips) => {
    setMeasurement(newChips);
  };
  const handleDescriptionChange = (newChips) => {
    setDescriptions(newChips);
  };

  return (
    <div>
      <div className="py-2">
        <TextField
          label="Product Name"
          variant="outlined"
          sx={{ width: "50%" }}
          // value={loginInfo.username}
          // onChange={(e) =>
          //   setLoginInfo({ ...loginInfo, username: e.target.value })
          // }
        />
      </div>
      <div className="py-2">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Product Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="gents"
            name="radio-buttons-group"
          >
            <FormControlLabel value="gents" control={<Radio />} label="Gents" />
            <FormControlLabel
              value="ladies"
              control={<Radio />}
              label="Ladies"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="py-2">
        <MuiChipsInput
          sx={{ width: "50%" }}
          label="Measurement"
          value={measurements}
          onChange={handleMeasurementChange}
        />
      </div>
      <div className="py-2">
        <MuiChipsInput
          label="Description"
          value={descriptions}
          sx={{ width: "50%" }}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default NewProduct;
