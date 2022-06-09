import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
//constant
import { PRODUCTS } from "../../constants/apiConst";
//api
import axios from "axios";
import api from "../../api/api";
import HttpService from "../../services/httpService";
//toast
import { toast } from "react-toastify";
//material
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { getProduts, setProducts } from "../../redux/productsSlice";
//components
import CustomPagination from "../../components/CustomPagination";
import { columns } from "./components/columns";
import useDebounce from "../../components/Debounce";
//-----------Utils
import { numberDivider } from "../../utils/utils";

//----------------------------------------------
//A temporary array to keep track of changed items
const changedArray = [];

export default function StoreQuantity() {
  // const { products, error, loading, axiosFetch } = useFetch(PRODUCTS);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const token = useSelector((state) => state.token);
  // const {status} = useSelector(state=>state.products.status)
  // const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getProduts());
  }, [dispatch]);

  console.log(products);

  const handleEdit = (params) => {
    setEditMode(true);
    const { id, field, value } = params;
    changedArray.push(id);
    const array = products?.map((r) => {
      if (r.id === id) {
        return { ...r, [field]: value };
      } else {
        return { ...r };
      }
    });
    dispatch(setProducts(array));
  };

  const rows = products?.map((product) => ({
    id: product.id,
    productName: product.name,
    price: numberDivider(product.price),
    count: numberDivider(product.count),
  }));

  const handleSendEdit = () => {
    //Conver Array to set to prevent duplicate request call
    const setFromChangedArray = new Set(changedArray);
    //to hold all the requests in this array
    let promiseTempArray = [];

    setFromChangedArray.forEach((i) => {
      //find which product to be updated
      const productToUpdate = products.find((item) => item.id === i);

      const tempRequest = HttpService.patch(
        PRODUCTS + `/${i}`,
        { price: productToUpdate.price, count: productToUpdate.count },
        {
          headers: { token: token },
          "Content-Type": "application/json",
        }
      );
      promiseTempArray.push(tempRequest);
    });
    Promise.all(promiseTempArray)
      .then((res) => toast.success(" اطلاعات با موفقیت به روز رسانی شده است"))
      .catch((error) =>
        toast.error("خطایی در بروز رسانی داده ها  رخ داده است")
      );
  };

  return (
    <Box
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 0.4 }}
    >
      <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
        <Grid item xs={12} sm={3} align="right" py={{ xs: 1, md: 0 }}>
          <Typography>مدیریت موجودی و قیمت ها</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          align={{ xs: "right", sm: "center" }}
          py={{ xs: 1, md: 0 }}
        >
          جستجو
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          align={{ xs: "right", sm: "left" }}
          py={{ xs: 1, md: 0 }}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={editMode ? false : true}
            onClick={handleSendEdit}
          >
            ذخیره
          </Button>{" "}
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ height: 400, width: "100%", display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            item
            sx={{ background: "white" }}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Pagination: CustomPagination,
              LoadingOverlay: LinearProgress,
            }}
            disableSelectionOnClick
            pagination
            // onPageChange={handlechange}
            onCellEditCommit={handleEdit}
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </Grid>
    </Box>
  );
}
