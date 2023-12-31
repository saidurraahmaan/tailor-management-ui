import React, { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { STATUS } from "../../constants/fetch";
import {
  getUserProductById,
  getUserProductByType,
} from "../product/productApi";
import {
  NewOrderTabConstant,
  itemTypeSelectList,
} from "../../constants/application";
import {
  CustomerCopy,
  Dropdown,
  MeasuredProductList,
  Measurement,
  OrderSubmission,
  OrderTab,
  ProductionCopy,
} from "./";
import {
  prepareNewOrderDescriptionList,
  prepareNewOrderMeasurementList,
} from "../../utils/helperFunction";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrderReducer,
  resetOrderSlice,
  updateOrderField,
  updateOrderStates,
} from "./orderSlice";
import {
  newOrderInitialState,
  orderInfoInitialState,
  showingStateInitialState,
} from "./orderConstant";
import { getOrderNo, placeNewOrder } from "./orderApi";
import { APPROUTES } from "../../constants/routes";
import dayjs from "dayjs";

const NewOrder = () => {
  const { setDrawerText } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [newOrderState, setNewOrderState] = useState(newOrderInitialState);
  const [orderInfo, setOrderInfo] = useState(orderInfoInitialState);
  const [showingState, setShowingState] = useState(showingStateInitialState);
  const [tabValue, setTabValue] = useState(NewOrderTabConstant.ProductList);

  const {
    error,
    status,
    orderNo,
    delivery,
    advance,
    discount,
    customerName,
    clothPrice,
    measuredItems,
    mobileNumber,
  } = useSelector(getOrderReducer);

  const handleFetchItemError = (error) => {
    setNewOrderState((prev) => ({ ...prev, productFetchStatus: STATUS.ERROR }));
  };

  const handleProductInfoFetchError = (error) => {
    setNewOrderState((prev) => ({
      ...prev,
      productInfoFetchStatus: STATUS.ERROR,
    }));
    // setShowProductMeasurements(false);
    setShowingState((prev) => ({ ...prev, productMeasurement: false }));
    console.log(error);
  };

  const handleProductTypeSelectChange = async (e) => {
    setNewOrderState((prev) => ({
      ...prev,
      selectedProduct: "",
      productType: e.target.value,
      productFetchStatus: STATUS.LOADING,
      productInfoFetchStatus: STATUS.IDLE,
    }));
    const response = await getUserProductByType(e.target.value).catch((e) =>
      handleFetchItemError(e.response)
    );
    if (response) {
      const { data } = response;
      setNewOrderState((prev) => ({
        ...prev,
        productList: data.map((ele) => ({
          value: ele._id,
          label: ele.productName,
        })),
        productFetchStatus: STATUS.SUCCESS,
      }));
    }
  };

  const handleProductSelectChange = async (e) => {
    // setShowProductMeasurements(true);
    setShowingState((prev) => ({ ...prev, productMeasurement: true }));
    setNewOrderState((prev) => ({
      ...prev,
      selectedProduct: e.target.value,
      productInfoFetchStatus: STATUS.LOADING,
    }));
    const response = await getUserProductById(e.target.value).catch((e) =>
      handleProductInfoFetchError(e.response)
    );

    if (response) {
      const { data } = response;
      const { productName, measurements, descriptions, productType } = data;

      setNewOrderState((prev) => ({
        ...prev,
        productInfoFetchStatus: STATUS.SUCCESS,
      }));

      setOrderInfo((prev) => ({
        ...prev,
        productName,
        productType,
        productMeasurements: prepareNewOrderMeasurementList(measurements),
        productDescriptions: prepareNewOrderDescriptionList(descriptions),
      }));
    }
  };

  const handlePlaceOrderClick = async () => {
    const orderData = {
      advance,
      delivery,
      discount,
      clothPrice,
      customerName,
      mobileNumber,
      measuredItems,
    };
    // console.log(orderData);
    dispatch(placeNewOrder(orderData));
  };

  const handleSubmissionToasterClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(updateOrderField({ field: "status", value: STATUS.IDLE }));
    dispatch(updateOrderField({ field: "error", value: null }));
  };

  useEffect(() => {
    setDrawerText("নতুন অর্ডার");
  }, [setDrawerText]);

  useEffect(() => {
    const fetchOrderNo = async () => {
      const response = await getOrderNo().catch((e) => console.log(e));
      if (response) {
        dispatch(updateOrderField({ field: "orderNo", value: response.data }));
      }
    };
    fetchOrderNo();

    return () => {
      dispatch(resetOrderSlice());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      navigate(APPROUTES.orderSuccess);
    }
  }, [navigate, status]);

  useEffect(() => {
    if (state) {
      dispatch(updateOrderStates(state));
    }
  }, [state, dispatch]);

  return (
    <div>
      {measuredItems.length > 0 && (
        <div className="py-2">
          <div className="py-1 flex justify-content-center">
            <OrderTab
              setValue={setTabValue}
              value={tabValue}
              setShowingState={setShowingState}
            />
          </div>
          {tabValue === NewOrderTabConstant.ProductList && (
            <MeasuredProductList
              setShowingState={setShowingState}
              setNewOrderState={setNewOrderState}
              showingState={showingState}
              setOrderInfo={setOrderInfo}
            />
          )}
          {tabValue === NewOrderTabConstant.OrderInfo && (
            <OrderSubmission
              status={status}
              buttonText={"সেভ করুন"}
              error={error}
              onSave={handlePlaceOrderClick}
              handleToasterClose={handleSubmissionToasterClose}
            />
          )}
          {tabValue === NewOrderTabConstant.ProductionCopy && (
            <ProductionCopy
              orderNo={orderNo}
              delivery={delivery}
              orderDate={dayjs()}
              customerName={customerName}
              measuredItems={measuredItems}
            />
          )}
          {tabValue === NewOrderTabConstant.CustomerCopy && (
            <CustomerCopy
              clothPrice={clothPrice}
              advance={advance}
              orderDate={dayjs()}
              orderNo={orderNo}
              discount={discount}
              delivery={delivery}
              customerName={customerName}
              measuredItems={measuredItems}
            />
          )}
        </div>
      )}

      <React.Fragment>
        {showingState.productType && (
          <div className="py-2 flex g-3">
            <Dropdown
              value={newOrderState.productType}
              defaultSelectLabel={"Select product type"}
              items={itemTypeSelectList}
              handleChange={handleProductTypeSelectChange}
            />

            {newOrderState.productFetchStatus === STATUS.SUCCESS && (
              <Dropdown
                value={newOrderState.selectedProduct}
                defaultSelectLabel={"Select product"}
                items={newOrderState.productList}
                handleChange={handleProductSelectChange}
              />
            )}
            {newOrderState.productFetchStatus === STATUS.LOADING && (
              <CircularProgress />
            )}
          </div>
        )}
        {showingState.productMeasurement && (
          <div className="py-2">
            {newOrderState.productInfoFetchStatus === STATUS.LOADING && (
              <div className="flex justify-content-center">
                <CircularProgress />
              </div>
            )}
            {newOrderState.productInfoFetchStatus === STATUS.SUCCESS && (
              <React.Fragment>
                <Measurement
                  orderInfo={orderInfo}
                  setOrderInfo={setOrderInfo}
                  setShowingState={setShowingState}
                  showingState={showingState}
                  setNewOrderState={setNewOrderState}
                />
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default NewOrder;
