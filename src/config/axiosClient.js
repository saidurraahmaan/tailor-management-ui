import axios from "axios";

const HttpInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 2500,
  headers: {
    "Content-Type": "application/json",
  },
});

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

HttpInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default HttpInstance;
