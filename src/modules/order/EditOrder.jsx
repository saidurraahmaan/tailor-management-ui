import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APIROUTES, APPROUTES } from "../../constants/routes";
import useApiHook from "../../utils/ApiCustomHook";
import { STATUS } from "../../constants/fetch";
import CircularWithValueLabel from "../../components/primitives/CircularLoader";
import {
  getOrderReducer,
  resetOrderSlice,
  updateOrderStates,
} from "./orderSlice";
import OrderTab from "./components/OrderTab";
import MeasuredProductList from "./components/MeasuredProductList";
import ProductionCopy from "./components/ProductionCopy";
import CustomerCopy from "./components/CustomerCopy";
import dayjs from "dayjs";
import { dateTimeFormat } from "../../constants/dateTimeFormat";
import {
  newOrderInitialState,
  orderInfoInitialState,
  showingStateInitialStateEdit,
} from "./orderConstant";
import {
  NewOrderTabConstant,
  itemTypeSelectList,
} from "../../constants/application";
import OrderSubmission from "./components/OrderSubmission";
import { CircularProgress } from "@mui/material";
import Measurement from "./components/Measurement";
import Dropdown from "./components/Dropdown";
import {
  prepareNewOrderDescriptionList,
  prepareNewOrderMeasurementList,
} from "../../utils/helperFunction";
import {
  getUserProductById,
  getUserProductByType,
} from "../product/productApi";
import { updateOrder } from "./orderApi";

const EditOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setDrawerText } = useOutletContext();

  const { fetchStatus, responseData } = useApiHook(
    "get",
    APIROUTES.getOrderDetailsById(id)
  );

  const [newOrderState, setNewOrderState] = useState(newOrderInitialState);
  const [orderInfo, setOrderInfo] = useState(orderInfoInitialState);
  const [showingState, setShowingState] = useState(
    showingStateInitialStateEdit
  );
  const [tabValue, setTabValue] = useState(NewOrderTabConstant.ProductList);
  const [updateStatus, setUpdateStatus] = useState(STATUS.IDLE);

  const {
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

  const handleProductInfoFetchError = (error) => {
    setNewOrderState((prev) => ({
      ...prev,
      productInfoFetchStatus: STATUS.ERROR,
    }));
    // setShowProductMeasurements(false);
    setShowingState((prev) => ({ ...prev, productMeasurement: false }));
    console.log(error);
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
    setUpdateStatus(STATUS.LOADING);
    const orderData = {
      advance,
      delivery,
      discount,
      clothPrice,
      customerName,
      mobileNumber,
      measuredItems,
    };
    const response = await updateOrder(orderData, id).catch((e) =>
      setUpdateStatus(STATUS.ERROR)
    );
    if (response) {
      setUpdateStatus(STATUS.SUCCESS);
      navigate(APPROUTES.orderDetails(id));
    }
  };

  useEffect(() => {
    if (fetchStatus === STATUS.SUCCESS) {
      dispatch(updateOrderStates(responseData));
    }
    return () => {
      dispatch(resetOrderSlice());
    };
  }, [fetchStatus, dispatch, responseData]);

  useEffect(() => {
    setDrawerText("এডিট অর্ডার");
  }, [setDrawerText]);

  if (fetchStatus === STATUS.LOADING) {
    return <CircularWithValueLabel />;
  }

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
              onSave={handlePlaceOrderClick}
              buttonText={"আপডেট করুন"}
              status={updateStatus}
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
              orderDate={dayjs(responseData.orderDate).format(
                dateTimeFormat.invoiceDate
              )}
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

export default EditOrder;
