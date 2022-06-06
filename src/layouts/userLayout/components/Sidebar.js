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
import MyLink from "../../../components/MyLink";
import Select from "../../../components/Select";
import List from "../../../components/MyList";
import {
  products,
  filterByPrice,
  filterByPopularity,
} from "../../../constants/sidebarConst";
import MyList from "../../../components/MyList";
import MenuResponsive from "./MenuResponsive";

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
                    sx={{
                      flexBasis: "30%",                      
                      mr: "auto",
                      ml: "auto",
                    }}
                  > <MyLink to={product.link}>
                      <Box sx={{width:100}}>
                    <MenuResponsive
                      icon={product.icon}
                      menuLink={product.link}
                      submenuTitle={product.subcategory}
                        />
                        </Box>
                      </MyLink>
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
                  <>
                    <MyLink to={product.link} key={index}>
                      <MyList
                        title={product.category}
                        submenuTitle={product.subcategory}
                      />
                      <Divider />
                    </MyLink>
                  </>
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

// import React, { useState } from "react";
// //-----------------Material
// import {
//   Paper,
//   List,
//   ListItem,
//   Box,
//   Typography,
//   Divider,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// //-----------------Component
// import MyLink from "../../../components/MyLink";
// import Select from "../../../components/Select";

// const MyPaper = styled(Paper)(({ theme }) => ({
//   display: "none",
//   color: "text.secondary",
//   marginTop: "2rem",
//   paddingLeft: "10px",
//   marginLeft: "3px",
//   minHeight: "100vh",
//   overflow: "auto",
//   padding: 8,
//   borderRadius: 4,
//   width: "25vw",
//   transition: "transform 1s",
//   [theme.breakpoints.up("sm")]: {
//     display: 'block',
//     width:'98vw'
//   },
//   [theme.breakpoints.down("md")]: {
//     display: 'block',
//     width:'98vw'
//   },

//   // [theme.breakpoints.up("sm")]: {
//   //   backgroundColor: "pink",
//   // color:'pink',
//   //   width:'98vw'
//   // },
//   // [theme.breakpoints.down("md")]: {
//   //   backgroundColor: "yellow",

//   //   color: "black",
//   // },
//   // [theme.breakpoints.up("lg")]: {
//   //   backgroundColor: "green",
//   //   color: "white",
//   // },
// }));

// const products = [
//   {
//     category: "میوه و سبزی تازه",
//     link: "/productgroup/1",
//   },
//   {
//     category: "میوه و سبزی منجمد",
//     link: "/productgroup/2",
//   },
//   {
//     category: "نوشیدنی",
//     link: "/productgroup/3",
//   },
// ];

// const Sidebar = ({}) => {
//   const theme = useTheme();
//   const largeScreen = useMediaQuery(theme.breakpoints.down("lg"));
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [popularity, setPopularity] = useState("");
//   return (
//     <>
//       <MyPaper square variant="outlined">
//         <Box
//           display={"flex"}
//           flexDirection={largeScreen ? "row" : "column"}
//           width="100%"
//         >
//           <Typography textAlign={"center"} py={2}>
//             لیست محصولات
//           </Typography>
//           <Divider />

//         {largeScreen ? (
//           <List component="nav">
//             {products.map((product, index) => (
//               <MyLink to={product.link} key={index}>
//                 <ListItem button component={"li"}>
//                   <Typography py={1}>{product.category}</Typography>
//                 </ListItem>
//                 <Divider />
//               </MyLink>
//             ))}
//           </List>
//         ) : (
//           <Box>
//             <Select
//               label={"دسته بندی محصولات"}
//               items={["میوه و سبزی تازه", "میوه و سبزی منجمد", "نوشیدنی ها"]}
//               value={category}
//               setValue={setCategory}
//             />
//           </Box>
//         )}
//         <Box>
//           <Select
//             label={"فیلتر قیمت"}
//             items={["به ترتیب صعودی", "به ترتیب نزولی"]}
//             value={price}
//             setValue={setPrice}
//           />
//         </Box>
//         <Box>
//           <Select
//             label={"فیلتر ویژگی ها"}
//             items={["محبوب ترین ها", "پرفروش ترین ها"]}
//             value={popularity}
//             setValue={setPopularity}
//           />
//           </Box>
//           </Box>
//       </MyPaper>
//     </>
//   );
// };

// export default Sidebar;
