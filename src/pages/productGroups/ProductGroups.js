import React, { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import {
  Grid,
  Box,
  ListItemText,
  List,
  Pagination,
  CircularProgress,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import axios from "axios";
import { caterories } from "../../constants/formsConst";
import useFetch from "../../hooks/useFetch";

import ProductCards from "../../components/ProductCards";
import { urlFilterOptions } from "../../utils/utils";

const ProductGroups = () => {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const location = useLocation();
  const currentLocation = location.pathname.split("/");

  console.log("currentLocation :", currentLocation);

  const displayBasedOnLocation = currentLocation[2]
  const filteredOptions = urlFilterOptions(currentLocation)
  console.log('displayBasedOnLocation', displayBasedOnLocation);
  console.log('filteredOptions',filteredOptions);
  //const resultTosearch = location.search;
  //console.log('locaiotnSearch', resultTosearch);

  const queryString = require("query-string");
  const parsed = queryString.parse(location.search);
  const resultTosearch = queryString.stringify(parsed);
  console.log();

  const limit = useMemo(() => 6, []);
  const [activePage, setActivePage] = useState(1);
  const { categoryNum } = useParams();

  // const [searchParams] = useSearchParams();
  // console.log(searchParams.entries());
  // console.log(Object.fromEntries([...searchParams]));
  // const urlsearch = Object.fromEntries([...searchParams])
  // let query =''
  // const searchResult = Object.entries(urlsearch).map(item => query += item[0] + `=` + item[1] + `&`)
  // const resultTosearch = searchResult.pop()
  // console.log('resultTosearch', resultTosearch);

  // console.log(Object.entries(urlsearch).map(item => query += item[0] + `=` + item[1] + `&`));

  console.log(
    // `http://localhost:3002/products?category=${categoryNum}&_page=${activePage}&_limit=${limit}&${resultTosearch}`
    `http://localhost:3002/products${filteredOptions}&_page=${activePage}&_limit=${limit}&${resultTosearch}`
  );
  const { data, loading, error, headers } = useFetch(
    `http://localhost:3002/products${filteredOptions}&_page=${activePage}&_limit=${limit}&${resultTosearch}`
  );

  // `http://localhost:3002/products?category=${categoryNum}&_page=${activePage}&_limit=${limit}}&_sort=asc`
  // `http://localhost:3002/products?category=${categoryNum}&_page=${activePage}&_limit=${limit}`
  console.log("headers", headers["x-total-count"]);

  useEffect(() => {
    setActivePage(1);
  }, [resultTosearch,filteredOptions]);
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
        <Box sx={{minHeight:'70vh',minWidth:'70vw'}}>
          <CssBaseline />

          <Grid container >
            {data?.map((item) => (
              <Grid item key={item.name} xs={12} sm={6} md={4} align="center" >
                <ProductCards
                  productData={item}
                  width={"250px"}
                  fontSize={largeScreen ? "1.3rem" : "1rem"}
                  height={"150px"}
                  objectFit={displayBasedOnLocation == 3 ? "contain" : "cover"}
                />
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
            count={
              Math.ceil(Number(headers["x-total-count"]) / Number(limit)) || 0
            }
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
