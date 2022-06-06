import React, { useEffect, useState } from "react";
import { MenuItem, InputLabel, Box, Select, FormControl } from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";

const Selects = ({ label, items }) => {
  console.log(items);
  const location = useLocation();
  const currentLocation = location.pathname.split("/").pop();
  useEffect(() => {
    setValue('')
  }, [currentLocation]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');

  return (
    <Box sx={{ minWidth: 80, mt: 1 }}>
      <FormControl fullWidth sx={{ mt: 0.2 }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          value={value}
          onChange={(e) => {
            {
              setValue(e.target.value);
              setSearchParams(e.target.value);
            }
          }}
        >
          {items?.map((item, index) => (
            <MenuItem key={index} value={item.link}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selects;
