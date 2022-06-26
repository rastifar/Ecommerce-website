import * as React from "react";
//----------Material
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
//----------Material-Icon
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
//----------Components
import MyLink from "./MyLink";

const MyList = ({ title, menuLink, submenuTitle }) => {
  const [open, setOpen] = React.useState(false);  
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText>{title}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MyLink to={menuLink}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText>تمام محصولات</ListItemText>
            </ListItemButton>
          </List>
        </MyLink>
      </Collapse>
      {submenuTitle?.map((subitem, index) => (
        <Collapse in={open} timeout="auto" unmountOnExit key={index}>
          <MyLink to={subitem.link}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText>{subitem.title}</ListItemText>
              </ListItemButton>
            </List>
          </MyLink>
        </Collapse>
      ))}
    </List>
  );
};

export default MyList;
