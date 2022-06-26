import React from "react";


//Swiper
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "swiper/css/autoplay";
import { BASE_URL } from "../constants/apiConst";

const Carousel = ({
  Slides,
  width,
  height,
  padding,
  isImg,
  moludes,
  slidesPerView,
  slidesPerGroup,
}) => {
  return (
   
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
        width: "100%",
        height: "100%",
        "--swiper-navigation-size": "30px",
        "--swiper-navigation-color": "#d3a98c",
        "--swiper-navigation-color": "#d3a98c",
        "--swiper-button-prev":"blue",
        "--swiper-pagination-color": "#d3a98c",
     
      }}
    
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
       
        >
          <div>
            {isImg ? (
              <img
                src={item}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <img
                src={BASE_URL + "/files/" + item}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  
  );
};

export default Carousel;
