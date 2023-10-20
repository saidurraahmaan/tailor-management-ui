export const measuredItemsToCustomerOrderItems = (measuredItems) => {
  const orderItems = measuredItems.map((ele) => ({
    id: ele._id,
    productName: ele.productName,
    isTakingCloth: +ele.clothPrice > 0,
    clothPrice: +ele.clothPrice,
    quantity: +ele.quantity,
    makingCost: +ele.makingCost,
  }));
  return orderItems;
};

export const statisticsObjectPieData = (state) => {
  let data = [
    {
      id: 0,
      label: "Total",
      value: +state.totalOrders,
    },
    {
      id: 1,
      label:"Total",
      value: +state.pendingOrders,
    },
    {
      id: 2,
      label: "Total",
      value: +state.deliveredOrders,
    },
  ];
  return data;
};
