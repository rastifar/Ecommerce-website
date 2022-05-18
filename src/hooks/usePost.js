import React, { useState, useEffect } from "react";
import axios from "../api/httpRequestApi";
import { toast } from 'react-toastify';

const useAxios = (url,data, requestConfig = {}) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setLoading(true)
    axios.post(url, data, {
      ...requestConfig     
    }).then(res => {
      setHeaders(res.headers)
      setResponse(res.data)
      setLoading(false)
    }).catch(error => {
      setError(error)
      setLoading(false)
      if (error.response?.status === 401) {
        toast.error("شما دسترسی لازم را ندارید");
      } else {
        toast.error("خطایی روی داده است");
      }
    })

  },[url])
 
  return { products: response, error, loading,headers };
};

export default useAxios;
