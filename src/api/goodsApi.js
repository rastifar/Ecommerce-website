import HttpService from "../services/httpService";
import { PRODUCTS } from "../constants/apiConst";
import { toast } from "react-toastify";
import httpService from "../services/httpService";

const getAllProducts = async (sortOrder) => {
  try {
    const response = await HttpService.get(PRODUCTS + sortOrder);
    return response.data;
  } catch (error) {
    toast.error("خطایی در بارگذاری اطلاعات محصول رخ داده است");
  }
};
const deleteProductById = async (productId) => {
  try {
    const response = await httpService.delete(PRODUCTS + `/${productId}`);
    if (response.status == 200 || response.status == 201) {
      toast.success("محصول با موفقیت حذف شده است");
    }
  } catch (error) {
    toast.error("خطایی در حذف محصول روی داده است لطفادوباره امتحان کنید");
  }
};

const editProductByid = async (productId, values) => {
  try {
    const response = await HttpService.patch(
      PRODUCTS + `/${productId}`,
      values,
      {
        "Content-Type": "application/json",
      }
    );
    if (response.status == 200 || response.status == 201) {
      toast.success("اطلاعات با موفقیت به روز رسانی شده است");
    }
  } catch (error) {
    toast.error("عملیات به درستی انجام نشده است");
  }
};
const createProduct = async (values) => {
  try {
    const response = await httpService.post(PRODUCTS, values);
    if (response.status == 200 || response.status == 201) {
      toast.success("اطلاعات با موفقیت ثبت شده است");
    }
  } catch (error) {
    toast.error("عملیات به درستی انجام نشده است");
  }
};

export {
  getAllProducts,
  deleteProductById,
  createProduct,
  editProductByid,
};
