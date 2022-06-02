import React, { useState } from "react";
//ReactRouter
import { Link } from "react-router-dom";
//Material
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
//Consts
import { LINKARRAYRESPONSIVE } from "../../../constants/layoutConst";
import MyLink from "../../../components/MyLink";

const DrawerCmp = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "darkgray" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {LINKARRAYRESPONSIVE.map((item, index) => (
            <ListItemButton key={index} divider onClick={() => setOpen(false)}>
              <ListItemIcon>
                {item.title == "مدیریت" ? (
                  <MyLink to="/login">                 
                    <Button color="warning" size="medium" variant="contained">
                      مدیریت
                    </Button>
                    </MyLink>
                ) : (
                    <MyLink to={item.link}>
                      <ListItemText sx={{ color: "white" }}>{item.title}</ListItemText>
                      </MyLink>
                )}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <IconButton sx={{ marginRight: "auto" }} onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerCmp;
