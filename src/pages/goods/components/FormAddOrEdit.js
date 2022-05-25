import React, { useRef } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../assets/images/f2.png";
import { caterories } from "../../../constants/categoryConst";
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
  name: yup.string().required(" فیلد ضروری است"),
  price: yup.number().required(" فیلد ضروری است"),
  count: yup.number().required(" فیلد ضروری است"),
  wieght: yup.number().required(" فیلد ضروری است"),
  category: yup.string().required(" فیلد ضروری است"),
  // thumbnail: yup.string().required(" فیلد ضروری است"),
  // gallery: yup.string().required(" فیلد ضروری است"),
  description: yup.string().required(" فیلد ضروری است"),
});

const FormAddOrEdit = ({ data }) => {
  const thumbnailRef = useRef("");
  const gallaryRef = useRef("");
  const formik = useFormik({
    initialValues: {
      name: data.name || "",
      price: data.price || "",
      count: data.count || "",
      wieght: data.wieght || "",
      category: data.category || "",
      image: data.image || "",
      images: data.images || [""],
      description: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();

      Object.entries(values).map((key, value) => {
        formData.append(key[0], key[1]);
      });

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      axios
        .post("http://localhost:3002/products", formData)
        .then((res) => {
          // localStorage.setItem("token", res.data.token);
          if (res.status == 200) {
            // dispatch(adminloggedIn(values));
            toast.success("اطلاعات با موفقیت ثبت شده است");
          }
        })
        .catch((err) =>
          toast.error("عملیات به درستی انجام نشده است", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
      // }, 1000);
    },
    validationSchema,
  });
  
  const handleChange = async (e) => {
    const data = e.target.files[0];
    const formData = new FormData();
    formData.append("image", data);
    const filename = await axios.post("http://localhost:3002/upload", formData);
    console.log(filename.data.filename);
    formik.setFieldValue("image", filename.data.filename, false);
   
  };

  const handleBulkImageChange = async (e) => {
    const files = Array.from(e.target.files);
    //preview(files[0]);
    console.log(files);
    let temp = [];
    files.map((item) => {
      const formData = new FormData();
      formData.append("image", item);
      const tempRequest = axios.post("http://localhost:3002/upload", formData);
      temp.push(tempRequest);
    });

    const arrayResponse = await Promise.all(temp);
    //(i) => i.data.filename
    const resultArray = arrayResponse.map(function (item) {
      return item["data"]["filename"];
    });
    console.log(resultArray);
    formik.setFieldValue("images", [resultArray], true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{  border: "1px solid black", borderRadius: "5px" }}
      >
        <Grid container>
          <Grid item>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              id="name"
              name="name"
              placeholder="نام کالا"
              autoComplete="name"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.name}
              helperText={
                formik.errors.name && formik.touched.name && formik.errors.name
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
              value={formik.values.image}
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
                onChange={async (e) => {
                  handleChange(e);
                  // const data = e.target.files[0];
                  // const formData = new FormData();
                  // formData.append("image", data);
                  // thumbnailRef.current = e.target.files[0]
                  // console.log(await handleChange(e));
                  // const value = await handleChange(e);
                  // handleChange(e);
                  // thumbnailRef.current = value;
                  //formik.handleChange(e.target.files[0])
                  // formik.setFieldValue("image", value, false);
                }}
              />
              {/* <input
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
              /> */}
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
              value={formik.values.images}
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
                multiple
                onChange={async (e) => {
                  handleBulkImageChange(e);
                  // const data = e.target.files[0];
                  // const formData = new FormData();
                  // formData.append("image", data);
                  // thumbnailRef.current = e.target.files[0]
                  // console.log(await handleChange(e));
                  // const value = await handleChange(e);
                  //   gallaryRef.current = value;
                  // handleChange(e);
                  // formik.setFieldValue("images",value, true);
                }}
              />
              <CollectionsTwoToneIcon sx={{ mr: 4, my: 2 }} />
            </Button>
          </Grid>
          <Grid item>
            {formik.images ? <Box>has</Box> : <Box>has not</Box>}
          </Grid>
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
