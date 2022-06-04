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
  Typography,
  Divider,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import MyLink from "../../../components/MyLink";

// const MyPaper = styled(Paper)({
//   color: "darkslategray",
//   marginTop: "2rem",
//     marginRight: "5rem",
//   marginBottom:'0rem',
//   // backgroundColor: "aliceblue",
//   padding: 8,
//   borderRadius: 4,
//     width: 250,
//   minHeight:'100vh',
// //   height: `calc(100vh - 70px)`,
//   transition: "transform 1s",
//   ${theme => theme.breakpoints.up("sm")} {
//     background-color: orange;
//   }
//   //   "@media (max-width: 768px)": {
//   //     position: "sticky",
//   //     zIndex: "1500",
//   //     transform: "translateX(-100%)",
//   //   },
// });
const MyPaper = styled(Paper)(({ theme }) => ({
  display: "none",
  // backgroundColor: 'blue',
  color: "text.secondary",
  marginTop: "2rem",
  paddingLeft: '10px',
  marginLeft:'3px',   
 minHeight:'100vh',
  overflow: 'auto',
  padding: 8,
  borderRadius: 4,
  width: 250,  
  transition: "transform 1s",

  [theme.breakpoints.up("sm")]: {   
    display: "block",
  },
  // [theme.breakpoints.up("md")]: {
  //   backgroundColor: 'yellow',
  //   color: 'black',
  // },
  // [theme.breakpoints.up("lg")]: {
  //   backgroundColor: 'green',
  //   color: 'white',
  // },
}));


const products = [
  {
    category: "میوه و سبزی تازه",
    link: "/productgroup/1",
  },
  {
    category: "میوه و سبزی منجمد",
    link: "/productgroup/2",
  },
  {
    category: "نوشیدنی",
    link: "/productgroup/3",
  },
];

const Sidebar = ({}) => {
  return (
    <>
      <MyPaper square variant="outlined">
       
        <Box>
          <Typography textAlign={"center"} py={2}>
            لیست محصولات
          </Typography>
          <Divider/>
        </Box>
        <List component="nav">
          {products.map((product, index) => (
            <MyLink to={product.link} key={index}>
              <ListItem button component={"li"}>
                <Typography  py={1}>
                  {product.category}
                </Typography>
              </ListItem>
              <Divider />
            </MyLink>
          ))}
        </List>        
        
      </MyPaper>
    </>
  );
};

export default Sidebar;

// import {
//   AccountBox,
//   Article,
//   Group,
//   Home,
//   ModeNight,
//   Person,
//   Settings,
//   Storefront,
// } from "@mui/icons-material";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Switch,
// } from "@mui/material";
// import React from "react";

// const Sidebar = ({mode,setMode}) => {
//   return (
//     <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
//       <Box position="fixed">
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#home">
//               <ListItemIcon>
//                 <Home />
//               </ListItemIcon>
//               <ListItemText primary="Homepage" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <Article />
//               </ListItemIcon>
//               <ListItemText primary="Pages" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <Group />
//               </ListItemIcon>
//               <ListItemText primary="Groups" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <Storefront />
//               </ListItemIcon>
//               <ListItemText primary="Marketplace" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <Person />
//               </ListItemIcon>
//               <ListItemText primary="Friends" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <Settings />
//               </ListItemIcon>
//               <ListItemText primary="Settings" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <AccountBox />
//               </ListItemIcon>
//               <ListItemText primary="Profile" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton component="a" href="#simple-list">
//               <ListItemIcon>
//                 <ModeNight />
//               </ListItemIcon>
//               <Switch onChange={e=>setMode(mode === "light" ? "dark" : "light")}/>
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;
