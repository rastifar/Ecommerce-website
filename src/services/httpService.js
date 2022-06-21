import axios from "axios";
import { AUTH_LOGIN, BASE_URL, ORDERS } from "../constants/apiConst";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

class HttpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.timeout = 2000;
    axios.interceptors.request.use(
      (config) => {
        // const token = useSelector((state) => state.token);
        const token = localStorage.getItem("token");
        if (config.url !== AUTH_LOGIN) {
          config.headers["token"] = `${token}`;
        }
        return config;
      },
      (error) => {
        toast.error(error.response.data);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        if (response.statusCode === 401) {
          toast.error("شما دسترسی لازم برای این کار را ندارید");
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  get(url, config) {
    return axios.get(url, config);
  }

  post(url, data, config) {
    return axios.post(url, data, config);
  }

  put(url, data, config) {
    return axios.put(url, data, config);
  }

  patch(url, data, config) {
    return axios.patch(url, data, config);
  }

  delete(url, config) {
    return axios.delete(url, config);
  }
}

export default new HttpService();
