import React,{useEffect} from "react";
//-------------Formik & Yup
import { Formik, Form } from "formik";
import * as yup from "yup";
//-------------Constatnts
import {
  formInputText,
  formInputSelect,
} from "../components/addOrEditFormData";
//-------------Material
import { Box, Grid, Button } from "@mui/material";
//-------------Api
import {
  editProductByid,
  createProduct 
} from "../../../api/goodsApi";
//------------Components
import TextFieldWrapper from "./TextFieldWrapper";
import SelectWraper from "./SelectWraper";
import UploadSingleImage from "./UploadSingleImage";
import UploadBulkImage from "./UploadBulkImage";
import CKEditorWraper from "./CKEditorWraper";
//------------Redux
import { useSelector,useDispatch } from "react-redux";
import {deleteTempData} from "../../../redux/tempDataSlice"

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


const FormAddOrEdit = ({ onClose, getData }) => { 
  const dispatch = useDispatch()
  const data = useSelector(state => state.tempData.data)
  const initialValues = {
    name: data.name || "",
    price: data.price || "",
    count: data.count || "",
    wieght: data.wieght || "",
    category: data.category || "",
    subcategory: data.subcategory || "",
    image: data.image || "",
    images: data.images || [],
    description: data.description || "",
  };
  const handleSubmit = (values,{ resetForm }) => {
     if (data) {
        editProductByid(data.id, values);
      } else {
        createProduct(values);
      } 
    dispatch(deleteTempData())
    getData();
    onClose();
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >{values =>
      <Form>
        <Box sx={{ border: "1px solid gray", borderRadius: "5px" }}>
          <Grid
            container
            sx={{
              my: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: { sm: "center", md: "left" },
            }}
            >             
              <UploadSingleImage values={values}  />
            {formInputText.map((formItems) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={2}
                  mx={{ xs: 2, sm: 1 }}
                  key={formItems.name}
                >
                  <TextFieldWrapper
                    name={formItems.name}
                    label={formItems.label}
                    type={formItems.type}
                  />
                </Grid>
              );
            })}
            {formInputSelect.map((selectItems) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={2}
                  mx={{ xs: 2, sm: 1 }}
                  key={selectItems.name}
                >
                  <SelectWraper
                    name={selectItems.name}
                    options={selectItems.options}
                    label={selectItems.label}                    
                  />
                </Grid>
              );
            })}
              <UploadBulkImage values={values}  />
            <CKEditorWraper values={values}/>
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
      </Form>}
    </Formik>
  );
};

export default FormAddOrEdit;
