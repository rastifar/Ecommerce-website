import React,{useRef} from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../../assets/images/f2.png";
import { caterories } from "../../../constants/formsConst";
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



const FormAddOrEdit = () => {
  const thumbnailRef = useRef("");
  
    const handleChange = (e) => {
        console.log(e.target.files[0]);
       const thumbnail = thumbnailRef.current.value
      const formData = new FormData()
      formData.append("image", thumbnail);
        console.log(formData);
       // axios.post('http://localhost:3002/upload',thumbnail).then(res=>console.log(res))
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
       
        noValidate
        sx={{ mt: 5, border: "1px solid black", borderRadius: "5px", p: 3 }}
      >
      
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ width: "2rem", height: ".3rem", background: "lightGreen" }}
          >
            <Button
              variant="outlined"
              fullWidth={true}
              component="label"
              color="success"
              //  sx={{mx:2}}
           
            >
              بارگذاری عکس بندانگشنی
              <input
                accept="image/jpg,image/jpeg"
                type="file"
                hidden
                id="thumbnail"
                name="thumbnail"
                required
                ref={thumbnailRef}
                onChange={handleChange}
               
              />
              <RecentActorsTwoToneIcon sx={{ mr: 4, my: 1 }} />
            </Button>
          </Grid>
          {/* <Grid item xs={12} md={7} sx={{ width: "2rem", height: "5rem" }}> */}
            {/* <Box
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
            </Box> */}
          {/* </Grid> */}
        </Grid>
       
        <Button
          type="submit"
          fullWidth={true}
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
        >
          ورود
        </Button>
      </Box>
    </Box>
  );
};

export default FormAddOrEdit;
