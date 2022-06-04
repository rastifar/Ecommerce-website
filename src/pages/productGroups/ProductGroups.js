import React, { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Box,
  ListItemText,
  List,
  Pagination,
  CircularProgress,
  CssBaseline,
} from "@mui/material";

import axios from "axios";
import { caterories } from "../../constants/formsConst";
import useFetch from "../../hooks/useFetch";

import ProductCards from "../../components/ProductCards";
import MyLink from "../../components/MyLink";
const ProductGroups = () => {
  const limit = useMemo(() => 6, []);
  const [activePage, setActivePage] = useState(1);
  const { categoryNum } = useParams();

  const { data, loading, error, headers } = useFetch(
    `http://localhost:3002/products?category=${categoryNum}&_page=${activePage}&_limit=${limit}}&_sort=asc`
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: "2rem" }}
    >
      {loading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <CssBaseline />
          <Grid container>
            {data?.map((item) => (
              <Grid item key={item.name} xs={12} sm={6} md={4} align="center">
                <ProductCards productData={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {headers && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ my: 5 }}
        >
          <Pagination
            variant="outlined"
            defaultPage={1}
            page={activePage}
            count={Math.ceil(Number(headers["x-total-count"]) / Number(limit))}
            onChange={(_, page) => {
              console.log("page:", page);
              setActivePage(page);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductGroups;

//     {loading ? (
//       <Box
//         sx={{
//           position: "absolute",
//           background: "#fafafa",
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     ) : (
//       <>
//         <Box
//   display="flex"
//   flexDirection="column"
//   alignItems="center"
//   justifyContent="center"
// >
//         <Grid
//           container
//           direction="row"
//           sx={{ textAlign: "center" }}
//           // spacing={{ xs: 2, md: 3 }}
//           // columns={{ xs: 4, sm: 8, md: 12 }}
//         >
//           {data?.map((item) => (
//             <Grid item key={item.name} xs={12} sm={6} md={4}>
//               <ProductCards
//                 productData={item}
//                 // image={item.image}
//                 // name={item.name}
//                 // price={item.price}
//               />
//             </Grid>
//           ))}
//           </Grid>
//           </Box>
//       </>
//     )}
//     <Box sx={{ mt: 15 }}>
//       <Pagination
//         variant="outlined"
//         defaultPage={1}
//         page={activePage}
//         count={Math.ceil(Number(headers["x-total-count"]) / Number(limit))}
//         onChange={(_, page) => {
//           console.log("page:", page);
//           setActivePage(page);
//         }}
//       />
//     </Box>
//   </Grid>
