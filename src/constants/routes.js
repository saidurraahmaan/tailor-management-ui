export const APIROUTES = {
  login: "/auth/login",
  placeOrder: "/order",
  addProduct: "/product",
  register: "/auth/register",
  getOrderNo: "/order/getOrderNo",
  getUserAllProduct: "/product/byUser",
  updateOrderById: (id) => `/order/${id}`,
  getOrderDetailsById: (id) => `/order/${id}`,
  getUserProductById: (id) => `/product/${id}`,
  getUserProductByType: (type) => `/product/type/${type}`,
};

export const APPROUTES = {
  home: "/",
  signin: "/",
  cost: "/cost",
  signup: "/signup",
  product: "/product",
  orderList: "/orders",
  newOrder: "/order/new",
  newProduct: "/product/new",
  orderSuccess: "/order/new/success",
  registrationSuccess: "/signup/success",
  orderDetails: (id) => `/order/details/${id}`,
  deliveryPage: (id) => `/order/delivery/${id}`,
};
