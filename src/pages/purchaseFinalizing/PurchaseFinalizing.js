import React, { useEffect, useState } from "react";
//---------Formik & Yup
import { useFormik } from "formik";
import * as yup from "yup";
//----------Constants
import {pendingOrder} from "../../constants/apiConst"
//---------Material
import { Typography, Button, TextField, Box, Grid } from "@mui/material";
import { createTheme} from "@mui/material/styles";
//--------React-Router
import { useNavigate } from "react-router-dom";
//------------DatePicker
import DatePicker, {  DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/prime.css";
//-------------Redux
import { useSelector } from "react-redux";
//-------------Api
import { sendOrderToDatabase } from "../../api/cartApi";
//-------------REGEX
const phoneRegExp = /^(09)+\d{9}$/;
//-------------VALIDATION
const validationSchema = yup.object({
  firstname: yup
    .string()
    .min(3, " بسیار کوتاه است")
    .max(15, " بسیار طولانی است")
    .required("لطفا نام را وارد کنید"),
  lastname: yup
    .string()
    .min(4, " بسیار کوتاه است")
    .max(255, " بسیار طولانی است")
    .required("لطفا نام خانوادگی را وارد کنید"),
  phoneNumber: yup
    .string()
    .matches(
      /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/,
      "این شماره نامعتبر است"
    )
    .max(11, "این شماره نامعتبر است")
    .required("لطفا شماره تماس را وارد کنید"),
  address: yup
    .string()
    .min(3, "کمتر از 3 حرف مجاز نمی باشد")
    .max(250, "بیشتر از 250 حروف مجاز نمی باشد")
    .required("لطفا نشانی را وارد کنید"),
  deliveryDate: yup.number().required("لطفا تاریخ تحویل را وارد کنید"),
});
const initialValues = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  address: "",
  deliveryDate: "",
};


const PurchaseFinalizing = () => {
  const cartItems = useSelector((state) => state.cart);


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(cartItems.cartItems);
      const order = {
        customerDetail: {
          username: "admin",
          firstName: values.firstname,
          lastName: `${values.lastname}`,
          phone: values.phoneNumber,
          billingAddress: values.address,
        },
        orderNumber: values.phoneNumber,
        purchaseTotal: `${cartItems.cartTotalAmount}`,
        orderStatus:pendingOrder,
        // delivery: deliveryDate ? deliveryDate : "",
        delivery: values.deliveryDate,
        deliverdAt: "",
        orderItems: cartItems.cartItems,
      };

      const customerId = await sendOrderToDatabase(order);

      window.open(
        `http://127.0.0.1:5500/public/payment.html?totalPrice=${order.purchaseTotal}&id=${customerId.data.id}`
      );
      localStorage.setItem("orders", JSON.stringify(order));
      resetForm({ values: "" });
      //axios.post("http://localhost:3002/orders", order).then(res=>alert(res.data)).catch(error=>alert('error'))
      // console.log(values);
      // console.log(deliveryDate);
      // localStorage.setItem("Order", JSON.stringify(order));
      // window.location.href = ` http://127.0.0.1:5500/public/payment.html`;

      // window.location.href = `http://localhost:3002/parsian_payment.html?customerName=${orders.customer}&totalPrice=${orders.totalPrice}`;
    },
  });


 
  return (
    <Box sx={{ mt: 5, mb: 10 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ my: 2 }}>
        نهایی کردن خرید
      </Typography>
      <Box
        display="flex"
        noValidate
        justifyContent="center"
        alignItems="center"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={1} sx={{ width: "80%", mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="firstname"
              size="small"
              label="نام"
              type="text"
              required
              variant="outlined"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              fullWidth={true}
              margin="dense"
              color="secondary"
              helperText={
                formik.errors.firstname &&
                formik.touched.firstname &&
                formik.errors.firstname
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="lastname"
              size="small"
              label="نام خانوادگی"
              type="text"
              required
              variant="outlined"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              fullWidth={true}
              margin="dense"
              color="secondary"
              helperText={
                formik.errors.lastname &&
                formik.touched.lastname &&
                formik.errors.lastname
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address"
              size="small"
              label="آدرس"
              type="text"
              required
              multiline
              rows={4}
              variant="outlined"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth={true}
              margin="dense"
              color="secondary"
              helperText={
                formik.errors.address &&
                formik.touched.address &&
                formik.errors.address
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="phoneNumber"
              size="small"
              label=" تلفن همراه"
              type="text"
              required
              variant="outlined"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              fullWidth={true}
              margin="dense"
              color="secondary"
              helperText={
                formik.errors.phoneNumber &&
                formik.touched.phoneNumber &&
                formik.errors.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              style={{
                width: "100%",
                boxSizing: "border-box",
                height: "40px",
                marginTop: ".5rem",
              }}
              containerStyle={{
                width: "100%",
              }}
              calendarPosition="bottom-center"
              calendar={persian}
              locale={persian_fa}
              placeholder={"برای باز شدن تقویم کلیک کنید"}
              weekPicker={false}
              onChange={(e) =>
                formik.setFieldValue("deliveryDate", e.unix * 1000, true)
              }
              value={formik.values.dateDeliver}
              minDate={new DateObject({ calendar: persian })}
            />
            <Box
              sx={{
                color: "gray",
                fontFamily: "IRANSansWeb",
                fontSize: ".8rem",
              }}
            >
              {formik.errors.deliveryDate &&
                formik.touched.deliveryDate &&
                formik.errors.deliveryDate}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth={true}
              type="submit"
              variant="contained"
              //color="secondary"
              sx={{
                bgcolor: "#BDF2D5",
                mt: 2,
                "&:hover": {
                  background: "#4B8673",
                },
              }}
            >
              پرداخت
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PurchaseFinalizing;
