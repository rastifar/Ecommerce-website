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
import { LINKADMINRESPONSIVE } from "../../../constants/layoutConst";
import MyLink from "../../../components/MyLink";

const DrawerCmp = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "darkgray" } }}
        anchor='right'
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {LINKADMINRESPONSIVE.map((link, index) => (
            <ListItemButton key={index} divider onClick={() => setOpen(false)}>
              <ListItemIcon>
                {link.title === "بازگشت" ? (
                  <MyLink to={link.link}>
                    <Button color="warning" size="medium" variant="contained">
                      بازگشت به سایت
                    </Button>
                  </MyLink>
                ) : (
                  <MyLink to={link.link}>
                    <ListItemText sx={{ color: "white" }}>
                      {link.title}
                    </ListItemText>
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
