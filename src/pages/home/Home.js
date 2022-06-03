import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { Navigation, Pagination, Autoplay } from "swiper";
import axios from "axios";
//------------------------------images
import Images from "../../assets/index";
//components
import CompanyMsgCard from "./components/CompanyMsgCard";
import MyLink from "../../components/MyLink";
import Carousel from "./components/Carousel";

const Section = styled("section")({
  marginTop: "1.5 rem",
});

const topMsg = [
  { image: Images.Mes4, title: "پشتیبانی", description: "7 روز هفته" },
  { image: Images.Mes1, title: "کیفیت برتر ", description: "محصولات با کیفیت" },
  {
    image: Images.Mes2,
    title: "همیشه تازه",
    description: "بسته بندی عالی محصولات",
  },
  {
    image: Images.Mes3,
    title: "ارسال رایگان",
    description: "خریدهای بالای 300 تومان",
  },
];

const carouselImg = [Images.HomeSlide1, Images.HomeSlide2, Images.HomeSlide3];

const Home = () => {
  const [fruit, setFruit] = useState([]);
  const [frozen, setFrozen] = useState([]);
  const [smothie, setSmothie] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/products?category=1&_sort=id&_order=desc`)
      .then((res) => setFruit(res.data.splice(0, 6)));
    axios
      .get("http://localhost:3002/products?category=2&_sort=id&_order=desc")
      .then((res) => setFrozen(res.data.splice(0, 6)));
    axios
      .get("http://localhost:3002/products?category=3&_sort=id&_order=desc")
      .then((res) => setSmothie(res.data.splice(0, 6)));
  }, []);
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <header>
          <Carousel
            Slides={carouselImg}
            width="98vw"
            height="70vh"
            isImg={true}
            moludes={[Autoplay, Pagination]}
            slidesPerView={1}
            padding={0}
          />
        </header>

        <Section>
          <Grid container direction={"row"} sx={{ width: "100vw" }}>
            {topMsg.map((i) => (
              <Grid item key={i.title} xs={12} sm={6} lg={3}>
                <CompanyMsgCard
                  image={i.image}
                  title={i.title}
                  description={i.description}
                />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ bgcolor: "#F3F4F9", width: "100vw", py: 15 }}
          >
            <Typography variant="h4" component="h3">
              دسته بندی های انار سبز
            </Typography>
          </Box>
        </Section>
        <Section>
          <Box sx={{ mb: 2 }}>
            <MyLink to="/productgroup/1">
              <Typography sx={{ fontSize: "1.8rem", p: 2 }}>
                میوه و سبزی تازه
              </Typography>
            </MyLink>
          </Box>
          <Box>
            <Carousel
              Slides={fruit}
              width="90vw"
              height="45vh"
              isImg={false}
              moludes={[Navigation]}
              slidesPerView={4}
              padding={10}
            />
          </Box>
        </Section>
        <Section>
          <Box sx={{ mb: 2 }}>
            <MyLink to="/productgroup/2">
              <Typography sx={{ fontSize: "1.8rem", p: 2 }}>
                میوه و سبزی منجمد
              </Typography>
            </MyLink>
          </Box>
          <Box>
            <Carousel
              Slides={frozen}
              width="90vw"
              height="45vh"
              isImg={false}
              moludes={[Navigation]}
              slidesPerView={4}
              padding={5}
            />
          </Box>
        </Section>
        <Section>
          <Box sx={{ mb: 2 }}>
            <MyLink to="/productgroup/3">
              <Typography sx={{ fontSize: "1.8rem" }}>نوشیدنی</Typography>
            </MyLink>
          </Box>
          <Box>
            <Carousel
              Slides={smothie}
              width="90vw"
              height="45vh"
              isImg={false}
              moludes={[Navigation]}
              slidesPerView={4}
              padding={15}
            />
          </Box>
        </Section>
      </Box>
    </Box>
  );
};

export default Home;
