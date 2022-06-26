import React from "react";
//--------------Material
import { TextField, MenuItem } from '@mui/material'
//--------------Formik
import { useField, useFormikContext } from "formik";

const SelectWraper = ({ name, options, ...otherProps }) => {
    const { setFieldValue } = useFormikContext()
    const [field, meta] = useField(name);

    const handleChange = (event) => {
        const { value } = event.target
        setFieldValue(name,value)
    }

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        margin: "dense",
        size: "small",    
        fullWidth: true,
        color: "success",
        onChange:handleChange
    }
    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }
    return (<TextField {...configSelect}>
        {options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
            {item.label}
            </MenuItem>
      ))}
  </TextField>)
};

export default SelectWraper;
