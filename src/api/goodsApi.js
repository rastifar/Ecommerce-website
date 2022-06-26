import HttpService from "../services/httpService";
import { PRODUCTS, UPLOAD } from "../constants/apiConst";
import { toast } from "react-toastify";


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
    const response = await HttpService.delete(PRODUCTS + `/${productId}`);
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
    const response = await HttpService.post(PRODUCTS, values);
    if (response.status == 200 || response.status == 201) {
      toast.success("اطلاعات با موفقیت ثبت شده است");
    }
  } catch (error) {
    toast.error("عملیات به درستی انجام نشده است");
  }
};
const uploadSingleImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const filename = await HttpService.post(UPLOAD, formData);
    return filename;
  } catch (error) {
    toast.error("خطایی در بارگذاری عکس اتفاق افتاده است");
  }
};
const uploadBuldImages = async (imagesFile) => {
  let temp = [];
  try {
    imagesFile.map((item) => {
      const formData = new FormData();
      formData.append("image", item);
      const tempRequest = HttpService.post(UPLOAD, formData);
      temp.push(tempRequest);
    });
    const arrayResponse = await Promise.all(temp);
    const resultArray = arrayResponse.map(item=>(item.data.filename));
    return resultArray;
  } catch (error) {
    toast.error("خطایی در بارگذاری عکس اتفاق افتاده است");
  }
};

export {
  getAllProducts,
  deleteProductById,
  createProduct,
  editProductByid,
  uploadSingleImage,
  uploadBuldImages,
};
