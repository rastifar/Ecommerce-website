import { AppBar, Toolbar,Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={handleLogOut}>
          خروج
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
