import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormLabel from "@mui/material/FormLabel";
import { Button, TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { ProductType } from "../../constants/application";
import { STATUS } from "../../constants/fetch";
import { getUserProductById, updateProductById } from "./productApi";
import { APPROUTES } from "../../constants/routes";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import { Toaster } from "../../components";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setDrawerText } = useOutletContext();
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState({ fetchError: null, updateError: null });
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);

  const [productInfo, setProductInfo] = React.useState({
    productName: "",
    measurements: [],
    descriptions: [],
    productType: ProductType.Gents,
  });

  const handleApiError = (error) => {
    setStatus(STATUS.ERROR);

    if (error.data?.message) {
      setError((prev) => ({ ...prev, updateError: error.data.message }));
      return;
    }
    setError((prev) => ({ ...prev, updateError: "something went wrong" }));
  };

  const handleUpdate = async () => {
    setStatus(STATUS.LOADING);
    const { productName, measurements, descriptions, productType } =
      productInfo;

    if (!productName || !measurements.length || !descriptions.length) {
      setStatus(STATUS.ERROR);
      return;
    }
    const response = await updateProductById(id, {
      productName,
      measurements,
      descriptions,
      productType,
    }).catch((e) => handleApiError(e.response));
    if (response) {
      setStatus(STATUS.SUCCESS);
    }
  };

  const handleUpdateToasterSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError((prev) => ({
      ...prev,
      updateError: null,
    }));
    setStatus(STATUS.IDLE);
    navigate(APPROUTES.product);
  };

  const handleUpdateToasterErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError((prev) => ({
      ...prev,
      updateError: null,
    }));
    setStatus(STATUS.IDLE);
  };

  useEffect(() => {
    setDrawerText("Update Product");
  }, [setDrawerText]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getUserProductById(id).catch((e) => {
        setFetchStatus(STATUS.ERROR);
        setError((prev) => ({ ...prev, updateError: e.message }));
      });
      if (response) {
        const { productName, measurements, descriptions, productType } =
          response.data;
        setProductInfo((prev) => ({
          ...prev,
          productName,
          measurements,
          descriptions,
          productType,
        }));
      }
    };
    fetch();
  }, [id]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
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
              onClick={handleUpdate}
              loading={status === STATUS.LOADING}
            >
              Update
            </LoadingButton>
          </div>
        </div>
      </div>
      <Toaster
        severity={"success"}
        message={"আপনার প্রোডাক্টি সফলভাবে আপডেট হয়েছে"}
        open={status === STATUS.SUCCESS}
        handleClose={handleUpdateToasterSuccessClose}
      />

      <Toaster
        severity={"error"}
        message={error.updateError}
        open={status === STATUS.ERROR}
        handleClose={handleUpdateToasterErrorClose}
      />
    </div>
  );
};

export default EditProduct;
