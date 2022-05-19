import React, { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

//material
import { DataGrid, faIR } from "@mui/x-data-grid";
import {
  Grid,
  Radio,
  Typography,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
} from "@mui/material";

//utils
import { convertTimeStamToDate } from "../../utils/utils";
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
    // renderCell: (cellValues) => {
    //   return <Link href={`#${cellValues.row.url}`}>بررسی سفارش</Link>
    // }
  },
];

const SERVICE_URL = "http://localhost:3002";

//-------------------------------------------------------

export default function Orders() {
  // const { products, error, loading, axiosFetch } = useFetch();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  console.log(products);
  
  useEffect(() => {
    axios
      .get("http://localhost:3002/orders", { headers: { token: token } })
      .then((res) => setProducts(res.data));
    // getData();
  }, []);

  // const getData = () => {
  //   axiosFetch({
  //     url: "/orders",
  //     requestConfig: {
  //       headers: {
  //         token:token

  //       },
  //     },
  //   });
  // };

  const rows = products.map((product) => ({
    id: product.id,
    username:
      product.customerDetail.firstName + " " + product.customerDetail.lastName,
    purchaseTotal: product.purchaseTotal,
    delivery: convertTimeStamToDate(product.delivery),
    // url: product.id,
  }));

  async function handleRecivedProducts(num) {
    try {
      const result = await axios.get(
        `http://localhost:3002/orders?orderStatus=${num}`
      );
     
     setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
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
        <Grid item xs={2} align="right" sx={{ flexGrow: 1 }}>
          <Typography>مدیریت سفارش ها</Typography>
        </Grid>
        <Grid item xs={10} align="center">
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              onClick={() => handleRecivedProducts(1)}
              label="سفارش های تحویل شده  
"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              onClick={() => handleRecivedProducts(2)}
              label="سفارش های در انتظار ارسال"
            />
          </RadioGroup>
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
