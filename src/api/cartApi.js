import HttpService from "../services/httpService";
import { ORDERS, PRODUCTS} from "../constants/apiConst";
import { toast } from "react-toastify";


const sendOrderToDatabase = async (orderItem) => {
  
  try {
    const response = await HttpService.post(ORDERS, orderItem);
    return response;
  } catch (error) {
    toast.error("خطایی در ثبت سفارش کاربر رخ داده است");
  }
};
const updatOrderStatus = async (orderId, orderStatus) => {
  try {
    await HttpService.patch(ORDERS + `/${orderId}`, {
      orderStatus: orderStatus,
    });
  } catch (error) {
    toast.error("در بروز رسانی وضعیت سفارش مشتری خطایی رخ داده است");
  }
};
const deleteOrder = async (orderId) => {
    try {
        await HttpService.delete(ORDERS+`/${orderId}`)        
    } catch(error) {
        toast.error('خطایی در حذف سفارش روی داده است')
    }
}
const deleteInventoryCount = async (productId,updatedMaxCount) => {
    try {
        await HttpService.patch(PRODUCTS+`/${productId}`,{count: updatedMaxCount})
    } catch (error) {
        toast.error('خطایی در بروز رسانی موجودی محصول ایجاد شده است')
    }
}
export { sendOrderToDatabase,updatOrderStatus,deleteOrder,deleteInventoryCount };
