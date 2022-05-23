import { Container, Box, Grid } from "@mui/material";
import React from "react";
import MyLink from "../../../components/MyLink";

const MyFooter = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
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
