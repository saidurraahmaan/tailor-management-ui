export const APIROUTES = {
  login: "/auth/login",
  placeOrder: "/order",
  addProduct: "/product",
  getUser: "/auth/getUser",
  register: "/auth/register",
  updateUser: "/auth/update",
  orderState: "/order/state",
  getOrderNo: "/order/getOrderNo",
  getRangeState: "/order/rangeState",
  getUserAllProduct: "/product/byUser",
  updateOrderById: (id) => `/order/${id}`,
  deleteOrderById: (id) => `/order/${id}`,
  getOrderDetailsById: (id) => `/order/${id}`,
  updateProductById: (id) => `/product/${id}`,
  getUserProductById: (id) => `/product/${id}`,
  getUserProductByType: (type) => `/product/type/${type}`,
};

export const APPROUTES = {
  home: "/",
  signin: "/",
  cost: "/cost",
  signup: "/signup",
  product: "/product",
  profile: "/profile",
  orderList: "/orders",
  newCost: "/cost/new",
  newOrder: "/order/new",
  statistics: "/statistics",
  newProduct: "/product/new",
  orderSuccess: "/order/new/success",
  registrationSuccess: "/signup/success",

  editOrder: (id) => `/order/edit/${id}`,
  productEdit: (id) => `/product/edit/${id}`,
  orderDetails: (id) => `/order/details/${id}`,
  deliveryPage: (id) => `/order/delivery/${id}`,
  orderCustomerCopy: (id) => `/order/customercopy/${id}`,
  orderProductionCopy: (id) => `/order/productioncopy/${id}`,
};
