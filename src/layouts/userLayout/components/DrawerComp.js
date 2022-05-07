import React, { useState } from "react";
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
import { LINKARRAYRESPONSIVE } from "../../../constants/layoutConst"

const DrawerComp = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer
        PaperProps={{ sx: { backgroundColor: "darkgray" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {LINKARRAYRESPONSIVE.map((link, index) => (
            <ListItemButton key={index} divider onClick={() => setOpen(false)}>
              <ListItemIcon>
                {link == "مدیریت" ? (
                  <Button color="warning" size="medium" variant="contained">
                    مدیریت
                  </Button>
                ) : (
                  <ListItemText sx={{ color: "white" }}>{link}</ListItemText>
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

export default DrawerComp;