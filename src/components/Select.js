import React from "react";
import { 
  MenuItem,
  InputLabel,
  Box, 
  Select,
    FormControl,
    
} from "@mui/material";

const Selects = ({ label, items, value, setValue }) => {
  return (
    <Box sx={{ minWidth: 80,mt:1 }}>
      <FormControl fullWidth sx={{mt:.2}}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          value={value}
                  onChange={(e) =>  setValue(e.target.value)}
        >
          {items?.map((item, index) => (
              <MenuItem key={index} value={index}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selects;
