import React from "react";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1> This is Admin Dashboard</h1>
      <Outlet/>
    </div>
  );
};

export default AdminDashboard;