import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Tab,
  Tabs,
  useTheme,
 Badge,
  useMediaQuery,
  Stack
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LINKARRAYS } from "../../../constants/layoutConst";


import DrawerCmp from "./DrawerCmp";

import image1 from "../../../assets/images/logo22.png";
import image2 from "../../../assets/images/logo1.png";
import { Link,useLocation } from "react-router-dom";
import MyLink from "../../../components/MyLink";


//Redux
import { useSelector } from 'react-redux';

const Header = ({withSidebar=false}) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();
  const search = location.pathname.split("/").splice(1, 2).join("/");   
  const tabVal = LINKARRAYS.findIndex((i) => i.link === "/".concat(search)); 
  console.log(tabVal);
  const [value, setValue] = useState(0);
  const itemInBasket = useSelector(state => state.cart.cartTotalQuantity) ;

  return (
   
    <AppBar color="inherit" sx={{bgcolor:'#F3F4F9'}} position="static" elevation={0} >
      <Toolbar>
        {isMatch ? (
          <>
            <MyLink to="/">
              <Box sx={{ flexGrow: 1 }}>
                <img src={image2} style={{ width: "60px" }} />
              </Box>
            </MyLink>
            <Box>
              <MyLink to="/cart">
              <Badge badgeContent={itemInBasket} color="warning">
                <ShoppingCartIcon  />
                </Badge>
                </MyLink>
            </Box>
            <DrawerCmp />
          </>
        ) : (
          <>
            <MyLink to="/">
              <Box>
                <img src={image1} style={{ width: "200px" }} />
              </Box>
            </MyLink>
              <Box sx={{ flexGrow: 1, marginRight: "5rem" }}>
                {/* <Stack direction="row" spacing={2}>

                  <Button color='inherit'>میوه تازه</Button>
                  <Button color='inherit'>میوه منجمد</Button>
                  <Button color='inherit'>نوشیدنی</Button>
                </Stack> */}
              <Tabs
                indicatorColor="secondary"
                value={value}
                textColor="primary"
                onChange={(e, val) => setValue(val)}
              >
                {LINKARRAYS.map((link, index) => (
                  <Tab
                    label={link.title}
                    key={index}
                    component={Link}
                    to={link.link}
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ margin: "1rem" }}>
              <MyLink to="/login">
                <Button color="warning" size="medium" variant="contained">
                  مدیریت
                </Button>
              </MyLink>
            </Box>
              <Box>
              <MyLink to="/cart">
              <Badge badgeContent={itemInBasket} color="warning" >
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
