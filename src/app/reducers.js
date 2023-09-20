import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/authSlice";
import orderReducer from "../modules/order/orderSlice";
import { resetState } from "../services/logoutService";

const combinedReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
