// import React, { useEffect } from "react";
// import useFetch from "../../hooks/useFetch";

// //material
// import { DataGrid, faIR } from "@mui/x-data-grid";
// import { Grid, Button, Typography } from "@mui/material";

// //----------------------------------------------
// //columns
// const columns = [
//   {
//     field: "productName",
//     headerName: "کالا",
//     width: 400,
//     sortable: false,
//   },
//   {
//     field: "price",
//     headerName: "قیمت ",
//     sortable: false,
//     editable: true,
//     width: 400,
//   },
//   {
//     field: "count",
//     headerName: "موجودی",
//     sortable: false,
//     editable: true,
//     width: 400,
//   },
// ];

// const SERVICE_URL = "http://localhost:3002";

// export default function StoreQuantity() {
//   const { products, error, loading, axiosFetch } = useFetch();

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axiosFetch({
//       url: "/products",
//     });
//   };

//   const rows = products.map((product) => ({
//     id: product.id,
//     productName: product.name,
//     price: product.price,
//     count: product.count,
//   }));

//   return (
//     <Grid
//       container
//       direction="column"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ p: 5 }}
//     >
//       <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
//         <Grid item xs={2} align="right">
//           <Typography>مدیریت موجودی و قیمت ها</Typography>
//         </Grid>
//         <Grid item xs={8} align="center">
//           جستجو
//         </Grid>
//         <Grid item xs={2} align="left">
//           <Button variant="outlined" color="primary">
//             ذخیره
//           </Button>{" "}
//         </Grid>
//       </Grid>
//       <Grid item sx={{ height: 400, width: "100%" }}>
//         {/* <div > */}
//         <DataGrid
//           item
//           sx={{ background: "white" }}
//           rows={rows}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 15]}
//           localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
//         />
//       </Grid>
//     </Grid>
//   );
// }
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

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
    width: 400,
    sortable: false,
  },
  {
    field: "price",
    headerName: "قیمت ",
    sortable: false,
    editable: true,
    width: 400,
  },
  {
    field: "count",
    headerName: "موجودی",
    sortable: false,
    editable: true,
    width: 400,
  },
];

const SERVICE_URL = "http://localhost:3002";
const changedItem = []
export default function StoreQuantity() {
  // const { products, error, loading, axiosFetch } = useFetch();
  const [products, setProducts] = useState([]);
  
  const [change, setChange] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3002/products")
      .then((res) => setProducts(res.data));
  }, []);

  // const handleEdit = (params, event) => {
  //   console.log("edit");
  //   const row = params.row
  //   console.log(row );
  //   event.stopPropagation();

  //   setChange({ ...change, row })
  //   console.log(change );
  // };
  const handleEdit = (params) => {
    // event.stopPropagation();
    console.log("edit");
    // const row = params.row;
    // console.log(row);
    const array = products.map((r) => {
      if (r.id === params.row.id) {
        changedItem.push(params.row.id)
        return { ...r, [params.field]: params.value };
        
      } else {
        return { ...r };
      }
    });
    setProducts(array);
    console.log(array);
    console.log("change",changedItem)
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = () => {
  //   axiosFetch({
  //     url: "/products",
  //   });
  // };

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
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          // onCellEditCommit={handleEdit}
          // onCellFocusOut={handleEdit}
          // onCellEditStop={(params) => console.log(params.id, params.row)}
          // onRowEditStop={(params) => console.log(params.id, params.row)}
           onCellEditCommit={handleEdit}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </Grid>
  );
}
