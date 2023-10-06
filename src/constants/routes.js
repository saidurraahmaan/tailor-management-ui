export const APIROUTES = {
  login: "/auth/login",
  placeOrder: "/order",
  addProduct: "/product",
  register: "/auth/register",
  getOrderNo: "/order/getOrderNo",
  getUserAllProduct: "/product/byUser",
  getOrderDetailsById: (id) => `/order/${id}`,
  getUserProductById: (id) => `/product/${id}`,
  getUserProductByType: (type) => `/product/type/${type}`,
};

export const APPROUTES = {
  home: "/",
  cost: "/cost",
  signup: "/signup",
  signin: "/signin",
  product: "/product",
  newOrder: "/order/new",
  newProduct: "/product/new",
  registrationSuccess: "/signup/success",
  orderDetails: (id) => `/order/details/${id}`,
};
