import * as React from "react";
import {
  Button,
  Divider,
  MenuItem,
  Menu,
  Box,
  Typography,
} from "@mui/material";

import { products } from "../../../constants/sidebarConst";
import MyList from "../../../components/MyList";
import MyLink from "../../../components/MyLink";

export default function MenuResponsive({ icon, menuLink, submenuTitle }) {
  console.log('menuLink',menuLink);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        sx={{ mt: 1, mx: 1 }}
      > */}
     
        <Box onClick={handleClick} sx={{ border: "1px solid lightgray" }}>
          <Typography textAlign={"center"}>{icon}</Typography>
        </Box>
      
      {/* </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {submenuTitle.map((product, index) => (
          <MenuItem onClick={handleClose} key={index}>
            {/* <MyList
              title={product.category}
              submenuTitle={product.subcategory}
            />
            <Divider /> */}
            <MyLink to={product.link}>{product.title}</MyLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
