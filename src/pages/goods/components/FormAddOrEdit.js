import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../assets/images/preview.jpg";
import { caterories } from "../../../constants/formsConst";
import RecentActorsTwoToneIcon from "@mui/icons-material/RecentActorsTwoTone";
import CollectionsTwoToneIcon from "@mui/icons-material/CollectionsTwoTone";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Preview from "./Preview";
import api from "../../../api/api";
import { BASE_URL, UPLOAD } from "../../../constants/apiConst";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
  name: yup.string().required(" فیلد ضروری است"),
  price: yup
    .number("فقط اعداد مجاز هستند")
    .required(" فیلد ضروری است")
    .test("عددی مثبت وارد کنید", (value) => value >= 0),
  count: yup
    .number("فقط اعداد مجاز هستند")
    .required(" فیلد ضروری است")
    .test("عددی مثبت وارد کنید", (value) => value >= 0),
  wieght: yup
    .number("فقط اعداد مجاز هستند")
    .required(" فیلد ضروری است")
    .test("عددی مثبت وارد کنید", (value) => value >= 0),
  category: yup.string().required(" فیلد ضروری است"),
  image: yup.mixed().required("فیلد ضروری است"),
});
let tempArray = [];

const FormAddOrEdit = ({ data, onClose,getData }) => {
  const ckEditorRef = useRef("");
  const token = useSelector((state) => state.token);
 

  useEffect(() => {
    data && (ckEditorRef.current = data.description);
   
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data.name || "",
      price: data.price || "",
      count: data.count || "",
      wieght: data.wieght || "",
      category: data.category || "",
      image: data.image || "",
      images: data.images || [],
      description: data.description || "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("values", values);
      const formData = new FormData();
      Object.entries(values).map((key, value) => {
        if (key[0] === "images") {
          key[1].map((item, index) => {
            formData.append(`images[${index}]`, item);
          });
        } else if (key[0] === "description") {
          formData.append("description", ckEditorRef.current);
        } else {
          formData.append(key[0], key[1]);
        }
      });

      if (data) {
        console.log("data in updat ", data);
        console.log("in data part :", values, data);
        formData.append("id", data.id);
        axios
          .patch(`http://localhost:3002/products/${data.id}`, formData, {
            headers: { token: token },
            "Content-Type": "multipart/form-data",
          })
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              toast.success("اطلاعات با موفقیت به روز رسانی شده است");
            }
          })
          .catch((err) => toast.error("عملیات به درستی انجام نشده است"));
      } else {
        axios
          .post("http://localhost:3002/products", formData)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              console.log('if');
              toast.success("اطلاعات با موفقیت ثبت شده است");
            }
          })
          .catch((err) => toast.error("عملیات به درستی انجام نشده است"));
      }

      data = "";
      tempArray = [];
      getData();
      onClose();
      resetForm({ values: "" });
    },
    validationSchema,
  });

  const handleChange = async (e) => {
    const data = e.target.files[0];
    const formData = new FormData();
    formData.append("image", data);
    const filename = await axios.post("http://localhost:3002/upload", formData);
    console.log(filename.data.filename);
    formik.setFieldValue("image", filename.data.filename, true);
  };

  const handleBulkImageChange = async (e) => {
    console.log("handlebulk enterd");
    const files = Array.from(e.target.files);
    console.log(files);
    let temp = [];
    files.map((item) => {
      const formData = new FormData();
      formData.append("image", item);
      const tempRequest = axios.post("http://localhost:3002/upload", formData);
      temp.push(tempRequest);
    });

    const arrayResponse = await Promise.all(temp);

    const resultArray = arrayResponse.map(function (item) {
      return item["data"]["filename"];
    });

    tempArray.push(...[...resultArray]);
    formik.setFieldValue("images", tempArray, true);
  };

  const handleDeleteImage = (value) => {
    const newArray = tempArray.filter((item) => {
      return item != value;
    });
    tempArray = newArray;
    formik.setFieldValue("images", tempArray, true);
  };

  return (
    <Box>     
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ border: "1px solid black", borderRadius: "5px" }}
      >
        <Grid container sx={{ my: 2 }} >
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              component="label"
              color="success"
              sx={{ m: 1 }}
              value={formik.values.image}
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
                  handleChange(e);
                }}
              />
              <RecentActorsTwoToneIcon sx={{ mr: 4, my: 1 }} />
            </Button>
            <Box
              sx={{
                fontFamily: "IRANSansWeb",
                fontSize: ".8rem",
                marginRight: "1rem",
                color: "gray",
              }}
            >
              {formik.errors.image &&
                formik.touched.image &&
                formik.errors.image}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
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
              {formik.values.image ? (
                <Preview src={formik.values.image} bulk={false} />
              ) : (
                ""
              )}
            </Box>
          </Grid>
          {/* </Grid> */}
          {/* <Grid container spacing={1}> */}
          <Grid item xs={12} sm={5} md={2} mx={{xs:2,sm:1}}>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              id="name"
              name="name"
              placeholder="نام کالا"
              label="نام کالا"
              autoComplete="name"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.name}
              helperText={
                formik.errors.name && formik.touched.name && formik.errors.name
              }
            />
          </Grid>
          <Grid item xs={12} sm={5} md={2} mx={{xs:2,sm:1}}>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="price"
              placeholder="قیمت"
              label="قیمت"
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
          <Grid item xs={12} sm={5} md={2} mx={{xs:2,sm:1}}>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="count"
              placeholder="تعداد"
              label="نعداد"
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
          {/* </Grid> */}
          {/* <Grid container spacing={1}> */}
          <Grid item xs={12} sm={5} md={2} mx={{xs:2,sm:1}}>
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="wieght"
              placeholder="وزن"
              label="وزن"
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
          <Grid item xs={12} sm={5} md={2} mx={{xs:2,sm:1}}>
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
          {/* </Grid> */}

          {/* <Grid container sx={{ my: 4 }}> */}
          <Grid item xs={12} sx={{ mx: 1,mt:1 }}>
            <Button
              // sx={{ my: 1 }}
              size="small"
              variant="outlined"
              fullWidth={true}
              component="label"
              color="success"
              value={formik.values.images}
            >
              <Typography>بارگذاری عکس گالری</Typography>

              <input
                accept="image/jpg,image/jpeg"
                type="file"
                id="gallery"
                name="gallery"
                required
                hidden
                multiple
                onChange={(e) => {
                  handleBulkImageChange(e);
                }}
              />
              <CollectionsTwoToneIcon sx={{ mr: 4, my: 1 }} />
            </Button>
            <span>
              {formik.errors.gallery &&
                formik.touched.gallery &&
                formik.errors.gallery}
            </span>
          </Grid>
          <Grid
            item
            xs={12} 
           
          >
            <Box  style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              color: "#f5f5f5",
              marginRight: "auto",
            }} sx={{
              
              bgcolor: "lightgray",
              m: 1,              
              width: "98%",
              minHeight: "10rem",
              border: "2px dashed black",
            }}><Grid container display={'flex'}>
            {formik.values.images
                ? formik.values.images.map((item, index) => (
                <Grid item sx={{m:.5}}  key={index}>
                  <Preview
                    src={item}
                   
                    handleDeleteImage={handleDeleteImage}
                    bulk={true}
                    />
                    </Grid>
                ))
                  : ""}
                </Grid>
              </Box>
          </Grid>
          {/* </Grid> */}
          {/* <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        > */}
          <Grid item xs={12} >
            <Box sx={{mx:1}}>
            <CKEditor
              editor={ClassicEditor}
              data={ckEditorRef.current}
              //   onReady={ editor => {
              //     // You can store the "editor" and use when it is needed.
              //     ckeditordata = editor;
              //     console.log( 'Editor is ready to use!', editor );
              // } }
              //onChange={inputHandler}
              onChange={(event, editor) => {
                ckEditorRef.current = editor.getData();
              }}
              />
              </Box>
          </Grid>
          {/* </Grid> */}
         
          <Button
            type="submit"
            fullWidth={true}
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 , mx:1 }}
          >
            ذخیره
            </Button>
           
        </Grid>
      </Box>
    </Box>
  );
};

export default FormAddOrEdit;
