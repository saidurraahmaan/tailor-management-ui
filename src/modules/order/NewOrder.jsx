import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ProductType } from "../../constants/application";
import { useOutletContext } from "react-router-dom";

const NewOrder = () => {
  const { setDrawerText } = useOutletContext();

  const [orderInfo, setOrderInfo] = useState({
    itemType: "",
    itemList: [],
  });

  const handleSelectChange = (e) => {
    setOrderInfo({ ...orderInfo, itemType: e.target.value });
  };

  useEffect(() => {
    setDrawerText("New Order");
  }, [setDrawerText]);

  return (
    <div>
      <div className="py-2">
        <FormControl>
          <Select
            displayEmpty
            value={orderInfo.itemType}
            onChange={handleSelectChange}
            sx={{ height: "45px" }}
            input={<OutlinedInput />}
          >
            <MenuItem disabled value="">
              Select item
            </MenuItem>
            <MenuItem value={ProductType.Ladies}>Ladies</MenuItem>
            <MenuItem value={ProductType.Gents}>Gents</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default NewOrder;
