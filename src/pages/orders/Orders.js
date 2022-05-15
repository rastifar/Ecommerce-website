import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/httpRequestApi";
//material 
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";
//utils
import {convertTimeStamToDate} from "../../utils/utils"
import { Link } from "react-router-dom";
//---------------------------------------------------------
//columns
const columns = [
  {
    field: "username",
    headerName: "نام کاربر",
    width: 300,
    sortable: false,
    editable: false,
  },
  {
    field: "purchaseTotal",
    headerName: "مجموع مبلغ",
    width: 300,
    sortable: false,
    editable: false,
  },
  {
    field: "delivery",
    headerName: "زمان ثبت سفارش",
    width: 300,
    sortable: true,
    editable: false,
  },
  {
    field: "orderStatus",
    headerName: "  ",
    width: 300,
    sortable: false,
    editable: false,  
  }

];

const SERVICE_URL = "http://localhost:3002";

//-------------------------------------------------------

export default function Orders() {
  const { products, error, loading, axiosFetch } = useAxios();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/orders",
      requestConfig: {
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkFtaXIgaG9zc2VpbiBNYWhkaW91biIsImlhdCI6MTY1MjYzNTAwNywiZXhwIjoxNjUyNjQ1ODA3fQ.kBIYs4FQHDDlsLFNpRpkq8-dvlT0RF1z4ymfh72hXlM",
        },
      },
    });
  };

  const rows = products.map((product) => ({
    id: product.id,
    username: product.customerDetail.firstName +" "+product.customerDetail.lastName,
    purchaseTotal: product.purchaseTotal,
    delivery: convertTimeStamToDate(product.delivery),
    orderStatus: <Link>بررسی سفارش</Link>   
  }));
 
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
          <Typography>مدیریت سفارش ها</Typography>
        </Grid>
        <Grid item xs={8} align="center">
          سفارش های تحویل شده  
        </Grid>
        <Grid item xs={2} align="left">
          <Button variant="outlined" color="primary">
          سفارش های در انتظار ارسال
          </Button>{" "}
        </Grid>
      </Grid>
      <Grid item sx={{ height: 400, width: "100%" }}>
       
        <DataGrid
          item
          sx={{ background: "white" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}     
        />
       
      </Grid>
    </Grid>
  );
}
