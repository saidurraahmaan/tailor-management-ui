import { useState, useEffect } from "react";
import HttpInstance from "../config/axiosClient";
import { STATUS } from "../constants/fetch";

const useApiHook = (method, url, data = null, errorHandler = null) => {
  const [responseData, setResponseData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setFetchStatus(STATUS.LOADING);
      try {
        const response = await HttpInstance.request({
          method,
          url,
          data,
        });
        setFetchStatus(STATUS.SUCCESS);
        setResponseData(response.data);
      } catch (error) {
        setError(error);
        setFetchStatus(STATUS.ERROR);
        if (errorHandler) {
          errorHandler(error);
        }
      }
    };
    fetchData();
  }, [method, url, data, errorHandler]);

  return { responseData, fetchStatus, error };
};

export default useApiHook;
