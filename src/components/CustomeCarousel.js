import { Box } from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";
import ProductCards from "./ProductCards";

const CustomeCarousel = ({ settings, slidesData, isImg }) => {
  return (
    <Box>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index}>
            {isImg ? (
              <img src={slide} style={{ width: "100vw", borderRadius: "8px" }} />
            ) : (
              <ProductCards productData={slide} />
            )}
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default CustomeCarousel;
