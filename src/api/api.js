import axios from "axios";
import { BASE_URL, ORDERS } from "../constants/apiConst";

import { toast } from "react-toastify";


class Api {
  
    constructor() {
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.timeout = 2000;
        axios.interceptors.request.use(
          (config) => {
            if(config.url===ORDERS){
              config.headers["token"]=localStorage.getItem("token")
            }
           
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    
        axios.interceptors.response.use(
          (response) => {
                if (response.statusCode === 401) {
                
                    toast.error('شما دسترسی لازم برای این کار را ندارید', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        })
            }
             
            return response;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
      }
    
      get = async(url) => {
        try {
          const response = await axios.get(url);
          return response.data;
        } catch (error) {
          return error;
        }
    
      };
    
      post = async(url,data) => {
        try {
          const response = await axios.post(url,data);
          return response;
        } catch (error) {
          return error;
        }
    
      };
    
      patch = async(url,data) => {
        try {
          const response = await axios.patch(url,data);
          return response;
        } catch (error) {
          return error;
        }
      };
    
      delete = async(url,data) => {
        try {
          const response = await axios.delete(url,data);
          return response;
        } catch (error) {
          return error;
        }
      };
    
      cancel() {
        const abortHandler = new AbortController();
        abortHandler.abort();
      }
}

export default  new Api();