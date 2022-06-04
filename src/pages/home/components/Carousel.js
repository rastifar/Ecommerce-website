import React from "react";
import { Container, Grid, Slider, Typography, Box } from "@mui/material";
import ProductCards from "../../../components/ProductCards";

//Swiper
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css/autoplay";

const Carousel = ({
  Slides,
  width,
  height,
  padding,
  isImg,
  moludes,
  slidesPerView,
  slidesPerGroup
}) => {
  return (
    <Box sx={{width: {width} ,height:{height}}}>
      <Swiper
        dir="rtl"
        effect="fade"
        modules={moludes}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        navigation={!isImg ? true : false}
        autoplay={isImg ? { delay: 3000, disableOnInteraction: false } : false}
        pagination={{ clickable: true }}
        style={{
          width: "80%", height: "100%", marginTop: ".5rem",background:'red',
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-color": "#d3a98c",
          "--swiper-pagination-color": "#d3a98c",
        
        }}
        grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        zoom={false}
        //slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={false}
        
      >
        {Slides?.map((item, index) => (
          <SwiperSlide
            key={index}
          
            modules={moludes}
            sx={{
              paddingTop: "100%",
              overflow: "hidden",
              position: "relative",
            }}
            // breakpoints={{
            //   // when window width is >= 640px
            //   640: {
            //     width: 640,
            //     slidesPerView: 1,
            //   },
            //   // when window width is >= 768px
            //   768: {
            //     width: 768,
            //     slidesPerView: 2,
            //   },
            // }}
          >
            <div>
              {isImg ? (
                <img
                  src={item}
                  style={{ width: "100vw", borderRadius: "8px" }}
                />
              ) : (
                <ProductCards productData={item} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </Box>
  );
};

export default Carousel;

// { delay: 100000, disableOnInteraction: false }
