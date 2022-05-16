import React, { useState, useEffect } from 'react';
import axios from "../api/httpRequestApi";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const {url, requestConfig={} } = configObj;
    // const ctrl = new AbortController();
    // setController(ctrl)
    try {
      setLoading(true)
      console.log(requestConfig);
      const res = await axios.get(url, {
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
    }
  };
  //     useEffect(() => {
  //         console.log(controller);
  //         return (()=>controller.abort())
  // },[controller])
  return {products:response, error, loading, axiosFetch};
};

export default useAxios;