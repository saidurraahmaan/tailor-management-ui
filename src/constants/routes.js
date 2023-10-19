export const APIROUTES = {
  login: "/auth/login",
  placeOrder: "/order",
  addProduct: "/product",
  register: "/auth/register",
  getOrderNo: "/order/getOrderNo",
  getUserAllProduct: "/product/byUser",
  updateOrderById: (id) => `/order/${id}`,
  getOrderDetailsById: (id) => `/order/${id}`,
  updateProductById: (id) => `/product/${id}`,
  getUserProductById: (id) => `/product/${id}`,
  getUserProductByType: (type) => `/product/type/${type}`,
};

export const APPROUTES = {
  home: "/",
  signin: "/",
  signup: "/signup",
  product: "/product",
  orderList: "/orders",
  newOrder: "/order/new",
  statistics: "/statistics",
  newProduct: "/product/new",
  orderSuccess: "/order/new/success",

  registrationSuccess: "/signup/success",
  productEdit: (id) => `/product/edit/${id}`,
  orderDetails: (id) => `/order/details/${id}`,
  deliveryPage: (id) => `/order/delivery/${id}`,
  orderCustomerCopy: (id) => `/order/customercopy/${id}`,
  orderProductionCopy: (id) => `/order/productioncopy/${id}`,
};
