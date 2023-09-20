import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
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
  MeasurementTab,
  OrderSubmission,
  OrderTab,
  ProductionCopy,
} from "./";
import {
  prepareNewOrderDescriptionList,
  prepareNewOrderMeasurementList,
} from "../../utils/helperFunction";
import "./index.css";

const NewOrder = () => {
  const { setDrawerText } = useOutletContext();

  const [newOrderState, setNewOrderState] = useState({
    productType: "",
    productList: [],
    selectedProduct: "",
    orderNo: 0,
    productFetchStatus: STATUS.IDLE,
    productInfoFetchStatus: STATUS.IDLE,
  });
  const [orderInfo, setOrderInfo] = useState({
    id:"",
    productName: "",
    productMeasurements: [],
    productDescriptions: [],
    clothPrice: 0,
    makingCost: 0,
    quantity: 1,
  });
  const [orderFinalData, setOrderFinalData] = useState({
    delivery: dayjs(),
    advance: 0,
    mobileNumber: "",
    customerName: "",
    discount: 0,
    products: [],
    status: STATUS.IDLE,
  });
  const [tabValue, setTabValue] = useState(NewOrderTabConstant.Measurement);

  const handleFetchItemError = (error) => {
    setNewOrderState((prev) => ({ ...prev, productFetchStatus: STATUS.ERROR }));
    console.log(error);
  };

  const handleProductInfoFetchError = (error) => {
    setNewOrderState((prev) => ({
      ...prev,
      productInfoFetchStatus: STATUS.ERROR,
    }));
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
      const { productName, measurements, descriptions, orderNo } = data;
      setNewOrderState((prev) => ({
        ...prev,
        productInfoFetchStatus: STATUS.SUCCESS,
      }));

      setOrderInfo((prev) => ({
        ...prev,
        orderNo,
        productName,
        productMeasurements: prepareNewOrderMeasurementList(measurements),
        productDescriptions: prepareNewOrderDescriptionList(descriptions),
      }));
    }
  };

  useEffect(() => {
    setDrawerText("New Order");
  }, [setDrawerText]);

  return (
    <div>
      <div className="py-2"></div>
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
      <div className="py-2">
        {newOrderState.productInfoFetchStatus === STATUS.LOADING && (
          <div className="flex justify-content-center">
            <CircularProgress />
          </div>
        )}
        {newOrderState.productInfoFetchStatus === STATUS.SUCCESS && (
          <React.Fragment>
            <MeasurementTab orderInfo={orderInfo} setOrderInfo={setOrderInfo} />
            {/* <div className="py-1 flex justify-content-center">
              <OrderTab setValue={setTabValue} value={tabValue} />
            </div>
            {tabValue === NewOrderTabConstant.Measurement && (
              <MeasurementTab
                orderInfo={orderInfo}
                setOrderInfo={setOrderInfo}
              />
            )}
            {tabValue === NewOrderTabConstant.OrderInfo && (
              <OrderSubmission
                measurementInfo={orderInfo}
                orderFinalData={orderFinalData}
                setOrderFinalData={setOrderFinalData}
              />
            )}
            {tabValue === NewOrderTabConstant.ProductionCopy && (
              <ProductionCopy
                measurementInfo={orderInfo}
                orderFinalData={orderFinalData}
              />
            )}
            {tabValue === NewOrderTabConstant.CustomerCopy && (
              <CustomerCopy
                measurementInfo={orderInfo}
                orderFinalData={orderFinalData}
              />
            )} */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default NewOrder;
