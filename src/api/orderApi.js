import HttpService from "../services/httpService";
import { ORDERS} from "../constants/apiConst";
import { toast } from "react-toastify";

const getAllOrders = async (sortOrder) => {
    try {
      const response = await HttpService.get(ORDERS + sortOrder);
      return response.data;
    } catch (error) {
      toast.error("خطایی در بارگذاری اطلاعات محصول رخ داده است");
    }
};
  
export {getAllOrders}