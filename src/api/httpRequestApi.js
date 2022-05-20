import { AirTwoTone } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../constants/apiConst";
import { ORDERS } from "../constants/apiConst";

// export default axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type': 'application/json' }
// });

class HttpRequestApi {
  constructor() {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.timeout = 2000;
    axios.interceptors.request.use(
      (config) => {
        if ((config.url = ORDERS)) {
          config.headers["token"] = localStorage.getItem("token");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get = async (url) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      return error;
    }
  };
  post = async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
  patch = async (url, data) => {
    try {
      const response = await axios.get(url, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
  delete = async (url, data) => {
    try {
      const response = await axios.delete(url, data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
}

export default new HttpRequestApi();
