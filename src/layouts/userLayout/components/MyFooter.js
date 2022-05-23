import { Container, Box, Grid } from "@mui/material";
import React from "react";
import MyLink from "../../../components/MyLink";
import image from "../../../assets/images/footer.png";

const MyFooter = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
       
              color="white"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                color: "#f5f5f5",
               
              }}
      >
        <Container
          maxWidth="lg"
         
        >
          <Grid container spacing={5}   bgcolor='text.secondary'>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box my={2}>
                <MyLink to="/" color="inherit">
                  فروشگاه
                </MyLink>
              </Box>
              <Box>
                <MyLink to="/">تماس با ما</MyLink>
              </Box>
              <Box>
                <MyLink to="/">درباره ما</MyLink>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <MyLink to="/">فروشگاه</MyLink>
              </Box>
              <Box>
                <MyLink to="/">تماس با ما</MyLink>
              </Box>
              <Box>
                <MyLink to="/">درباره ما</MyLink>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <MyLink to="/">فروشگاه</MyLink>
              </Box>
              <Box>
                <MyLink to="/">تماس با ما</MyLink>
              </Box>
              <Box>
                <MyLink to="/">درباره ما</MyLink>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            تمامی حقوق متعلق به سایت انار سبز می باشد &reg;
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default MyFooter;
