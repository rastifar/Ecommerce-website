import React, { useEffect, useState } from "react";
import { Container, Grid, Slider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

//images

import image1 from "../../assets/images/h1s.png";
import image2 from "../../assets/images/h2s.png";
import image3 from "../../assets/images/h3s.png";
import image4 from "../../assets/images/h4s.png";
import homeImage from "../../assets/images/homePage.jpg";
import cat2 from "../../assets/images/fr2.png";
import cat5 from "../../assets/images/f2.png";
import cat6 from "../../assets/images/s2.png";

//components
import CompanyMsgCard from "./components/CompanyMsgCard";
import { splitArrayOfImage } from "../../utils/utils";


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
      .then((res) => setImage(splitArrayOfImage(res.data.image)));
  }, []);

  // splitArrayOfImage(image)
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Grid container sx={{ placeItems: "center" }} direction="column">
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
          <Grid container direction='row'>
          {topMsg.map((i) => (
            <Grid key={i.title} item xs={12} md={6} lg={3}>
              <CompanyMsgCard
                image={i.image}
                title={i.title}
                description={i.description}
                
              />
            </Grid>
          ))}
            </Grid>
        
          <Grid item sx={{my:5}}>
            <Typography variant="h4" component="h3">دسته بندی های انار سبز</Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <CompanyMsgCard
                  image={cat2}
                  title="میوه و سبزی تازه"                 
                />
             
              </Grid>
              <Grid item>
              <CompanyMsgCard
                  image={cat5}
                  title="میوه و سبزی منجمد"                 
                />
              
              </Grid>
              <Grid item>
              <CompanyMsgCard
                  image={cat6}
                  title="انواع نوشیدنی "                
                />
             
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
