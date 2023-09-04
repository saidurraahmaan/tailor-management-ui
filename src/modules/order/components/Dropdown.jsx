import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = ({ value, handleChange, items, defaultSelectLabel }) => {
  return (
    <div>
      <FormControl sx={{ minWidth: "250px" }}>
        <Select
          displayEmpty
          value={value}
          onChange={handleChange}
          sx={{ height: "45px" }}
          input={<OutlinedInput />}
        >
          <MenuItem disabled value="">
            {defaultSelectLabel}
          </MenuItem>
          {items.map((ele) => (
            <MenuItem key={ele.value} value={ele.value}>
              {ele.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
