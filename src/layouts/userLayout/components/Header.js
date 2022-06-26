import React, { useState } from "react";
//----------------Material
import {
  AppBar,
  Toolbar,
  Box,
  Button,  
  useTheme,
  Badge,
  useMediaQuery,
  Stack,
} from "@mui/material";
//----------------Material-Icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//---------------Constant
import { LINKARRAYS } from "../../../constants/layoutConst";
//---------------Components
import DrawerCmp from "./DrawerCmp";
import MyLink from "../../../components/MyLink";
//---------------Images
import Images from "../../../assets/index";
//---------------Redux
import { useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));   
  const itemInBasket = useSelector((state) => state.cart.cartTotalQuantity);

  return (
    <AppBar
      color="inherit"
      sx={{ bgcolor: "#F3F4F9" }}
      position="static"
      elevation={0}
    >
      <Toolbar>
        {isMatch ? (
          <>
            <MyLink to="/">
              <Box>
                <img src={Images.LogoResponsive} style={{ width: "60px" }} />
              </Box>
            </MyLink>
            <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="flex-end">
              <MyLink to="/cart">
                <Badge badgeContent={itemInBasket} color="warning">
                  <ShoppingCartIcon />
                </Badge>
              </MyLink>
            </Box>
            <DrawerCmp />
          </>
        ) : (
          <>
            <MyLink to="/">
              <Box>
                <img src={Images.LogoMain} style={{ width: "200px" }} />
              </Box>
            </MyLink>
            <Box sx={{ flexGrow: 1, marginRight: "5rem" }}>
              <Stack direction="row" spacing={2}>
                {LINKARRAYS.map((link, index) => (
                  <MyLink to={link.link} key={index}>
                    <Button>{link.title}</Button>
                  </MyLink>
                ))}               
              </Stack>             
            </Box>
            <Box sx={{ margin: "1rem" }}>
              <MyLink to="/dashboard">
                <Button color="warning" size="medium" variant="contained">
                  مدیریت
                </Button>
              </MyLink>
            </Box>
            <Box>
              <MyLink to="/cart">
                <Badge badgeContent={itemInBasket} color="warning">
                  <ShoppingCartIcon />
                </Badge>
              </MyLink>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
