import React, { useRef } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../assets/images/f2.png";
import { caterories } from "../../../constants/formsConst";
import RecentActorsTwoToneIcon from "@mui/icons-material/RecentActorsTwoTone";
import CollectionsTwoToneIcon from "@mui/icons-material/CollectionsTwoTone";
import CloseIcon from "@mui/icons-material/Close";
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
  MenuItem,
  InputBase,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { HttpTwoTone } from "@mui/icons-material";

const validationSchema = yup.object().shape({
  productname: yup.string().required(" فیلد ضروری است"),
  price: yup.number().required(" فیلد ضروری است"),
  count: yup.number().required(" فیلد ضروری است"),
  wieght: yup.number().required(" فیلد ضروری است"),
  category: yup.string().required(" فیلد ضروری است"),
  // thumbnail: yup.string().required(" فیلد ضروری است"),
  // gallery: yup.string().required(" فیلد ضروری است"),
  description: yup.string().required(" فیلد ضروری است"),
});

const FormAddOrEdit = () => {
  const thumbnailRef = useRef("");
  const formik = useFormik({
    initialValues: {
      productname: "",
      price: "",
      count: "",
      wieght: "",
      category: "",
      thumbnail: "",
      gallery: [],
      description: "",
    },
    onSubmit: (values) => {
      setTimeout(() => {
        axios
          .post("http://localhost:3002/auth/login", values)
          .then((res) => {
            toast.success("خوش آمدید");

            // localStorage.setItem("token", res.data.token);
            if (res.status == 200) {
              // dispatch(adminloggedIn(values));
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
  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    const data = e.target.files[0]
    // const thumbnail = thumbnailRef.current.value;
    // console.log(thumbnail);
    const formData = new FormData();
    formData.append("image", data);
    // formData.append('image',e.target.files[0],'thumbnail')
    // console.log(formData);
   
    axios
      .post("http://localhost:3002/upload", formData)
      .then((res) => console.log(res)).catch(error=>console.log(error))
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt:8
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 5, border: "1px solid black", borderRadius: "5px"}}
      >
        <Grid container>
          <Grid item>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              id="productname"
              name="productname"
              placeholder="نام کالا"
              autoComplete="productname"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.productname}
              helperText={
                formik.errors.productname &&
                formik.touched.productname &&
                formik.errors.productname
              }
            />
          </Grid>
          <Grid item>
            {" "}
            <TextField
               margin="dense"
              size="small"
              required
              fullWidth={true}
              name="price"
              placeholder="قیمت"
              type="price"
              id="price"
              autoComplete="current-price"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.price}
              helperText={
                formik.errors.price &&
                formik.touched.price &&
                formik.errors.price
              }
            />
          </Grid>
          <Grid item>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="count"
              placeholder="تعداد"
              type="count"
              id="count"
              autoComplete="current-count"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.count}
              helperText={
                formik.errors.count &&
                formik.touched.count &&
                formik.errors.count
              }
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
               margin="dense"
               size="small"
               required
              fullWidth={true}
              name="wieght"
              placeholder="وزن"
              type="wieght"
              id="wieght"
              autoComplete="current-wieght"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.wieght}
              helperText={
                formik.errors.wieght &&
                formik.touched.wieght &&
                formik.errors.wieght
              }
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              select
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="category"
              placeholder="دسته بندی"
              type="text"
              label="دسته بندی"
              id="category"
              autoComplete="current-category"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.category}
              helperText={
                formik.errors.category &&
                formik.touched.category &&
                formik.errors.category
              }
            >
              {caterories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ width: "2rem", height: ".3rem", background: "lightGreen" }}
          >
            <Button
              variant="outlined"
              fullWidth={true}
              component="label"
              color="success"
              //  sx={{mx:2}}
              helperText={
                formik.errors.thumbnail &&
                formik.touched.thumbnail &&
                formik.errors.thumbnail
              }
            >
              بارگذاری عکس بندانگشنی
              <input
                accept="image/jpg,image/jpeg"
                type="file"
                hidden
                id="thumbnail"
                name="thumbnail"
                required                    
                onChange={(e) => {
                  // thumbnailRef.current = e.target.files[0]
                  handleChange(e)                 
                  formik.handleChange(e)
                }}
                value={formik.values.thumbnail}
              />
              <RecentActorsTwoToneIcon sx={{ mr: 4, my: 1 }} />
            </Button>
          </Grid>
          <Grid item xs={12} md={7} sx={{ width: "2rem", height: "5rem" }}>
            <Box
              fullWidth={true}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "6rem",
                height: "6rem",
                color: "#f5f5f5",
                marginRight: "auto",
              }}
            >
              <Box component="span" sx={{ color: "red" }}>
                <CloseIcon />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Button
              // sx={{ my: 1 }}
              size="large"
              variant="outlined"
              fullWidth={true}
              component="label"
              color="success"
              helperText={
                formik.errors.gallery &&
                formik.touched.gallery &&
                formik.errors.gallery
              }
            >
              <Typography>بارگذاری عکس گالری</Typography>
              (حداکثر 3 عکس)
              <input
                accept="image/jpg,image/jpeg"
                type="file"
                id="gallery"
                name="gallery"
                required
                hidden
                onChange={formik.handleChange}
                value={formik.values.gallery}
              />
              <CollectionsTwoToneIcon sx={{ mr: 4, my: 2 }} />
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <TextField
              margin="normal"
              multiline
              required
              fullWidth={true}
              placeholder="توضیحات"
              name="description"
              type="description"
              id="description"
              autoComplete="current-description"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.description}
              helperText={
                formik.errors.description &&
                formik.touched.description &&
                formik.errors.description
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth={true}
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
        >
          افزودن
        </Button>
      </Box>
    </Box>
  );
};

export default FormAddOrEdit;
