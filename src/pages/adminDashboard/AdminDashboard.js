import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Box sx={{ background: "lightGray" }}>
      <Outlet />
    </Box>
  );
};

export default AdminDashboard;
