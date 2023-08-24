import { combineReducers } from "@reduxjs/toolkit";
// import authReducer from "../modules/auth/authSlice";
import { resetState } from "../services/logoutService";


const combinedReducer = combineReducers({
  // auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
