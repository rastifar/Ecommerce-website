import React, { useState } from "react";
//----ckEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//----axios
import axios from "../api/httpRequestApi";
//----formik
import { useFormik } from "formik";
import * as yup from "yup";
//----toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//----material
import {
  Container,
  Typography,
  Box,
  TextField,
  CssBaseline,
  Button,
  MenuItem,
  Select,
  InputBase,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecentActorsTwoToneIcon from "@mui/icons-material/RecentActorsTwoTone";
import CollectionsTwoToneIcon from "@mui/icons-material/CollectionsTwoTone";
//const
import { FILE_SIZE } from "../constants/imageSize";
import { SUPPORTED_FORMATS } from "../constants/imageSize";
import { BASE_URL } from "../constants/apiConst";

const theme = createTheme();

//-------------------------------

const validationSchema = yup.object().shape({
  productname: yup.string().required(" فیلد ضروری است"),
  category: yup.string().required(" فیلد ضروری است"),
  // thumbnail: yup
  //   .mixed()
  //   .required("A file is required")
  //   .test(
  //     "fileSize",
  //     "File too large",
  //     (value) => value && value.size <= FILE_SIZE
  //   )
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     (value) => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
  // gallery: yup
  //   .mixed()
  //   .required("A file is required")
  //   .test(
  //     "fileSize",
  //     "File too large",
  //     (value) => value && value.size <= FILE_SIZE
  //   )
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     (value) => value && SUPPORTED_FORMATS.includes(value.type)
  //   ),
  signator_text: yup.string().min(1).max(150).required("فیلد ضروری است"),
});

const categories = [
  {
    value: "1",
    label: " میوه و سبزی تازه ",
  },
  {
    value: "2 ",
    label: "میوه و سبزی منجمد ",
  },
  {
    value: "3",
    label: "نوشیدنی",
  },
];

export default function AddEditForm({ formData }) {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkFtaXIgaG9zc2VpbiBNYWhkaW91biIsImlhdCI6MTY1Mjg1ODYxNSwiZXhwIjoxNjUyODY5NDE1fQ.wc_Qvrm061WOQJr4afkvyaC5BoQBdjKrX8XJSD5yUbY";

  const formik = useFormik({
    initialValues: {
      productname: formData.name ? formData.name : "",
      category: formData.category ? formData.category : "",
      thumbnail: formData.image ? formData.image : "",
      gallery: formData.images ? formData.images : "",
     
    // signator_text: formData.description ? formData.description : "",
    },
    onSubmit: (values) => {
      const pic = values.gallery;
      console.log("finish", values);
      console.log("pic", pic);
      axios
        .post("http://localhost:3002/upload", pic, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => console.log(res.data));
      // const fd = new FormData();
      // fd.append("signator_text", values.signator_text);
      //   setTimeout(() => {
      //     axios
      //       .post("http://localhost:3002/auth/login", values)
      //       .then((res) => {
      //         toast.success("اطلاعات با موفقیت ثبت شده");
      //         localStorage.setItem("token", res.data.token);
      //         if (res.status == 200) {
      //         }
      //       })
      //       .catch((err) =>
      //         toast.error("لطفا تمامی فیلدها را به درستی وارد کنید", {
      //           position: "top-center",
      //           autoClose: 5000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           progress: undefined,
      //         })
      //       );
      //   }, 1000);
    },
    validationSchema,
  });

  const inputHandler = (event, editor) => {
    formik.setFieldValue("signator_text", editor.getData());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" sx={{ mt: 0 }}>
        <CssBaseline />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Typography
            component="h1"
            sx={{ color: "green" }}
            variant="body1"
            align="right"
          >
            افزودن / ویرایش کالا
          </Typography> */}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            overflow="hidden"
          >
          <Button
              // sx={{ my: 1 }}
              size="large"
              variant="outlined"
              fullWidth={true}
              component="label"
              color="success"
            >
              {/* <InputBase 
                    label="تصویر" 
                    type='file'
                    sx={{mx:4}}
                    style={{alignSelf: 'flex-end'}}
                /> */}
              بارگذاری عکس بندانگشنی
              <input
                accept="image/*"
                type="file"
                hidden
                id="thumbnail"
                name="thumbnail"
                required
                onChange={formik.handleChange}
                // value={formik.values.thumbnail}
              />
              <RecentActorsTwoToneIcon sx={{ mr: 4, my: 1 }} />
            </Button>
            <TextField
              // sx={{px:10}}
              margin="dense"
              size="small"
              required
              fullWidth={true}
              id="productname"
              name="productname"
              placeholder="نام کالا"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.productname}
              helperText={
                formik.errors.productname &&
                formik.touched.productname &&
                formik.errors.productname
              }
            />
            <TextField
              select
              // sx={{px:10}}
              margin="dense"
              size="small"
              id="category"
              name="category"
              required
              fullWidth={true}
              placeholder="دسته بندی"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.category}
              helperText={
                formik.errors.category &&
                formik.touched.category &&
                formik.errors.category
              }
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              // sx={{ my: 1 }}
              size="large"
              variant="outlined"
              fullWidth={true}
              component="label"
              color="success"
            >
              بارگذاری عکس گالری
              <input
                accept="image/*"
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

            {/* <CKEditor
              editor={ClassicEditor}
              data=""
              value={formik.values.signator_text}
              id="signator_text"
              name="signator_text"
              onChange={inputHandler}
            /> */}

            <TextField
              // sx={{px:10}}
              margin="dense"
              size="small"
              required
              fullWidth={true}
              id="description"
              name="description"
              placeholder="توضیحات"
              color="success"
              multiline
              rows={4}
              onChange={formik.handleChange}
              value={formik.values.description}
              helperText={
                formik.errors.description &&
                formik.touched.description &&
                formik.errors.description
              }
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              ذخیره
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
