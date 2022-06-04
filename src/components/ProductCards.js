import * as React from "react";
//----------------material
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
} from "@mui/material";

//-------------components
import MyLink from "./MyLink";
//-------------utile
import {
  numberDivider,
  isInCart,
  quantityCount,
  toFarsiNumber,
} from "../utils/utils";
//
import { BASE_URL } from "../constants/apiConst";
//-------------Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increase,
  decrease,
  romeveItem,
  clearCart,
} from "../redux/cartSlice";
//-------------icons
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//---------------------------------------------

export default function ProductCards({
  productData,
  width,
  fontSize,
  height,
  
}) {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { image, name, price, id, count } = productData;
  const payload = { id, name, price, count };

  return (
    <Card sx={{ width: { width }, mb: "1.3rem" }}>
      <MyLink to={`/products/${id}`}>
        <CardMedia
          component="img"
          alt={name}
          height={height}
          image={BASE_URL + "/files/" + image}
          sx={{ objectFit: 'contain'}}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", mt: 2, fontSize: { fontSize } }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {numberDivider(price)} تومان
          </Typography>
        </CardContent>
      </MyLink>

      {/* <CardActions display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ my: 2, mx: 2, border: "1px solid #F2EFEA" }}>
          {quantityCount(state, payload.id) === 1 && (
            <Button onClick={() => dispatch(romeveItem(payload))}>
              <DeleteOutlineOutlinedIcon />
            </Button>
          )}
          {quantityCount(state, payload.id) > 1 && (
            <Button onClick={() => dispatch(decrease(payload))}>
              <IndeterminateCheckBoxTwoToneIcon />
            </Button>
          )}
          {quantityCount(state, payload.id) > 0 && (
            <Box
              component="span"
              sx={{
                width: "30px",
                display: "inline-block",
                textAlign: "center",
                fontSize: "1.5rem",
              }}
            >
              {toFarsiNumber(quantityCount(state, payload.id))}
            </Box>
          )}
          {isInCart(state, payload.id) ? (
            <Button onClick={() => dispatch(increase(payload))} size="large">
              <AddBoxTwoToneIcon />
            </Button>
          ) : (
            <Button
              onClick={() => dispatch(addToCart(payload))}
              variant="outlined"
            >
              افزودن به سبد خرید
            </Button>
          )}
        </Box>
  
      </CardActions> */}
    </Card>
  );
}
