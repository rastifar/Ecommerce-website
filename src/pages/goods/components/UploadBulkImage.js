import React, { useEffect } from "react";
//--------------Material
import { Grid, Button, Box, Typography } from "@mui/material";
//--------------Material-Icon
import CollectionsTwoToneIcon from "@mui/icons-material/CollectionsTwoTone";
//--------------Formik
import { useFormikContext } from "formik";
//--------------Images
import Images from "../../../assets/index";
//--------------Api
import { uploadBuldImages } from "../../../api/goodsApi";
//--------------Componet
import Preview from "./Preview";
//--------------Redux
import { useSelector } from "react-redux";

let tempArray = [];

const UploadBulkImage = ({ values }) => {
  const images = useSelector((state) => state.tempData.data.images);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    images && (tempArray = [...images]);
  }, [images]);

  useEffect(() => {
    return () => {
      tempArray = [];
    };
  }, []);
  // to upload gallary images
  const handleBulkImageChange = async (e) => {
    const imagesFile = Array.from(e.target.files);
    const imageArray = await uploadBuldImages(imagesFile);
    tempArray.push(...[...imageArray]);
    setFieldValue("images", tempArray, true);
  };

  // to delete images in the gallary
  const handleDeleteImage = (value) => {
    const newArray = tempArray.filter((item) => {
      return item !== value;
    });
    tempArray = newArray;
    setFieldValue("images", tempArray, true);
  };

  return (
    <>
      <Grid item xs={12} sx={{ mx: 1, mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          fullWidth={true}
          component="label"
          color="success"
        >
          <Typography>بارگذاری عکس گالری</Typography>
          <input
            accept="image/jpg,image/jpeg"
            type="file"
            id="gallery"
            name="gallery"
            hidden
            multiple
            onChange={(e) => {
              handleBulkImageChange(e);
            }}
          />
          <CollectionsTwoToneIcon sx={{ mr: 4, my: 1 }} />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box
          style={{
            backgroundImage: `url(${Images.Preview})`,
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
            {values.values.images
              ? values.values.images.map((item, index) => (
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
    </>
  );
};

export default UploadBulkImage;
