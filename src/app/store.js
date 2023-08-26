import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  const { createLogger } = require(`redux-logger`);
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
  });

  middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };
