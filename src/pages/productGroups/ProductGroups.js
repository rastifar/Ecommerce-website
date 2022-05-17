import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import axios from "axios";

import ProductCards from "../../components/ProductCards";
const ProductGroups = () => {
  const { categoryNum } = useParams();
  const [data, setData] = useState([]);
  // const { products, error, loading, axiosFetch } = useFetch();
  useEffect(() => {
    axios
      .get(`http://localhost:3002/products?category=${categoryNum}`)
      .then((res) => setData(res.data));
  }, []);

  return (
    <Grid
      container
      sx={{ my: "7rem" }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <h1>This is product Group page</h1>
      </Grid>
      <Grid
        container
        direction="row"
        sx={{ textAlign: "center" }}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {data.map((item) => (
          <Grid item key={item.name} xs={12} md={4} lg={3}>
            <ProductCards
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProductGroups;
