import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
//-----------service
import HttpService from "../services/httpService"

const useFetch = (url, requestConfig = {}) => {
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await HttpService.get(url);
        setHeaders(response.headers);
        setData(response.data);
      } catch (error) {
        setError(error);
        if (error.response?.status === 401) {
          toast.error("شما دسترسی لازم را ندارید");
        } else {
          toast.error("خطایی روی داده است");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading,headers, error };
};

export default useFetch;
