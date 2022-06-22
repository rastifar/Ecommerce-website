import React, { useState } from "react";
//----------Material
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
} from "@mui/material";
//-------------Material-Icon
import LogoutIcon from "@mui/icons-material/Logout";
//-------------Constant
import { LINKAdmin } from "../../../constants/layoutConst";
//-------------Components
import DrawerCmp from "./DrawerCmp";
import MyLink from "../../../components/MyLink";
//-------------Images
import Images from "../../../assets";
//-------------React-Router
import { Link, useNavigate, useLocation } from "react-router-dom";
//-------------Redux
import { removeToken } from "../../../redux/tokenSlice";
import { useDispatch } from "react-redux";
//---------------------


const Header = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const search = location.pathname.split("/").pop();
  let tabVal = LINKAdmin.findIndex((i) => i.link === search);
  if (tabVal === -1) {
    tabVal = 0
  }
  const [value, setValue] = useState(tabVal || 0);

  const handleLogout = () => {
    dispatch(removeToken());
    window.localStorage.removeItem("token");
    navigate("/", { replace: false });
  };
  console.log(LINKAdmin.title);
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        {isMatch ? (
          <>
            <MyLink to="/">
              <Box>
                <img src={Images.LogoResponsive} style={{ width: "60px" }} />
              </Box>
            </MyLink>
            <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="flex-end">
              <Badge badgeContent={0} color="error">
                <LogoutIcon onClick={handleLogout} />
              </Badge>
            </Box>
            <Box>
              <DrawerCmp />
            </Box>
          </>
        ) : (
          <>
            <MyLink to="/">
              <Box>
                <img src={Images.LogoMain} style={{ width: "200px" }} />
              </Box>
            </MyLink>
            <Box sx={{ flexGrow: 1, marginRight: "5rem" }}>
              <Tabs
                indicatorColor="secondary"
                value={value}
                textColor="primary"
                onChange={(e, val) => setValue(val)}
              >
                {LINKAdmin.map((link, index) => (
                  // <MyLink to={link.link} key={index}>
                  <Tab
                    label={link.title}
                    key={index}
                    component={Link}
                    to={link.link}
                    sx={{ fontSize: "1rem", fontWeight: "bold" }}
                  />
                  // </MyLink>
                ))}
              </Tabs>
            </Box>
            <Box sx={{ margin: "1rem" }}>
              <MyLink to="/" decoration="none">
                <Button color="warning" size="medium" variant="contained">
                  بازکشت به سایت
                </Button>
              </MyLink>
            </Box>
            <Box>
              <Badge badgeContent={0} color="error">
                <LogoutIcon onClick={handleLogout} />
              </Badge>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
