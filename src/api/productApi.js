import HttpService from "../services/httpService";
import { BASE_URL, ORDERS, PRODUCTS } from "../constants/apiConst";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";



const getProductById =async (productid) => {  
    try {
        const response = await HttpService.get(PRODUCTS + `/${productid}`)
        console.log(response.data);
      return response.data
    } catch (error) {
      toast.error("خطایی در بارگذاری اطلاعات محصول رخ داده است")
    }
};

const patchRatingProductById = async (val, productid) => {   
  
    HttpService
    .patch(
     PRODUCTS + `/${productid}`,
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
export { getProductById,patchRatingProductById };
