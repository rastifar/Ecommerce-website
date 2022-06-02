import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";

//--------------consts
import { BASE_URL } from "../../../constants/apiConst";

const ProductImagesSlider = ({width,height,items,modules,slidesPerGroup}) => {
  const [activeThumb, setActiveThumb] = useState(null);

  return (
    <>
      <Swiper
        dir="rtl"
        effect="fade"
        style={{ width: width, height: height }}
        grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        zoom={false}
        slidesPerGroup={slidesPerGroup}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: activeThumb }}
      >
        {items?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={BASE_URL + "/files/" + img}
              style={{ width: "30vw", borderRadius: "8px" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setActiveThumb}
        dir="ltr"
        effect="fade"
        style={{ width: width, height: height }}
        // grabCursor={true}
        spaceBetween={30}
        centeredSlides={true}
        zoom={false}
        slidesPerGroup={4}
        watchSlidesProgress
        slidesPerView={1}
        modules={[Navigation, Thumbs]}
      >
        {items?.map((img, index) => (
          <SwiperSlide key={index}>
            <div>
              <img
                src={BASE_URL + "/files/" + img}
                style={{ width: "5vw", borderRadius: "8px" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
