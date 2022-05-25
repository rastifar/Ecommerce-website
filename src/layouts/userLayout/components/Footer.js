import * as React from "react";

import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddLocationAltTwoTone from "@mui/icons-material/AddLocationAltTwoTone";
import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import FacebookTwoTone from "@mui/icons-material/FacebookTwoTone";


const Footer = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: "100%", position: "fixed", bottom: 0,background: "inherit" }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="email@gmail.com"
        value="email"
        icon={<EmailTwoTone />}
      />
      <BottomNavigationAction
        label="۲۲۱۱۵۵۳۳"
        value="phone"
        icon={<CallTwoTone />}
      />
      <BottomNavigationAction
        label="facebook"
        value="facebook"
        icon={<FacebookTwoTone />}
      />
      <BottomNavigationAction
        label="آدرس شرکت"
        value="folder"
        icon={<AddLocationAltTwoTone />}
      />
    </BottomNavigation>
  );
};

export default Footer;