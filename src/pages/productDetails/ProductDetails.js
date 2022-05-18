import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/apiConst";
import { Button, Grid, Typography, Box } from "@mui/material";
//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
//
//icons
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";
//-----------------------

const ProductDetails = () => {
  const { productid } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3002/products/${10}`)
      .then((res) => setData(res.data));
  }, []);
  // console.log(data);
  //const [{ name:name, images:images, description:description, price:price }] = data && data[0] || [{}]
  const { name, image, description, price } = data;
  // console.log(name, image, description, price);
  // console.log(data.name);

  return (
    <div>
      <Grid
        container
        direction="column"
        spacing={1}
        alignItems="right"
        justifyContent="center"
        sx={{ mt: 10, p: 5 }}
      >
        {/* <Grid item>
          <h6>Breadkrum</h6>
        </Grid> */}

        <Grid item xs={12} container direction="row">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ minHeight: "35vh", p: 2, overflow: "hidden" }}
          >
            <img
              src={BASE_URL + image}
              style={{ width: "30vw", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={8} sx={{ minHeight: "35vh", p: 3 }}>
            <Typography variant="h4" sx={{ my: 2, mr: 2 }}>
              {name}
            </Typography>
            <Typography variant="p" sx={{ my: 2, mr: 2 }}>
              BreadKrum
            </Typography>
            <Typography variant="h6" sx={{ my: 2, mr: 2 }}>
              {price} تومان
            </Typography>
            <Box sx={{ my: 2, mr: 2 }}>
              <AddBoxTwoToneIcon sx={{ mt: 2 }} />
              <IndeterminateCheckBoxTwoToneIcon sx={{ mt: 2 }} />
            </Box>
            <Button variant="outlined" color="error">
              افزودن به سبد خرید
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ background: "lightGray", mb: 1, mx: 2 }}>
          <Typography variant="body1" sx={{ fontSize: "1.2rem", p: 2, mx: 2 }}>
            {" "}
            {description}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetails;
