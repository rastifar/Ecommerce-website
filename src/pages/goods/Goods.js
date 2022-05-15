// import React, { useState, useEffect } from "react";
// import useAxios from "../../hooks/useAxios";
// import axios from "../../api/httpRequestApi";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   Box,
//   TablePagination,
//   TableSortLabel,
//   Toolbar,
//   Typography,
//   IconButton,
//   Tooltip,
//   FormControlLabel,
//   Switch,
// } from "@mui/material";

// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";

// import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { goodsHeadCells } from '../../constants/tableHeaderConst';
// import EnhanceTableHead from "../../components/EnhanceTableHead";

// const category = { 1: "میوه و سبزی تازه", 2: "میوه و سبزی منجمد", 3: "اسموتی" };

// const SERVICE_URL = "http://localhost:3002";

// const Goods = () => {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('category');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const { rows, error, loading, axiosFetch } = useAxios();

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axiosFetch({
//       axiosInstance: axios,
//       method: "GET",
//       url: "/products",
//     });
//   };
//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   return (
// <Grid container direction="column">
//   <Grid container sx={{ p: 5 }}>
//     <Grid item>مدیریت کالاها</Grid>
//     <Grid item>جستجو</Grid>
//     <Grid item>افزودن کالا</Grid>
//   </Grid>
//   <Grid item>
//         <TableContainer component={Paper}>
//           <Table stickyHeader>
//           <EnhanceTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}

//               rowCount={rows.length}
//               headCells= {goodsHeadCells}
//             />
//             <TableBody>

//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>
//     </Grid>
//   );
// };

// export default Goods;

// // const [open,setOpen] = useState(false)
// // const [goods, error, loading, axiosFetch] = useAxios();
// // const janatan={
// //   axiosInstance: axios,
// //   method: "POST",
// //   url: "/products",
// //   requestConfig: {
// //     name: "کیف پول چرم جانتا مدل 124",
// //     category: "15",
// //     brand: "جانتا",
// //     price: "120000",
// //     count: "12",
// //     description:
// //       "اکارتی ها ابزار و پوشش برای محافظت و نگهداری از همه ی کارت های مهم یک فرد، به خصوص کارت های بانکی هستند. جاکارتی جدید مجموعه ی چرم جانتا از طراحی ساده و در عین حال کاربردی برخوردار است. از لحاظ جنس، این جاکارتی از متریال چرم طبیعی مرغوب و منعطف ساخته شده است. این محصول در رنگ بندی متنوع و زیبا ساخته شده که تمام سلیقه ها را پوشش می دهد. برشی به اندازه انگشت شصت روی سطح رویی محصول طراحی شده است.",
// //     images: "c4e5c64298b479e9881aa323206920a3",
// //     thumbnail: "c4e5c64298b479e9881aa323206920a3",
// //   },
// // }

// // const handleNewAdd = () => {
// //   axiosFetch(janatan);
// // };

// // return (
// //   <div>
// //     <h1>Goods</h1>
// //     <button onClick={handleNewAdd}>add</button>
// //     {/* <button onClick={()=>setOpen(true)}>modal</button> */}
// //     <Modal title="افزودن کالا"/>
// //   </div>
// // );

import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/httpRequestApi";
import { styled } from "@mui/material/styles";

import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const IMG = styled('img')`
width:2rem;
height:2rem;
border-radius:50%;
object-fit: cover;
`

const columns = [
  {
    field: "image",
    headerName: "تصویر",
    width: 200,
    sortable: false,
    renderCell: (params) => <IMG src={SERVICE_URL + params.value} />,
  },
  { field: "name", headerName: "نام کالا", sortable: false,editable:true,width: 400  },
  { field: "category", headerName: "دسته بندی",width: 400  },
  {
    field: "deleteOperation",
    headerName: "  ",
    sortable: false,
    width: 50,
    renderCell: () => <DeleteOutlineOutlinedIcon sx={{color:"red"}} />,
   
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    
  },
  {
    field: "editOperation",
    headerName: "  ",
    sortable: false,
    width: 50,
   
    renderCell: () => <EditOutlinedIcon sx={{color:"green"}}/>,
    valueGetter: (params) =>
      `${params.row.firstName || " "} ${params.row.lastName || ""}`,
  },
];

const SERVICE_URL = "http://localhost:3002";

export default function DataTable() {
  const { products, error, loading, axiosFetch } = useAxios();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/products",
    });
  };

  const rows = products.map((product) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    category: product.category,
    // crudOperation:< EditOutlinedIcon/>
  }));
  console.log(products);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 5 }}
    >
      <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
        <Grid item xs={2} align="right" >
          <Typography>مدیریت کالاها</Typography>
        </Grid>
        <Grid item xs={8} align="center" >
          جستجو
        </Grid>
        <Grid item xs={2} align="left" >
          <Button variant="outlined" color="primary">افزودن کالا</Button>{" "}
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
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          // localeText={{
          //   toolbarDensityLabel: 'Size',
          //   toolbarDensityCompact: 'Small',
          //   toolbarDensityStandard: 'Medium',
          //   toolbarDensityComfortable: 'Large',
          // }}
          // components={{
          //   Toolbar: GridToolbar,
          // }}
        />
        {/* </div> */}
      </Grid>
      
    </Grid>
  );
}
// style={{ height: 400, width: '100%' }}
