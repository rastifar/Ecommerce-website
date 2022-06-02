import React, { useEffect, useState } from "react";
import { Container, Grid, Slider, Typography, Box } from "@mui/material";

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
//hero
import hero1 from "../../assets/images/homePage.jpg";
import hero2 from "../../assets/images/frozenHero.jpeg";
import hero3 from "../../assets/images/smoothyHero.png";

//components
import CompanyMsgCard from "./components/CompanyMsgCard";
import ProductCards from "../../components/ProductCards";
import MyLink from "../../components/MyLink";
import { splitArrayOfImage } from "../../utils/utils";

//Swiper
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css/autoplay";

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

const carouselImage = [hero1, hero2, hero3];
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
  // console.log('friut', fruit);
  // console.log('frozen', frozen);
  // console.log('smothie',smothie);
  // splitArrayOfImage(image)
  return (
    <div>
      <Box>
        <Grid container sx={{ placeItems: "center" }} direction="column">
          <Grid item sx={{ maxWidth: "lg" }}>
            <Box sx={{ width: "98vw", height: "70vh", mb: 5 }}>
              <Swiper
                dir="rtl"
                effect="fade"
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                style={{ width: "100%", height: "100%" }}
                grabCursor={true}
                spaceBetween={10}
                centeredSlides={true}
                zoom={false}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
              >
                {carouselImage?.map((img) => (
                  <SwiperSlide
                    width={"100%"}
                    height={"70vh"}
                    modules={[Autoplay, Pagination]}
                    sx={{
                      paddingTop: "100%",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div>
                      {" "}
                      <img
                        src={img}
                        style={{ width: "100vw", borderRadius: "8px" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            {/* <Box
              xs={11}
              sx={{
                backgroundImage: `url(${homeImage})`,
                backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
                objectFit:'contain',
                width: "98vw",
                height: "60vh",
                mb: 7,
              }}
            >
              <Typography></Typography>
            </Box> */}
          </Grid>
          <Grid container direction="row">
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

          <Grid item sx={{ my: 5 }}>
            <Typography variant="h4" component="h3">
              دسته بندی های انار سبز
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={1} mb={15}>
              <Grid item>
                <CompanyMsgCard
                  image={cat2}
                  title="میوه و سبزی تازه"
                  link="/productgroup/1"
                />
              </Grid>
              <Grid item>
                <CompanyMsgCard
                  image={cat5}
                  title="میوه و سبزی منجمد"
                  link="/productgroup/2"
                />
              </Grid>
              <Grid item>
                <CompanyMsgCard
                  image={cat6}
                  title="انواع نوشیدنی "
                  link="/productgroup/3"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" sx={{ my: 2, p: 4 }}>
              <Grid item sx={{ my: 4 }}>
                <MyLink to="/productgroup/1">
                  <h2>میوه و سبزی تازه </h2>
                </MyLink>
              </Grid>
              <Grid
                container
                direction="row"
                sx={{ textAlign: "center" }}
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {fruit?.map((item) => (
                  <Grid item key={item.name} xs={12} md={4} lg={3}>
                    {/* <MyLink to={`products/${item.id}`}> */}
                      <ProductCards productData={item}
                        // image={item.image}
                        // name={item.name}
                        // price={item.price}
                      />
                    {/* </MyLink> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" sx={{ mb: 2, p: 4 }}>
              <Grid item sx={{ my: 4 }}>
                <MyLink to="/productgroup/2">
                  <h2>میوه و سبزی منجمد</h2>
                </MyLink>
              </Grid>
              <Grid
                container
                direction="row"
                sx={{ textAlign: "center" }}
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {frozen?.map((item) => (
                  <Grid item key={item.name} xs={12} md={4} lg={3}>
                    {/* <MyLink to={`products/${item.id}`}> */}
                      <ProductCards productData={item}
                        // image={item.image}
                        // name={item.name}
                        // price={item.price}
                      />
                    {/* </MyLink> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container sx={{ my: 2, p: 4 }}>
              <Grid item sx={{ my: 4 }}>
                <MyLink to="/productgroup/3">
                  <h2>انواع نوشیدنی</h2>
                </MyLink>
              </Grid>
              <Grid
                container
                direction="row"
                sx={{ textAlign: "center" }}
                spacing={{ xs: 1, md: 0 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {smothie?.map((item) => (
                  <Grid item key={item.name} xs={12} md={4} lg={3}>
                    {/* <MyLink to={`products/${item.id}`}> */}
                      <ProductCards productData={item}
                        // image={item.image}
                        // name={item.name}
                        // price={item.price}
                      />
                    {/* </MyLink> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;

{
  /* <Box sx={{width:'90vw'}}>
<Swiper
  spaceBetween={20}
  navigation={true}
  slidesPerView={3}
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
>
  {carouselImage?.map((img) => (
    <SwiperSlide
      width={"100%"}
      height={"100%"}
      modules={[Autoplay, Pagination, Navigation]}
      sx={{
        paddingTop: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div>
        {" "}
        <img
          src={img}
          style={{ width: "30vw", borderRadius: "8px" }}
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</Box> */
}
