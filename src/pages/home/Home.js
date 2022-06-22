import React from "react";
//----------------Material
import {
  Grid,
  Typography,
  Box,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {Pagination, Autoplay } from "swiper";
//----------------Images
import Images from "../../assets/index";
//----------------Utils
import { productCategorizer } from "../../utils/utils";
//----------------Components
import CompanyMsgCard from "./components/CompanyMsgCard";
import MyLink from "../../components/MyLink";
import CustomeCarousel from "../../components/CustomeCarousel";
import ProductCards from "../../components/ProductCards";
//----------------UseFetch
import useFetch from "../../hooks/useFetch";
//---------------Constants
import { BASE_URL, PRODUCTS } from "../../constants/apiConst";

const Section = styled("section")({
  marginTop: "1rem",
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

const carouselImg = [Images.HomeSlide1, Images.HomeSlide2];

const Home = () => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  let { fruit, frozen, smothie } = [];
  const { data, loading } = useFetch(BASE_URL + PRODUCTS);

  //to group the products based on 3 categories:'fresh/1','frozen/2','smoothie/3'
  const productCategorized = productCategorizer(data);
  if (productCategorized) {
    fruit = productCategorized[1].splice(0, 6);
    frozen = productCategorized[2].splice(0, 6);
    smothie = productCategorized[3].splice(0, 6);
  } 
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box  sx={{width:"98vw" , height:'55vh'}}>
          
          <CustomeCarousel
            Slides={carouselImg}
           
            // useMediaQuery?"70vh":"40vh"
            height={useMediaQuery?"40vh":"70vh"}
            isImg={true}
            moludes={[Autoplay, Pagination]}
            slidesPerView={1}
            slidesPerGroup={1}
            padding={0}
          />
        </Box>

        <Section>
          <Grid container direction={"row"} sx={{ width: "98vw" }}>
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

        {/* Categories */}
        <Section>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ bgcolor: "#F3F4F9", width: "98vw", py: 15 }}
          >
            <Typography variant="h4" component="h3" sx={{textAlign:'center'}}>
              دسته بندی های انار سبز
            </Typography>
          </Box>
        </Section>

        {/* fruit section */}
        <Section>
          <Box
            display={"flex"}
            sx={{
              overflowX: "auto",
              width: "95vw",
              mb: 5,
              border: "1px dashed #4B5D67",
              borderRadius: 5,
              bgcolor: "#E4E9BE",
              scrollbarColor: "green",
            }}
          >
            <Box sx={{ width: "190px" }}>
              {" "}
              <MyLink to="/productgroup/1">
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    py: "45%",
                    px: 2,
                    textAlign: "center",
                  }}
                >
                  میوه و سبزی تازه
                </Typography>
              </MyLink>
            </Box>
            {fruit?.map((item, index) => (
              <Box sx={{ m: 2 }} key={index}>
                <ProductCards
                  productData={item}
                  width={"150px"}
                  fontSize={"1rem"}
                  height={"80px"}
                  objectFit={"cover"}
                />
              </Box>
            ))}
          </Box>
        </Section>
        {/* frozen section */}
        <Section>
          <Box
            display={"flex"}
            sx={{
              overflowX: "auto",
              width: "95vw",
              mb: 5,
              border: "1px dashed #4B5D67",
              borderRadius: 5,
              bgcolor: "#F6FBF4",
              scrollbarColor: "green",
            }}
          >
            <Box sx={{ width: "190px" }}>
              {" "}
              <MyLink to="/productgroup/2">
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    py: "45%",
                    px: 2,
                    textAlign: "center",
                  }}
                >
                  میوه و سبزی منجمد
                </Typography>
              </MyLink>
            </Box>
            {frozen?.map((item, index) => (
              <Box sx={{ m: 2 }} key={index}>
                <ProductCards
                  productData={item}
                  width={"150px"}
                  fontSize={"1rem"}
                  height={"80px"}
                  objectFit={"cover"}
                />
              </Box>
            ))}
          </Box>
        </Section>
        {/* smoothie */}
        <Section>
          <Box
            display={"flex"}
            sx={{
              overflowX: "auto",
              width: "95vw",
              mb: 10,
              border: "1px dashed #371B58",
              borderRadius: 5,
              bgcolor: "#FFF6EA",
              scrollbarColor: "green",
            }}
          >
            <Box sx={{ width: "190px" }}>
              {" "}
              <MyLink to="/productgroup/3">
                <Typography
                  sx={{
                    fontSize: "1.8rem",
                    py: "48%",
                    px: 2,
                    textAlign: "center",
                  }}
                >
                  نوشیدنیها
                </Typography>
              </MyLink>
            </Box>
            {smothie?.map((item, index) => (
              <Box sx={{ m: 2 }} key={index}>
                <ProductCards
                  productData={item}
                  width={"150px"}
                  fontSize={"1rem"}
                  height={"80px"}
                  objectFit="contain"
                />
              </Box>
            ))}
          </Box>
        </Section>
      </Box>
    </Box>
  );
};

export default Home;
