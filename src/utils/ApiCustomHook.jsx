import { useState, useEffect } from "react";
import HttpInstance from "../config/axiosClient";

const useApiHook = (method, url, data = null, errorHandler = null) => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpInstance.request({
          method,
          url,
          data,
        }); 
        setResponseData(response.data);
      } catch (error) {
        setError(error);
        if (errorHandler) {
          errorHandler(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [method, url, data, errorHandler]);

  return { responseData, loading, error };
};

export default useApiHook;