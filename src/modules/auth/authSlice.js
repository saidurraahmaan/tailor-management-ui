import { createSlice } from "@reduxjs/toolkit";
import {} from "./authApi";
import { STATUS } from "../../constants/fetch";

const initialUser = {
  email: "",
  phone: "",
  name: "",
  storeName: "",
  storeAddress: "",
};

const initialState = {
  token: null,
  error: null,
  user: initialUser,
  isLoggedIn: false,
  status: STATUS.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      Object.assign(state, initialState);
    },

    successfulLogin(state, action) {
      const { name, token, email, storeName, storeAddress, phone } =
        action.payload;

      state.user = { name, email, storeName, storeAddress, phone };
      state.error = null;
      state.token = token;
      state.isLoggedIn = true;
      state.status = STATUS.SUCCESS;
    },
  },
  extraReducers: (builder) => {},
});

export const { resetAuth, successfulLogin } = authSlice.actions;

//selector
export const authInformation = (state) => state.auth;

export default authSlice.reducer;
