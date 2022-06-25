import React from "react";
//--------------Material
import { Grid, Button, Box } from "@mui/material";
//--------------Material-Icon
import RecentActorsTwoToneIcon from "@mui/icons-material/RecentActorsTwoTone";
//--------------Formik
import { ErrorMessage, useFormikContext } from "formik";
//-------------Images
import Images from "../../../assets/index";
//--------------Api
import { uploadSingleImage } from "../../../api/goodsApi";
//--------------Componet
import Preview from "./Preview";

const UploadSingleImage = ({ values }) => { 

  // to uplaod single product image
  const handleChange = (e) => {
    const imageFile = e.target.files[0];
    uploadSingleImage(imageFile).then((res) =>
      values.setFieldValue("image", res.data.filename, true)
    );
  };
  return (
    <Grid
      container
      sx={{
        my: 2,
        display: "flex",
        alignItems: "center",       
        justifyContent: { sm: "space-around", md: "space-between" },
      }}
    >
      <Grid item xs={12} sm={4}>
        <Button
          variant="outlined"
          component="label"
          color={( values.errors.image) ? "error" : "success"}
          sx={{ m: 1 }}          
        >
          بارگذاری عکس بندانگشنی
          <input
            accept="image/jpg,image/jpeg"
            type="file"
            hidden
            id="thumbnail"
            name="thumbnail"
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
            color: "#DA5050",
            ml:2           
          }}
        >      
        <ErrorMessage name="image"/>      
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          style={{
            backgroundImage: `url(${Images.Preview})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "6rem",
            height: "6rem",
            color: "#f5f5f5",
            marginRight: "auto",
          }}
          mx={{ xs: "auto", sm: "auto", md: 2 }}       
        >
          {values.values.image ? (
            <Preview src={values.values.image} bulk={false} />
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UploadSingleImage;
