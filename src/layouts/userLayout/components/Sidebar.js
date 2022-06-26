import React, { useState } from "react";
//-----------------Material
import {
  Paper,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
//-----------------Component
import Select from "../../../components/Select";
import MyList from "../../../components/MyList";
import MenuResponsive from "./MenuResponsive";
//----------------Constant
import {
  products,
  filterByPrice,
  filterByPopularity,
} from "../../../constants/sidebarConst";

const MyPaper = styled(Paper)(({ theme }) => ({
  display: "block",
  color: "text.secondary",
  marginTop: "2rem",
  paddingLeft: "10px",
  marginLeft: "3px",
  minHeight: "100vh",
  overflow: "auto",
  padding: 8,
  borderRadius: 4,
  width: "25vw",
  transition: "transform 1s",
  [theme.breakpoints.down("md")]: {
    width: "98vw",
    minHeight: "25vh",
  },
}));

const Sidebar = () => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <MyPaper square variant="outlined">
        <Grid container>
          <Grid item xs={12} sm={largeScreen ? 6 : 12}>
            {largeScreen ? (
              <Box display={"flex"} sx={{ mt: 2 }}>
                {products.map((product, index) => (
                  <Box
                    key={index}
                    sx={{
                      flexBasis: "30%",
                      mr: "auto",
                      ml: "auto",
                    }}
                  >
                    {/* <MyLink to={product.link}>
                      <Box sx={{width:100}}> */}
                    <MenuResponsive
                      icon={product.icon}
                      menuLink={product.link}
                      submenuTitle={product.subcategory}
                    />
                    {/* </Box>
                      </MyLink> */}
                  </Box>
                ))}
              </Box>
            ) : (
              <>
                <Typography textAlign={"center"} py={2}>
                  لیست محصولات
                </Typography>
                <Divider />

                {products.map((product, index) => (
                  <div key={index}>
                    <MyList
                      title={product.category}
                      menuLink={product.link}
                      submenuTitle={product.subcategory}
                    />
                    <Divider />
                  </div>
                ))}
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={largeScreen ? 6 : 12}>
            <Select label={"فیلتر قیمت"} items={filterByPrice} />
          </Grid>
          <Grid item xs={12} sm={largeScreen ? 6 : 12}>
            <Select label={"فیلتر ویژگی ها"} items={filterByPopularity} />
          </Grid>
        </Grid>
      </MyPaper>
    </>
  );
};

export default Sidebar;
