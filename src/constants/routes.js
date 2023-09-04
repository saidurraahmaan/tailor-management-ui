export const APIROUTES = {
  login: "/auth/login",
  addProduct: "/product",
  register: "/auth/register",
  getUserAllProduct: "/product/byUser",
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
};
