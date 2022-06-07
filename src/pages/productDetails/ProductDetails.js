import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, PRODUCTS } from "../../constants/apiConst";
import {
  Button,
  Grid,
  Typography,
  Box,
  Input,
  TextField,
  Rating,
} from "@mui/material";
//Swiper
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Thumbs,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
//const
import { breadcrump,Category ,subCategory} from "../../constants/categoryConst";
//
//icons
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//components
import ProductImagesSlider from "./components/ProductImagesSlider";
import ProductBreadCrump from "./components/ProductBreadCrump";
//utils
import {
  numberDivider,
  isInCart,
  quantityCount,
  toFarsiNumber,
} from "../../utils/utils";

//-----------------------
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increase,
  decrease,
  romeveItem,
  clearCart,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { setNestedObjectValues } from "formik";

const ProductDetails = () => {
  const { productid } = useParams();
  const [data, setData] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const state = useSelector((state) => state.cart);
  const token = useSelector(state=>state.token)

  const dispatch = useDispatch();
  // const descriptionRef = useRef(null);

  const [activeThumb, setActiveThumb] = useState();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/products/${productid}`)
      .then((res) => setData(res.data));
  }, []);

  //const [{ name:name, images:images, description:description, price:price }] = data && data[0] || [{}]
  const { name, image, description, category, price, images, id, count,subcategory } = data;
  //descriptionRef.current.innerHTML = description || "";
  const payload = { id, name, price, count };
console.log(subcategory);
  const quantityCountInBasket = quantityCount(state, payload.id);

  const handleIncrease = () => {
    if (quantityCountInBasket >= count) {
      toast.error("میزان درخواستی بیشتر از موجودی انبار است");
      return;
    }
    dispatch(increase(payload));
  };

  const handleRating = (val) => {
    axios
      .patch(
        BASE_URL + PRODUCTS + `/${id}`,
        { favorite: val },
        {
          headers: { token: token },
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        if (res === 200 || res === 201) {
          alert("success");
        }
      })
      .catch((error) => alert("error"));
  };
  console.log(data);
  console.log(images);
  return (
    <div>
      <Grid container sx={{ my: 3, p: 3 }}>
        {/* <Grid item xs={12} sm={6} md={4} container direction="row"> */}
        <Grid item xs={12} sm={6} md={4} sx={{ minHeight: "35vh", p: 2 }}>
          <ProductImagesSlider
            width="100%"
            heigth="100%"
            items={images}
            modules={[Navigation]}
            slidesPerGroup={1}
          />
          {/* <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation, Thumbs]}
              grabCursor={true}
              thumbs={{ swiper: activeThumb }}
             
            >
              {images?.map((img,index) => (
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
                    <img key={index}
                      src={BASE_URL + "/files/" + img}
                      style={{ width: "30vw", borderRadius: "8px" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setActiveThumb}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              modules={[Navigation, Thumbs]}
              className="product-images-slider-thumbs"
            >
              {images?.map((img) => (
                <SwiperSlide
                  width={"100%"}
                  height={"100%"}
                  modules={[Autoplay, Pagination, Navigation]}
                >
                  <div>
                    {" "}
                    <img
                      src={BASE_URL + "/files/" + img}
                      style={{ width: "6vw", borderRadius: "8px" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ minHeight: "35vh", p: 3 }}>
          <ProductBreadCrump
            category={Category[category - 1]}
            catLink={category}
            subcategory={subCategory[subcategory - 1]}
            subLink={subcategory}
          />
          {/* <Typography variant="p" sx={{ my: 2, mr: 2 ,textAlign:'center',color:'primary'}} >
              دسته بندی : {breadcrump[category - 1]}
            </Typography> */}
          <Typography variant="h4" sx={{ my: 2, mr: 2, textAlign: "center" }}>
            {name}
          </Typography>

          <Typography variant="h6" sx={{ my: 2, mr: 2, textAlign: "center" }}>
            قیمت : {numberDivider(price)} تومان
          </Typography>
          
          <Grid
            item
            container
            direction="column"
            justifyContent={"center"}
            alignContent="center"
          >
            <Box sx={{ my: 2, mx: 2, border: "1px solid #F2EFEA" }}>
              {quantityCountInBasket === 1 && (
                <Button onClick={() => dispatch(romeveItem(payload))}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              )}
              {quantityCountInBasket > 1 && (
                <Button onClick={() => dispatch(decrease(payload))}>
                  <IndeterminateCheckBoxTwoToneIcon />
                </Button>
              )}
              {quantityCountInBasket > 0 && (
                <Box
                  component="span"
                  sx={{
                    width: "30px",
                    display: "inline-block",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  {toFarsiNumber(quantityCountInBasket)}
                </Box>
              )}
              {isInCart(state, payload.id) ? (
                <Button onClick={handleIncrease} size="large">
                  <AddBoxTwoToneIcon />
                </Button>
              ) : (
                <Button
                  disabled={count > 0 ? false : true}
                  onClick={() => dispatch(addToCart(payload))}
                  variant="outlined"
                >
                  افزودن به سبد خرید
                </Button>
              )}
            </Box>
          </Grid>
          <Box display={"flex"} justifyContent={"center"} alignContent="center">
            <Rating
              value={ratingValue}
              onChange={(e, val) => {
                handleRating(val);
                // console.log(val);
                setRatingValue(val);
              }}
              defaultValue={1.5}
              precision={1}
            />
          </Box>
        </Grid>
        {/* </Grid> */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{ background: "#BDD2B6", borderRadius: 3, my: 1 }}
        >
          {/* <p ref={descriptionRef} ></p> */}

          <Typography variant="body1" sx={{ fontSize: "1.2rem", p: 2, mx: 2 }}>
            {" "}
            {/* {description} */}
            <div
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetails;
