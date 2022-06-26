import React from "react";
//-----------Material
import { Box, useTheme, useMediaQuery } from "@mui/material";
//-----------Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
//-----------React-Router
import { useLocation } from "react-router-dom";

const UserLayout = ({ children}) => {
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
