import HttpService from "../services/httpService";
import { PRODUCTS } from "../constants/apiConst";
import { toast } from "react-toastify";

const getProductById = async (productId) => {
  try {
    const response = await HttpService.get(PRODUCTS + `/${productId}`);   
    return response.data;
  } catch (error) {
    toast.error("خطایی در بارگذاری اطلاعات محصول رخ داده است");
  }
};

const patchRatingProductById =  (val, productId) => {
  HttpService.patch(
    PRODUCTS + `/${productId}`,
    { favorite: val },
    {
      "Content-Type": "application/json",
    }
  )
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        toast.success("نظر شما با موفقیت ثبت شده است");
      }
    })
    .catch((error) =>
      toast.error(
        "مشکلی در ثبت نظر شمابه وجود امده است لطفا مجددا نظر خود را ثبت کنید"
      )
    );
};
export { getProductById, patchRatingProductById };
