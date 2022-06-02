import { TextField } from "@mui/material";
import React from "react";

const Filed = (props) => {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    helperText = null,
    color,
    } = props;
    
    
  return (
    <TextField
      margin="dense"
      size="small"
      color={color}
      required
      fullWidth={true}
      type="text"
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      helperText={helperText}
    />
  );
};

export default Filed;
