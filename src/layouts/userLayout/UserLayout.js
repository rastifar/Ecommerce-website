import { Box, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";

const UserLayout = ({ children, withSidebar = false }) => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];

  return (
    <div>
      <Header />
      {path === "productgroup" ? (
        <Box
          component="main"
          display="flex"
          flexDirection={largeScreen ? "row" : "column"}
        >
          {/* {withSidebar && <Sidebar />} */}

          <Sidebar />
          <Box>{children}</Box>
        </Box>
      ) : (
        <>{children}</>
      )}
      <Footer />
    </div>
  );
};

export default UserLayout;
