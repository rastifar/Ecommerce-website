import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
//---------service
import HttpService from "../services/httpService"

const useAxios = (url,data, requestConfig = {}) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    setLoading(true)
    HttpService.post(url, data, {
      ...requestConfig     
    }).then(res => {
      setStatus(res.status)
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
 
  return { products: response, error, loading,status };
};

export default useAxios;
