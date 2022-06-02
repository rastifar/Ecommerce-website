// import * as React from "react";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import AddLocationAltTwoTone from "@mui/icons-material/AddLocationAltTwoTone";
// import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
// import CallTwoTone from "@mui/icons-material/CallTwoTone";
// import FacebookTwoTone from "@mui/icons-material/FacebookTwoTone";


// const Footer = () => {
//   const [value, setValue] = React.useState("recents");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <BottomNavigation
//       sx={{ width: "100%", position: "fixed", bottom: 0,background: "inherit" }}
//       value={value}
//       onChange={handleChange}
//     >
//       <BottomNavigationAction
//         label="email@gmail.com"
//         value="email"
//         icon={<EmailTwoTone />}
//       />
//       <BottomNavigationAction
//         label="۲۲۱۱۵۵۳۳"
//         value="phone"
//         icon={<CallTwoTone />}
//       />
//       <BottomNavigationAction
//         label="facebook"
//         value="facebook"
//         icon={<FacebookTwoTone />}
//       />
//       <BottomNavigationAction
//         label="آدرس شرکت"
//         value="folder"
//         icon={<AddLocationAltTwoTone />}
//       />
//     </BottomNavigation>
//   );
// };

// export default Footer;


import * as React from "react";

import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddLocationAltTwoTone from "@mui/icons-material/AddLocationAltTwoTone";
import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import FacebookTwoTone from "@mui/icons-material/FacebookTwoTone";

import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import image from "../../../assets/images/footer.webp";
const Footer = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
        // style={{
        //   backgroundImage: `url(${image})`,
        //   backgroundSize: "contain",
        //   backgroundRepeat: "repeat",
        //   width: "6rem",
        //   height: "6rem",
        //   color: "#f5f5f5",
        // }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>عنوان</Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>عنوان</Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>عنوان</Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
              <Box>
                <Link to="/">خانه</Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} py={{ xs: 5, sm: 0 }}>
            تمامی حقوق متعلق به سایت انار سبز می باشد&reg;
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
