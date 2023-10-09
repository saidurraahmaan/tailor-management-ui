import React, { useEffect } from "react";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useOutletContext, useParams, useNavigate } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useApiHook from "../../utils/ApiCustomHook";
import { APIROUTES, APPROUTES } from "../../constants/routes";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";

const OrderDetails = () => {
  const { setDrawerText } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  useEffect(() => {
    setDrawerText("Order Details");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

  const calculateTotalPrice = () => {
    let totalCost = 0;
    const { measuredItems, discount } = responseData;
    measuredItems.forEach((element) => {
      totalCost =
        totalCost +
        (Number(element.makingCost) + Number(element.clothPrice)) *
          Number(element.quantity);
    });
    // const totalCost = Number(makingCost) + Number(orderFinalData.clothPrice);
    // const afterQuantity = Number(totalCost) * Number(orderFinalData.quantity);

    const discountAmount = (Number(discount) / 100) * totalCost;

    return totalCost - discountAmount;
  };

  return (
    <div>
      {fetchStatus === STATUS.SUCCESS && responseData && (
        <div>
          <Grid container spacing={2} textAlign={"center"}>
            <Grid xs={2}>
              <div className="pb-1">ওর্ডার নম্বর</div>
              <div>{responseData.orderNo}</div>
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">কাস্টমারের নাম</div>
              <div>{responseData.customerName}</div>
            </Grid>
            <Grid xs={2}>
              <div className="pb-1">ওর্ডারকৃত আইটেম</div>
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
                    onClick={() => navigate(APPROUTES.deliveryPage(id))}
                  >
                    ডেলিভারি করুন
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
          <Button variant="contained">Preview Production Copy</Button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
