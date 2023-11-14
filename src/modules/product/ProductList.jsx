import React, { useEffect } from "react";
import { Button } from "@mui/material";
import useApiHook from "../../utils/ApiCustomHook";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { APIROUTES, APPROUTES } from "../../constants/routes";
import { useNavigate, useOutletContext } from "react-router-dom";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import { STATUS } from "../../constants/fetch";
import { PaginatedProductList } from "./index.js";
import emptyListImg from "../../assets/images/empty.gif";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ProductList = () => {
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getUserAllProduct
  );

  useEffect(() => {
    setDrawerText("প্রোডাক্টের তালিকা");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData.length === 0 && (
        <div className="flex justify-content-center py-2">
          <div>
            <div className="text-center">
              <img src={emptyListImg} alt="empty" />
            </div>
            <div> আপনার কোনো প্রোডাক্ট পাওয়া যায় নি </div>
          </div>
        </div>
      )}
      <div className="py-1 pb-3 flex justify-content-center">
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(APPROUTES.newProduct)}
          startIcon={<AddCircleOutlineIcon />}
        >
          নতুন প্রোডাক্ট যোগ করুন
        </Button>
      </div>

      {fetchStatus === STATUS.SUCCESS && responseData.length > 0 && (
        <>
          <Grid container spacing={2}>
            <Grid xs={9} container>
              <Grid xs={3}>Product Name</Grid>
              <Grid xs={3}>Type</Grid>
              <Grid xs={3}>Action</Grid>
            </Grid>
            <Grid xs={3}></Grid>
          </Grid>
          <PaginatedProductList data={responseData} itemsPerPage={10} />
        </>
      )}
    </div>
  );
};

export default ProductList;
