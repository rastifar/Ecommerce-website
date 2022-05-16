import React, { useState, useEffect } from 'react';
import axios from "../api/httpRequestApi";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [controller, setController] = useState();

  const axiosPost = async (configObj) => {
    const {method, url, requestConfig={},data } = configObj;
    // const ctrl = new AbortController();
    // setController(ctrl)
    try {
      setLoading(true)
      console.log(requestConfig);
      const res = await axios[method.toLowerCase()](url,data, {
        ...requestConfig,
        // signal: ctrl.singal,
      });
      console.log(res.data);
      setResponse(res.data)
    } catch (error) {
      console.log(error);
      setError(error.message)
    } finally {
        setLoading(false)
        return response;
      }
     
  };
  //     useEffect(() => {
  //         console.log(controller);
  //         return (()=>controller.abort())
  // },[controller])
  return {response, error, loading, axiosPost};
};

export default useAxios;