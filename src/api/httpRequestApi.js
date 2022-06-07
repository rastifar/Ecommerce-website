import axios from "axios";
import { BASE_URL } from "../constants/apiConst";
class HttpService {
  constructor() {
    axios.defaults.baseURL = BASE_URL;

    axios.interceptors.request.use(
      (config) => {
        // const token = useSelector((state) => state.token);
        // if (config.url !== LOGIN) {
        //   config.headers["token"] = `${token}`;
        // }
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
