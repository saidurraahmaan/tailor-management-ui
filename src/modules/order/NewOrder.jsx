import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { STATUS } from "../../constants/fetch";
import {
  getUserProductById,
  getUserProductByType,
} from "../product/productApi";
import {
  NewOrderTabConstant,
  ProductType,
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
import { useSelector } from "react-redux";
import { getOrderReducer } from "./orderSlice";

const NewOrder = () => {
  const { setDrawerText } = useOutletContext();

  const [newOrderState, setNewOrderState] = useState({
    orderNo: 0,
    productType: "",
    productList: [],
    selectedProduct: "",
    productFetchStatus: STATUS.IDLE,
    productInfoFetchStatus: STATUS.IDLE,
  });
  const [orderInfo, setOrderInfo] = useState({
    _id: "",
    productName: "",
    productType: ProductType.Gents,
    productMeasurements: [],
    productDescriptions: [],
    clothPrice: 0,
    makingCost: 0,
    quantity: 1,
  });
  const [showProductType, setShowProductType] = useState(true);
  const [showProductMeasurements, setShowProductMeasurements] = useState(false);
  const [tabValue, setTabValue] = useState(NewOrderTabConstant.ProductList);


  const { measuredItems } = useSelector(getOrderReducer);

  const handleFetchItemError = (error) => {
    setNewOrderState((prev) => ({ ...prev, productFetchStatus: STATUS.ERROR }));
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
      const { productName, measurements, descriptions, orderNo, productType } =
        data;
      setNewOrderState((prev) => ({
        ...prev,
        productInfoFetchStatus: STATUS.SUCCESS,
      }));

      setOrderInfo((prev) => ({
        ...prev,
        orderNo,
        productName,
        productType,
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
      {measuredItems.length > 0 && (
        <div className="py-2">
          <div className="py-1 flex justify-content-center">
            <OrderTab setValue={setTabValue} value={tabValue} />
          </div>
          {tabValue === NewOrderTabConstant.ProductList && (
            <MeasuredProductList
              setShowProductType={setShowProductType}
              setNewOrderState={setNewOrderState}
            />
          )}
          {tabValue === NewOrderTabConstant.OrderInfo && <OrderSubmission />}
          {tabValue === NewOrderTabConstant.ProductionCopy && (
            <ProductionCopy />
          )}
          {tabValue === NewOrderTabConstant.CustomerCopy && <CustomerCopy />}
        </div>
      )}
      {showProductType && (
        <React.Fragment>
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
                <Measurement
                  orderInfo={orderInfo}
                  setOrderInfo={setOrderInfo}
                  setShowProductType={setShowProductType}
                />
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default NewOrder;
