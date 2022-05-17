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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { LINKAdmin } from "../../../constants/layoutConst";

import DrawerCmp from "./DrawerCmp";

import image1 from "../../../assets/images/logo22.png";
import image2 from "../../../assets/images/logo1.png";
import { useNavigate } from "react-router-dom";

import MyLink from "../../../components/MyLink";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/", { replace: false });
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        {isMatch ? (
          <>
            <MyLink to="/">
              <Box sx={{ flexGrow: 1 }}>
                <img src={image2} style={{ width: "60px" }} />
              </Box>
            </MyLink>
            <Box>
              <Badge badgeContent={0} color="error">
                <LogoutIcon onClick={handleLogout} />
              </Badge>
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
              <Tabs
                indicatorColor="secondary"
                value={value}
                textColor="primary"
                onChange={(e, val) => setValue(val)}
              >
                {LINKAdmin.map((link, index) => (
                  <MyLink to={link.link} key={index}>
                    <Tab
                      label={link.title}
                      sx={{ fontSize: "1rem", fontWeight: "bold" }}
                    />
                  </MyLink>
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
