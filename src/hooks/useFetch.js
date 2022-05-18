import React, { useState, useEffect } from "react";
import axios from "../api/httpRequestApi";
import { toast } from 'react-toastify';

const useAxios = (url, requestConfig = {}) => {
  const [response, setResponse] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [controller, setController] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(url, {
        ...requestConfig,
      })
      .then((res) => {
        setResponse(res.data);
        setHeaders(res.headers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        if (error.response?.status === 401) {
          toast.error("شما دسترسی لازم را ندارید");
        } else {
          toast.error("خطایی روی داده است");
        }
      });
  }, [url]);

  // const axiosFetch = async (configObj) => {
  //   const { url, requestConfig = {} } = configObj;
  //   // const ctrl = new AbortController();
  //   // setController(ctrl)
  //   try {
  //     setLoading(true);
  //     console.log(requestConfig);
  //     const res = await axios.get(url, {
  //       ...requestConfig,
  //       // signal: ctrl.singal,
  //     });
  //     console.log(res.data);
  //     setResponse(res.data);
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //     useEffect(() => {
  //         console.log(controller);
  //         return (()=>controller.abort())
  // },[controller])
  return { products: response, error, loading,headers };
};

export default useAxios;
