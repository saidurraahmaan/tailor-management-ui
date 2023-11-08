import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { ProductType } from "../../constants/application";
import { STATUS } from "../../constants/fetch";
import { addProduct } from "./productApi";
import { APPROUTES } from "../../constants/routes";

const NewProduct = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [productInfo, setProductInfo] = React.useState({
    productName: "",
    measurements: [],
    descriptions: [],
    productType: ProductType.Gents,
  });

  // const [productError, setProductError] = useState({
  //   isError: false,
  //   errorMessage: "",
  // });

  const handleApiError = (error) => {
    console.log(error);
    setStatus(STATUS.ERROR);
  };

  const handleAdd = async () => {
    setStatus(STATUS.LOADING);
    const { productName, measurements, descriptions, productType } =
      productInfo;

    if (!productName || !measurements.length || !descriptions.length) {
      setStatus(STATUS.ERROR);
      return;
    }
    const response = await addProduct({
      productName,
      measurements,
      descriptions,
      productType,
    }).catch((e) => handleApiError(e.response));
    if (response) {
      setStatus(STATUS.SUCCESS);
      navigate(APPROUTES.product);
    }
  };

  useEffect(() => {
    setDrawerText("নতুন প্রোডাক্ট যোগ করুন");
  }, [setDrawerText]);

  return (
    <div>
      <div className="py-2">
        <TextField
          required
          label="Product Name"
          variant="outlined"
          sx={{ width: "50%" }}
          value={productInfo.productName}
          onChange={(e) =>
            setProductInfo({ ...productInfo, productName: e.target.value })
          }
        />
      </div>
      <div className="py-2">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Product Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={productInfo.productType}
            onChange={(event) =>
              setProductInfo({
                ...productInfo,
                productType: event.target.value,
              })
            }
          >
            <FormControlLabel
              value={ProductType.Gents}
              control={<Radio />}
              label="Gents"
            />
            <FormControlLabel
              value={ProductType.Ladies}
              control={<Radio />}
              label="Ladies"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="py-2">
        <MuiChipsInput
          required
          sx={{ width: "50%" }}
          label="Measurement"
          value={productInfo.measurements}
          onChange={(newChips) =>
            setProductInfo({ ...productInfo, measurements: newChips })
          }
          disableDeleteOnBackspace
        />
      </div>
      <div className="py-2">
        <MuiChipsInput
          required
          label="Description"
          value={productInfo.descriptions}
          sx={{ width: "50%" }}
          onChange={(newChips) =>
            setProductInfo({ ...productInfo, descriptions: newChips })
          }
          disableDeleteOnBackspace
        />
      </div>
      <div className="flex g-2 py-1 justify-content-between wd-50">
        <div className="py-2">
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </div>
        <div className="py-2 flex justify-content-center">
          <LoadingButton
            variant="contained"
            onClick={handleAdd}
            loading={status === STATUS.LOADING}
          >
            Add
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
