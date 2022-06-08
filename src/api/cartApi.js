import HttpService from "../services/httpService";
import { ORDERS, PRODUCTS, UPLOAD } from "../constants/apiConst";
import { toast } from "react-toastify";
import httpService from "../services/httpService";
import Orders from "../pages/orders/Orders";

const sendOrderToDatabase = async (orderItem) => {
  console.log("inside send api");
  try {
    const response = await HttpService.post(ORDERS, orderItem);
    return response;
  } catch (error) {
    toast.error("خطایی در ثبت سفارش کاربر رخ داده است");
  }
};
const updatOrderStatus = async (orderId, orderStatus) => {
  try {
    const response = await httpService.patch(Orders + `/${orderId}`, {
      orderStatus: orderStatus,
    });
  } catch (error) {
    toast.error("در بروز رسانی وضعیت سفارش مشتری خطایی رخ داده است");
  }
};
export { sendOrderToDatabase,updatOrderStatus };
