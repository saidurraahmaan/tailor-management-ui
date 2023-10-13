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
