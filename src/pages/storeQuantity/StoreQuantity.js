import React, { useEffect,useState } from "react";
import useFetch from "../../hooks/useFetch";
//constant
import { PRODUCTS } from "../../constants/apiConst";
//axiosApi
import api from "../../api/api";

//material
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";
import { ChangeCircle } from "@mui/icons-material";
import axios from "axios";

//----------------------------------------------
//columns
const columns = [
  {
    field: "productName",
    headerName: "کالا",    
    sortable: false,
    editable: false,
    flex:1,
  },
  {
    field: "price",
    headerName: "قیمت ",
    sortable: false,
    editable: true,
    flex: 1,
    renderCell: (params) => {
      return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  {
    field: "count",
    headerName: "موجودی",
    sortable: false,
    editable: true,
    flex:1,
  },
];

export default function StoreQuantity() {
  //const { products, error, loading, axiosFetch } = useFetch(PRODUCTS);
  const[products,setProducts] = useState([])
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {getData()}, [])
  const getData = async() => {
    setProducts(await api.get(PRODUCTS))
  }

  const handleEdit = (params) => {
  //   // event.stopPropagation();
  //   console.log("edit");
  //   // const row = params.row;
  //   // console.log(row);
  //   const array = products.map((r) => {
  //     if (r.id === params.row.id) {
  //       changedItem.push(params.row.id)
  //       return { ...r, [params.field]: params.value };
        
  //     } else {
  //       return { ...r };
  //     }
  //   });
  //   setProducts(array);
  //   console.log(array);
  //   console.log("change",changedItem)
  };
  
  const rows = products.map((product) => ({
    id: product.id,
    productName: product.name,
    price: product.price,
    count: product.count,
  }));

  // const handleSave = () => {
  //   changedItem.map(i => {
  //     const result = products.find(product => product.id === i)
  //     axios.put("http://localhost:3002/products",result).then(res=>{
        
  //     })
    
  //   })
  // }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 5 }}
    >
      <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
        <Grid item xs={2} align="right">
          <Typography>مدیریت موجودی و قیمت ها</Typography>
        </Grid>
        <Grid item xs={8} align="center">
          جستجو
        </Grid>
        <Grid item xs={2} align="left">
          <Button variant="outlined" color="primary" >
            ذخیره
          </Button>{" "}
        </Grid>
      </Grid>
      <Grid item sx={{ height: 400, width: "100%" }}>
        {/* <div > */}
        <DataGrid
          item
          sx={{ background: "white" }}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          onCellEditCommit={handleEdit}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </Grid>
  );
}
