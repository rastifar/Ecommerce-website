import React, { useEffect, useState,useMemo } from "react";
import { useParams,useLocation } from "react-router-dom";
import { Grid, Box, ListItemText, List,Pagination,CircularProgress} from "@mui/material";

import axios from "axios";
import { caterories } from "../../constants/formsConst";
import useFetch from '../../hooks/useFetch'


import ProductCards from "../../components/ProductCards";
import MyLink from "../../components/MyLink";
const ProductGroups = () => {
  const limit = useMemo(() => 6, []);
  const [activePage, setActivePage] = useState(1);
  const { categoryNum } = useParams();

  const { data, loading, error } = useFetch(
    `http://localhost:3002/products?category=${categoryNum}&_page=${activePage}&_limit=${limit}}&_sort=asc`
  );
  //const [data, setData] = useState([]);
  // const { products, error, loading, axiosFetch } = useFetch();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3002/products?category=${categoryNum}`)
  //     .then((res) => setData(res.data));
  // }, [categoryNum]);

  return (
    <Grid
      container
      sx={{ my: 4 }}
      direction="column"
      alignItems="center"
      justifyContent="center"
      
    >
      {/* <Grid item>
        <Box>
          {caterories.map((item) => (
            <MyLink to={`/productgroup/${item.value}`} key={item.value}>
              <Box
                component="span"
                sx={{ mx: 2, p: 2, border: "1px dashed grey",my:3,display:'inline-block' }}
              >
                {item.label}
              </Box>
            </MyLink>
          ))}
        </Box>
      </Grid> */}
      {/* <Grid item>
        <h1> محصولات</h1>
      </Grid> */}
       {loading ? (
              <Box
                sx={{
                  position: "absolute",
                  background: "#fafafa",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
               <Grid
        container
              direction="row"
           
        sx={{ textAlign: "center" }}
      // spacing={{ xs: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data?.data.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} md={4}  >
          
              <ProductCards productData={item}
                // image={item.image}
                // name={item.name}
                // price={item.price}
              />
           
          </Grid>
        ))}
      </Grid>
              </>
            )}
   <Box sx={{mt:15}}>
      <Pagination    variant="outlined"
        defaultPage={1}
        page={activePage}
        count={Math.ceil(Number(data?.headers["x-total-count"]) / Number(limit))}
        onChange={(_, page) => {
          console.log("page:", page);
          setActivePage(page);
          }} />
        </Box>
    </Grid>
  );
};

export default ProductGroups;
