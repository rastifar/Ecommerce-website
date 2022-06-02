import { Box } from "@mui/material";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";

const UserLayout = ({ children, withSidebar = false }) => {
  const { pathname } = useLocation();  
  const path = pathname.split("/")[1];

  return (
    <div>
      <Header />
      {path === "productgroup" ? (
        <Box component="main" display="flex" minHeight={`calc(100vh - 70px)`}>
          {/* {withSidebar && <Sidebar />} */}
          <Sidebar />
          {children}
        </Box>
      ) : <>
          {children}
          </>
      }
      <Footer />
    </div>
  );
};

export default UserLayout;
