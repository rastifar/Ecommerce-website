import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MyLink from "./MyLink";

const MyList = ({ title, submenuTitle }) => {
  const [open, setOpen] = React.useState(false);
  console.log(title, submenuTitle);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText>{title}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {submenuTitle?.map((subitem, index) => (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MyLink to={subitem.link} key={index}>
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
