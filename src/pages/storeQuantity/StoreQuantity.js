import React, { useEffect, useState } from "react";
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
    flex: 1,
  },
  {
    field: "price",
    headerName: "قیمت (تومان) ",
    sortable: false,
    editable: true,
    flex: 1,
    renderCell: (params) => {
      return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    preProcessEditCellProps: (params) => {
      const num = Number(params.props.value);
      const hasError = !(Number.isInteger(num) && num >= 0);
      return { ...params.props, error: hasError };
    },
  },
  {
    field: "count",
    headerName: "موجودی",
    sortable: false,
    editable: true,
    flex: 1,
    renderCell: (params) => {
      return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    preProcessEditCellProps: (params) => {
      const num = Number(params.props.value);
      const hasError = !(Number.isInteger(num) && num >= 0);
      return { ...params.props, error: hasError };
    },
  },
];


const changedArray = []
let array = {}
export default function StoreQuantity() {
  //const { products, error, loading, axiosFetch } = useFetch(PRODUCTS);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setProducts(await api.get(PRODUCTS));
  };

  const handleEdit = async (params) => {
    // console.log(changedArray);
    setEditMode(true);
    const { id, field, value } = params
    
         array = products.map((r) => {
        if (r.id === id) {
          //changedItem.push(params.row.id)
          return { ...r, [field]: value };

        } 
         });
    console.log(array);
//changedArray.push({id,[field]:value})
//console.log(changedArray);
    // const itemIndex = changedArray.findIndex(item=>item.id ===id)   
    // if (itemIndex < 0) {
    //   changedArray.push({id:id,[field]:value})
    // }
    // else {
    //   const updatedValue = changedArray[itemIndex]
    //   updatedValue[field] = value
    // }

    // console.log(params);
    // console.log(params.id);
    // console.log('id',id);
    // console.log('field',field);
    // console.log('value', value);
    
    // changedArray.map(item => {
    //   if (item.id === id) {
    //     return{...item,[field]:value}
    //   }
    //   else {
    //     return {...item}
    //   }
    // })

    //  console.log('edit');
    //   // event.stopPropagation();
    //   console.log("edit");
    //const row = params.id;
    //console.log(row);
      // const array = products.map((r) => {
      //   if (r.id === id) {
      //     //changedItem.push(params.row.id)
      //     return { ...r, [field]: value };

      //   } else {
      //     return { ...r };
      //   }
      // });
      // setProducts(array);
    //   console.log(array);
   // console.log("change",products)
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
  // const handleStartEdit = () => {
  //   console.log('start edit');
  //   setEditMode(true)
  // }
  const handlechange = () => {
    console.log("page is changing");
  };

  const handleSendEdit = () => {
    console.log(changedArray);
  }

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
          onPageChange={handlechange}
          onCellEditCommit={handleEdit}
          // onRowEditCommit={handleEdit}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </Grid>
  );
}
