import HttpService from "../services/httpService";
import { ORDERS } from "../constants/apiConst";
import { toast } from "react-toastify";
import { deliverdOrder } from "../constants/apiConst";

const getAllOrders = async (sortOrder) => {
  try {
    const response = await HttpService.get(ORDERS + sortOrder);
    return response.data;
  } catch (error) {
    toast.error("خطایی در بارگذاری اطلاعات محصول رخ داده است");
  }
};

const deliveredOrder = async (orderId) => {
  try {
    const response = await HttpService.patch(ORDERS + `/${orderId}`, {
      orderStatus: deliverdOrder,
      deliverdAt: +new Date(),
    });
    return response;
  } catch (error) {
    toast.error("خطایی در انجام عملیات رخ داده است");
  }
};

export { getAllOrders, deliveredOrder };
