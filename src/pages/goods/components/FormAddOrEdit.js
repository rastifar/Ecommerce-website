import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../assets/images/preview.jpg";
import { caterories, subCategories } from "../../../constants/formsConst";
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
import axios from "axios";
import {
  editProductByid,
  createProduct,
  uploadSingleImage,
  uploadBuldImages,
} from "../../../api/goodsApi";
import Preview from "./Preview";
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
  subcategory: yup.string().required(" فیلد ضروری است"),
  image: yup.mixed().required("فیلد ضروری است"),
});
let tempArray = [];

const FormAddOrEdit = ({ data, onClose, getData }) => {
  const ckEditorRef = useRef("");
  const token = useSelector((state) => state.token);

  useEffect(() => {
    data && (ckEditorRef.current = data.description);
   data &&(tempArray = data.images)
  }, [data]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data.name || "",
      price: data.price || "",
      count: data.count || "",
      wieght: data.wieght || "",
      category: data.category || "",
      subcategory: data.subcategory || "",
      image: data.image || "",
      images: data.images || [],
      description: data.description || "",
    },
    onSubmit: (values, { resetForm }) => {
      if (data) {
        editProductByid(data.id, values);
      } else {
        createProduct(values);
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
    const imageFile = e.target.files[0];
    uploadSingleImage(imageFile).then((res) =>
      formik.setFieldValue("image", res.data.filename, true)
    );
  };
  const handleBulkImageChange = async (e) => {
    const imagesFile = Array.from(e.target.files);
    const imageArray = await uploadBuldImages(imagesFile);
    tempArray.push(...[...imageArray]);
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
        <Grid container sx={{ my: 2 }}>
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
              mx={{ xs: "auto", sm: "auto", md: 2 }}
              // sx={{mx:'auto'}}
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
          <Grid item xs={12} sm={5} md={2} mx={{ xs: 2, sm: 1 }}>
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
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              helperText={
                formik.errors.name && formik.touched.name && formik.errors.name
              }
            />
          </Grid>
          <Grid item xs={12} sm={5} md={2} mx={{ xs: 2, sm: 1 }}>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="price"
              placeholder="قیمت"
              label="قیمت"
              type="number"
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
          <Grid item xs={12} sm={5} md={2} mx={{ xs: 2, sm: 1 }}>
            {" "}
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="count"
              placeholder="تعداد"
              label="نعداد"
              type="number"
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
          <Grid item xs={12} sm={5} md={2} mx={{ xs: 2, sm: 1 }}>
            <TextField
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="wieght"
              placeholder="وزن"
              label="وزن"
              type="text"
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
          <Grid item xs={12} sm={5} md={2} mx={{ xs: 2, sm: 1 }}>
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
          <Grid item xs={12} sm={5} md={2} mx={{ xs: 2, sm: 1 }}>
            <TextField
              select
              margin="dense"
              size="small"
              required
              fullWidth={true}
              name="subcategory"
              placeholder="زیر دسته بندی"
              type="text"
              label="زیر دسته بندی"
              id="subcategory"
              autoComplete="current-subcategory"
              color="success"
              onChange={formik.handleChange}
              value={formik.values.subcategory}
              helperText={
                formik.errors.subcategory &&
                formik.touched.subcategory &&
                formik.errors.subcategory
              }
            >
              {subCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* </Grid> */}

          {/* <Grid container sx={{ my: 4 }}> */}
          <Grid item xs={12} sx={{ mx: 1, mt: 1 }}>
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
          <Grid item xs={12}>
            <Box
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                color: "#f5f5f5",
                marginRight: "auto",
              }}
              sx={{
                bgcolor: "lightgray",
                m: 1,
                width: "98%",
                minHeight: "10rem",
                border: "2px dashed black",
              }}
            >
              <Grid container display={"flex"}>
                {formik.values.images
                  ? formik.values.images.map((item, index) => (
                      <Grid item sx={{ m: 0.5 }} key={index}>
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
          <Grid item xs={12}>
            <Box sx={{ mx: 1 }}>
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
                  formik.setFieldValue("description", editor.getData(), false);
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
            sx={{ mt: 3, mb: 2, mx: 1 }}
          >
            ذخیره
          </Button>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormAddOrEdit;
