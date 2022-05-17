import React,{useEffect, useState} from 'react'
import { Container, Grid, Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

import image1 from "../../assets/images/h1s.png";
import image2 from "../../assets/images/h2s.png";
import image3 from "../../assets/images/h3s.png";
import image4 from "../../assets/images/h4s.png";
import homeImage from "../../assets/images/homePage.jpg";
import CompanyMsgCard from "./components/CompanyMsgCard";
import {splitArrayOfImage} from "../../utils/utils"

const topMsg = [
  { image: image4, title: "پشتیبانی", description: "7 روز هفته" },
  { image: image1, title: "کیفیت برتر ", description: "محصولات با کیفیت" },
  { image: image2, title: "همیشه تازه", description: "بسته بندی عالی محصولات" },
  {
    image: image3,
    title: "ارسال رایگان",
    description: "خریدهای بالای 300 تومان",
  },
];

const Home = () => {
  const [image, setImage] = useState();

  useEffect(() => {
    axios
    .get("http://localhost:3002/products/11")   
    .then((res) => setImage(splitArrayOfImage(res.data.image)))
  },[])

  
    // splitArrayOfImage(image)
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Grid container sx={{ placeItems: "center" }}>
          <Grid item>
            <Box
              xs={11}
              sx={{
                backgroundImage: `url(${homeImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "98vw",
                height: "100vh",
                mb: 7,
              }}
            >
              <Typography></Typography>
            </Box>
          </Grid>
          {topMsg.map((i) => (
            <Grid key={i.title} item xs={12} md={6} lg={3}>
              <CompanyMsgCard
                image={i.image}
                title={i.title}
                description={i.description}
              />
            </Grid>
          ))}
          <Grid
            container
            item
            direction="column"
            xs={12}
            sx={{ p: 2, m: 2, background: "lightGreen" }}
          >
            <Grid item>
              <Typography sx={{ borderBottom: "1px solid green" }}>
                میوه و سبزی تازه
              </Typography>
            </Grid>
            <Grid container item direction="row">
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              >
                <img sx={{width:'100px',height:'100px'}} src={"http://localhost:3002" + image} />
              </Box>
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="column"
            xs={12}
            sx={{ p: 2, m: 2, background: "lightGreen" }}
          >
            <Grid item>
              <Typography sx={{ borderBottom: "1px solid green" }}>
                میوه و سبزی منجمد
              </Typography>
            </Grid>
            <Grid container item direction="row">
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="column"
            xs={12}
            sx={{ p: 2, m: 2, background: "lightGreen" }}
          >
            <Grid item>
              <Typography sx={{ borderBottom: "1px solid green" }}>
                انواع نوشیدنی های سرد و گرم
              </Typography>
            </Grid>
            <Grid container item direction="row">
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
              <Box
                sx={{
                  background: "lightYellow",
                  width: "10vw",
                  height: "10vh",
                }}
              ></Box>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
            <Grid container>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
