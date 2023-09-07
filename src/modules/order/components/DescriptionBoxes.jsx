import React from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const DescriptionBoxes = ({ orderInfo, setOrderInfo }) => {
  const { productDescriptions } = orderInfo;

  const handleChange = (value, id) => {
    const updatedProductDescriptions = productDescriptions.map((description) =>
      description._id === id ? { ...description, value } : description
    );

    setOrderInfo({
      ...orderInfo,
      productDescriptions: updatedProductDescriptions,
    });
  };

  return (
    <React.Fragment>
      {productDescriptions.map((ele) => (
        <FormGroup key={ele._id}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={ele.value}
                onChange={(e) => handleChange(e.target.checked, ele._id)}
              />
            }
            label={ele.label}
          />
        </FormGroup>
      ))}
    </React.Fragment>
  );
};

export default DescriptionBoxes;
