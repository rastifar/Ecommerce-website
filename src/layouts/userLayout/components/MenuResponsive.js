import * as React from "react";
//----------Material
import { MenuItem, Menu, Box } from "@mui/material";
//---------Components
import MyLink from "../../../components/MyLink";

export default function MenuResponsive({ icon, menuLink, submenuTitle }) {
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
      <Box
        onClick={handleClick}
        sx={{ border: "1px solid lightgray", textAlign: "center", pt: 1 }}
      >
        {icon}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <MyLink to={menuLink}>تمام محصولات</MyLink>
        </MenuItem>
        {submenuTitle.map((product, index) => (
          <MenuItem onClick={handleClose} key={index}>
            <MyLink to={product.link}>{product.title}</MyLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
