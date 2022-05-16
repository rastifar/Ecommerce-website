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
          {LINKADMINRESPONSIVE.map((link, index) => (
            <ListItemButton key={index} divider onClick={() => setOpen(false)}>
              <ListItemIcon>
                {link.title === "بازگشت" ? (
                  <Link to={link.link}>
                    <Button color="warning" size="medium" variant="contained">
                      بازگشت به سایت
                    </Button>
                  </Link>
                ) : (
                  <Link to={link.link}>
                    <ListItemText sx={{ color: "white" }}>
                      {link.title}
                    </ListItemText>
                  </Link>
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
