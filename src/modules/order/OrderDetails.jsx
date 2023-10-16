import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useOutletContext, useParams, useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { updateOrder } from "./orderApi";
import { STATUS } from "../../constants/fetch";
import useApiHook from "../../utils/ApiCustomHook";
import { Toaster, AppModal } from "../../components";
import { APIROUTES, APPROUTES } from "../../constants/routes";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  const [openModal, setModalOpen] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);

  const calculateTotalPrice = () => {
    let totalCost = 0;
    const { measuredItems, discount } = responseData;
    measuredItems.forEach((element) => {
      totalCost =
        totalCost +
        (Number(element.makingCost) + Number(element.clothPrice)) *
          Number(element.quantity);
    });

    const discountAmount = (Number(discount) / 100) * totalCost;

    return totalCost - discountAmount;
  };

  const handleModalOk = async () => {
    setStatus(STATUS.LOADING);

    const updatedData = {
      isDelivered: true,
      orderNo: responseData.orderNo,
      advance: responseData.advance,
      delivery: responseData.delivery,
      discount: responseData.discount,
      customerName: responseData.customerName,
      mobileNumber: responseData.mobileNumber,
      measuredItems: responseData.measuredItems,
      orderPlacedBy: responseData.orderPlacedBy,
    };
    setModalOpen(false);

    const response = await updateOrder(updatedData, responseData._id).catch(
      (e) => setStatus(STATUS.ERROR)
    );

    if (response) {
      setStatus(STATUS.SUCCESS);
      navigate(APPROUTES.deliveryPage(responseData._id));
    }
  };

  const handleToasterClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus(STATUS.IDLE);
  };

  useEffect(() => {
    setDrawerText("Order Details");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData && (
        <div>
          <Grid container spacing={2} textAlign={"center"}>
            <Grid xs={2}>
              <div className="pb-1">অর্ডার নম্বর</div>
              <div>{responseData.orderNo}</div>
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">কাস্টমারের নাম</div>
              <div>{responseData.customerName}</div>
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">অর্ডারকৃত আইটেম</div>
              {responseData.measuredItems.map((ele) => (
                <div key={ele._id}>{ele.productName}</div>
              ))}
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">মোট</div>
              <div>{calculateTotalPrice()}</div>
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">বাকি</div>
              <div>{calculateTotalPrice() - responseData.advance}</div>
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">ডেলিভারি হয়েছে?</div>
              <div>
                {responseData.isDelivered ? (
                  <CheckCircleIcon style={{ color: "green" }} />
                ) : (
                  <CancelIcon style={{ color: "red" }} />
                )}
              </div>
              {!responseData.isDelivered && (
                <div>
                  <Button
                    variant="contained"
                    onClick={() => setModalOpen(true)}
                  >
                    ডেলিভারি করুন
                  </Button>
                </div>
              )}
              {responseData.isDelivered && (
                <div>
                  <Button
                    variant="contained"
                    onClick={() => navigate(APPROUTES.deliveryPage(id))}
                  >
                    ডেলিভারি স্লিপ
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
          <div className="flex justify-content-center pt-4 g-3">
            <Button
              variant="contained"
              onClick={() => navigate(APPROUTES.orderCustomerCopy(id))}
            >
              Customer Copy
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(APPROUTES.orderProductionCopy(id))}
            >
              Production Copy
            </Button>
          </div>
        </div>
      )}
      <AppModal
        open={openModal}
        title={"Delivery the product"}
        handleClose={() => setModalOpen(false)}
        handleOk={handleModalOk}
      >
        আপনি নিশ্চিত যে ডেলিভারি দিচ্ছেন?
      </AppModal>

      <Toaster
        severity={"error"}
        message={`Please try again`}
        open={status === STATUS.ERROR}
        handleClose={handleToasterClose}
      />
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
    </div>
  );
};

export default OrderDetails;
