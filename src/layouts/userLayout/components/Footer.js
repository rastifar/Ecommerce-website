import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddLocationAltTwoTone from "@mui/icons-material/AddLocationAltTwoTone";
import EmailTwoTone from "@mui/icons-material/EmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import FacebookTwoTone from "@mui/icons-material/FacebookTwoTone";

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PhoneInTalkTwoToneIcon from '@mui/icons-material/PhoneInTalkTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';

import namad from '../../../assets/images/ppnm.png'

import { Box, Container, Grid,Typography } from "@mui/material";
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
        py={{ xs: 2, sm:4 }}
        bgcolor="#B4C6A6"
        color="#362706"
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
              <Box borderBottom={1}><Typography>انار سبز</Typography></Box>
              <Box ><img src={namad} alt="namad" style={{width:'10rem'}}/></Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}><Typography>محصولات</Typography></Box>
              <Box sx={{my:1}}>
              <Typography>میوه و سبزی تازه</Typography>
           
              </Box>
              <Box sx={{my:1}}>
              <Typography>میوه و سبزی منجمد</Typography>
            
              </Box>
              <Box sx={{my:1}}>
                <Typography>انواع نوشیدنی ها</Typography>
           
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}><Typography>تماس با ما</Typography></Box>
              <Box display={'flex'} sx={{my:1}}><HomeTwoToneIcon/><Typography>تهران ایران</Typography>
             
              </Box>
              <Box display={'flex'} sx={{my:1}}><PhoneInTalkTwoToneIcon/><Typography>0912-121212</Typography>
               
              </Box>
              <Box display={'flex'} sx={{my:1}}><EmailTwoToneIcon/><Typography>anarSabz@info.com</Typography>
               
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center"   mt={{ xs: 10, sm: 7}}>
            تمامی حقوق متعلق به سایت انار سبز می باشد&reg;
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;

{
  /* <BottomNavigation
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
    </BottomNavigation> */
}
