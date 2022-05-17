import { Container, Grid, Slider } from "@mui/material";
import { Box } from "@mui/system"; 
import React from "react";
import image1 from "../../assets/images/h1s.png";
import image2 from "../../assets/images/h2s.png";
import image3 from "../../assets/images/h3s.png";
import image4 from "../../assets/images/h4s.png";
import CompanyMsgCard from "./components/CompanyMsgCard";

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
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Grid container  sx={{ placeItems: "center" }}>
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
      </Box>
    </div>
  );
};

export default Home;
