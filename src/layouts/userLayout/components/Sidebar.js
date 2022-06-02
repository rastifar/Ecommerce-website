// import React from 'react';

// import styled from 'styled-components'

// const Sidebar = () => {import React from 'react'
import {
  Paper,
  Collapse,
  List,
  ListItem,
  ListItemText,
    Box,
    Typography
} from "@mui/material";
import { styled } from "@mui/system";
import MyLink from "../../../components/MyLink";

const MyPaper = styled(Paper)({
  color: "darkslategray",
  marginTop: "2rem",
    marginLeft: "5rem",
  marginBottom:'0rem',
  backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
    width: 250,
  minHeight:'100vh',
//   height: `calc(100vh - 70px)`,
  transition: "transform 1s",
  //   "@media (max-width: 768px)": {
  //     position: "sticky",
  //     zIndex: "1500",
  //     transform: "translateX(-100%)",
  //   },
});

const products = [
  {
    category: "میوه و سبزی تازه",
    link:'/productgroup/1'
  },
  {
    category: "میوه و سبزی منجمد",
    link:'/productgroup/2'
  },
  {
    category: "نوشیدنی",
    link:'/productgroup/3'
  },
];

const Sidebar = ({}) => {
  return (
    <>
      <MyPaper square variant="outlined">
        {/* <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed"> */}
        <List component="nav" aria-labelledby="محصولات">
          {products.map((product, index) => (
            <MyLink to={product.link} key={index}>
            <ListItem button  component={'li'}>
             <Typography>{product.category}</Typography> 
              </ListItem>
              </MyLink>
          ))}
        </List>
        {/* </Box>
    </Box> */}
      </MyPaper>
    </>
  );
};

export default Sidebar;
