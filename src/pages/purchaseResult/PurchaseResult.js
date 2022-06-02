import React, { useEffect } from "react";
//--------Material
import { Typography, Box } from "@mui/material";
//--------ReactRouter
import { useLocation } from "react-router-dom";
//----------Image
import successImage from "../../assets/images/success.png";
import failureImage from "../../assets/images/failure.jpg";
//---------Redux
import { useDispatch, useSelector } from "react-redux";
import {clearCart} from '../../redux/cartSlice'
//----------Api
import api from "../../api/api";
import axios from "axios";
//----------Toast
import { toast } from 'react-toastify'

import { BASE_URL, ORDERS, PRODUCTS } from "../../constants/apiConst";

const PurchageResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const cartData = useSelector((state) => state.cart.cartItems);
  const purchaseResult = location.search.split("=")[1];
  console.log(cartData);
  useEffect(() => {
    if (purchaseResult === "success") {
      try {
        handleUpdateOrders();
        handleInventories();
        handlecartItems();
      } catch (error) {
        toast.error('خطایی روی داده است')
      }
    }
  }, []);

  const handleUpdateOrders = async() => {
    const order = JSON.parse(localStorage.getItem("orders"));
    console.log(order);
    const result = await api.post(BASE_URL + ORDERS, order)
    //api.post(BASE_URL + ORDERS, order).then(res=>localStorage.removeItem('orders'))
    
  };
  const handleInventories = () => {
    const tempArray = [];
    cartData.map(async (item) => {
      const updatedMaxCount = Number(item.count) - item.quantity;
      const response = await api.patch(
        BASE_URL + PRODUCTS + `/${item.id}`,
        { count: updatedMaxCount },
        {
          headers: { token: token },
          "Content-Type": "application/json",
        }
      );
      console.log(response);
    });
  };
  const handlecartItems = () => {
    dispatch(clearCart())
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography sx={{ fontSize: "1.5rem" }}>نتیجه پرداخت</Typography>
      {purchaseResult === "success" ? (
        <Box display={"flex"} sx={{ p: 10 }}>
          <img
            src={successImage}
            alt="sucess image"
            style={{ width: "10rem", m: 3, display: "inline-block" }}
          />

          <Typography sx={{ m: 5 }}>
            با تشکر از پرداخت شما، سفارش شما ثبت شده و جهت هماهنگی ارسال با شما
            تماس گرفته خواهد شد
          </Typography>
        </Box>
      ) : (
        <Box display={"flex"} sx={{ p: 10 }}>
          <img
            src={failureImage}
            alt="failure image"
            style={{ width: "10rem", m: 3, display: "inline-block" }}
          />
          <Typography sx={{ m: 5 }}>
            پرداخت موفقیت آمیز نبود.سفارش شما در انتظار پرداخت است
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PurchageResult;
