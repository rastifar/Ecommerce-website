// import React, { useEffect } from "react";
// import useAxios from "../../hooks/useAxios";
// import axios from "../../api/httpRequestApi";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

// import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
// import ArrowBackIosTwoToneIcon from "@mui/icons-material/ArrowBackIosTwoTone";

// import usePagination from "../../hooks/usePagination";

// import { convertTimeStamToDate } from "../../utils/utils";

// const headCells = [
//   { id: "username", label: "نام کاربر" },
//   { id: "purchaseTotal", label: "مجموع مبلغ" },
//   { id: "orderDate", label: "زمان ثبت سفارش " },
//   { id: "orderCrud", label: "" },
// ];

// const Orders = () => {
//   const { products, error, loading, axiosFetch } = useAxios();
//   const { indexOfFirstPost, indexOfLastPost, paginate } = usePagination();

//   const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

//   useEffect(() => {
//     getData();
//   }, []);

  // const getData = () => {
  //   axiosFetch({
  //     axiosInstance: axios,
  //     method: "GET",
  //     url: "/orders",
  //     requestConfig: {headers:{
  //       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkFtaXIgaG9zc2VpbiBNYWhkaW91biIsImlhdCI6MTY1MjM0MTg3MiwiZXhwIjoxNjUyMzUyNjcyfQ.vQHdWx6-hRfqOQbFxpPa9fzTP-USYv75fqWTmCJFjhA"
  //   }},
  //   });
  // };

//   return (
//     <Paper>
//       <TableContainer component={Paper}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               {headCells.map((head) => (
//                 <TableCell align="center">{head.label}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {currentPosts?.map((row) => (
//               <TableRow
//                 key={row.name}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <>
//                   <TableCell component="th" scope="row">
//                     {row.customerDetail.firstName +" " +row.customerDetail.lastName  }
//                   </TableCell>
//                   <TableCell align="center">{row.purchaseTotal}</TableCell>
//                   <TableCell align="center">
//                     {convertTimeStamToDate(row.orderDate)}
//                   </TableCell>
//                   <TableCell align="center">بررسی سفارش</TableCell>
//                 </>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <button onClick={() => paginate(-1)}>
//           <ArrowForwardIosTwoToneIcon />
//         </button>
//         <button onClick={() => paginate(1)}>
//           <ArrowBackIosTwoToneIcon />
//         </button>
//       </TableContainer>
//     </Paper>
//   );
// };

// export default Orders;


import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/httpRequestApi";

import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const columns = [
  {
    field: "image",
    headerName: "تصویر",
    width: 100,
    sortable: false,
    renderCell: (params) => <img src={SERVICE_URL + params.value} />,
  },
  { field: "name", headerName: "نام کاربر", sortable: false,  },
  { field: "category", headerName: "دسته بندی",  },
  {
    field: "deleteOperation",
    headerName: "  ",
    sortable: false,
    
    renderCell: () => <DeleteOutlineOutlinedIcon />,
   
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // 
  },
  {
    field: "editOperation",
    headerName: "  ",
    sortable: false,
    
   
    renderCell: () => <EditOutlinedIcon />,
    // valueGetter: (params) =>
    //   `${params.row.firstName || " "} ${params.row.lastName || ""}`,
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
      url: "/orders",
      requestConfig: {headers:{
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkFtaXIgaG9zc2VpbiBNYWhkaW91biIsImlhdCI6MTY1MjYxMDU3NSwiZXhwIjoxNjUyNjIxMzc1fQ.SWAOHHXD04MaDimw17F449sJEn6rUQeuqf4jCZ93IWw"
    }},
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
