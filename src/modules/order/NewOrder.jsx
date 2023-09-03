import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getUserProductByType } from "../product/productApi";
import { STATUS } from "../../constants/fetch";
import { itemTypeSelectList } from "../../constants/application";
import { Dropdown } from "./";

const NewOrder = () => {
  const { setDrawerText } = useOutletContext();

  const [orderInfo, setOrderInfo] = useState({
    itemType: "",
    itemList: [],
    itemFetchStatus: STATUS.IDLE,
  });

  const handleFetchItemError = (error) => {
    setOrderInfo({ ...orderInfo, itemFetchStatus: STATUS.ERROR });
    console.log(error);
  };

  const handleSelectChange = async (e) => {
    setOrderInfo({ ...orderInfo, itemType: e.target.value });
    setOrderInfo({ ...orderInfo, itemFetchStatus: STATUS.LOADING });
    const response = await getUserProductByType(e.target.value).catch((e) =>
      handleFetchItemError(e.response)
    );
    if (response) {
      const { data } = response;
      console.log(data);
      setOrderInfo({ ...orderInfo, itemFetchStatus: STATUS.SUCCESS });
    }
  };

  useEffect(() => {
    setDrawerText("New Order");
  }, [setDrawerText]);

  return (
    <div>
      <div className="py-2">
        <Dropdown
          value={orderInfo.itemType}
          defaultSelectLabel={"Select item"}
          items={itemTypeSelectList}
          handleChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default NewOrder;
