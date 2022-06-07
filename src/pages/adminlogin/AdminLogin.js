import React, { useState } from "react";
import usePost from "../../hooks/usePost";
import axios from "../../api/httpRequestApi"
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { adminloggedIn } from "../../redux/adminSlice";
import { addToken } from "../../redux/tokenSlice";
import { useDispatch } from "react-redux";

import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import image from "../../assets/images/pomegranate1.png";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const validationSchema = yup.object().shape({
  username: yup.string().required(" فیلد ضروری است"),
  password: yup.string().required(" فیلد ضروری است"),
  // password: yup.string().min(3," طول رمز کوتاه است"),
});

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setTimeout(() => {
        // axiosPost({ method: "POST", url: "/auth/login", data: values }).then(
        //   (res) => {
        //     console.log(res.token)
        //     localStorage.setItem("token", res.data.token);
        //     if (res.status == 200) {
        //       navigate("/dashboard", { replace: false });
        //     }
        //   }
        // ).catch((err) => console.log(err));

        axios
          .post("http://localhost:3002/auth/login", values)
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              toast.success("خوش آمدید");
              localStorage.setItem("token", res.data.token);
              dispatch(addToken(res.data.token));
              navigate("/dashboard", { replace: false });
            }
          })
          .catch((err) =>
            toast.error("نام کاربری یا رمز عبور اشتباه است", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          );
      }, 1000);
    },
    validationSchema,
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />      
        <Box
          sx={{
            marginTop: 8,
            marginBottom:10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={image} style={{ objectFit: "contain" }} />

          <Typography component="h1" variant="h5" sx={{ color: "green" }}>
            انار سبز
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth={true}
              id="username"
              //   label="نام کاربری"
              name="username"
              placeholder="نام کاربری"
              autoComplete="username"
              autoFocus
              color="success"
              onChange={formik.handleChange}
              value={formik.values.username}
              helperText={
                formik.errors.username &&
                formik.touched.username &&
                formik.errors.username
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth={true}
              name="password"
              //   label="رمز عبور"
              placeholder="کلمه عبور"
              type="password"
              id="password"
              autoComplete="current-password"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.password}
              helperText={
                formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="success" />}
              label="مرا به خاطر بسپار"
            /> */}
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 10 }}
            >
              ورود
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
                  بازگشت به سایت
                </Link>
                <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
                محصولات
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
