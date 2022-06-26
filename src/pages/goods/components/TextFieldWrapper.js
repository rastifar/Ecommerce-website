import React from "react";
//--------------Material
import { TextField, Box } from "@mui/material";
//--------------Formik
import { useField } from "formik";


 const TextFieldWrapper = ({ name, ...otherProps }) => {
//const TextFieldWrapper = ({ name, label, type = "text", required = false }) => {
  // return (
  //   <Box sx={{ my: "2" }} noValidate>
  //     <Field
  //       required={required}
  //       autoComplete="off"
  //       as={TextField}
  //       label={label}
  //       margin="dense"
  //       size="small"
  //       name={name}
  //       fullWidth
  //       type={type}
  //       helperText={<ErrorMessage name={name} />}
  //     />
  //   </Box>
  // );
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    margin: "dense",
    size: "small",    
    fullWidth: true,
    color: "success",
  };
  if (meta && meta.touched && meta.error) {
     configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return <TextField {...configTextField}  />;
};

export default TextFieldWrapper;
