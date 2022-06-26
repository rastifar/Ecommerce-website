import React from "react";
//----------Material
import { Box } from "@mui/material";
//----------React-Router
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Box sx={{ background: "#82A284" }}>
      <Outlet />
    </Box>
  );
};

export default AdminDashboard;
