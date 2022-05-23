import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
//constants
import { BASE_URL, ORDERS } from "../../constants/apiConst";

//material
import { DataGrid, faIR, getDataGridUtilityClass } from "@mui/x-data-grid";
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
//reduxStore
import { useSelector } from "react-redux";
import axios from "axios";
import OrderModal from "./components/OrderModal";
import api from "../../api/api";
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

//-------------------------------------------------------

export default function Orders() {
  //const token = useSelector((state) => state.token);
  //const token = localStorage.getItem('token')
 const token = useSelector((state) => state.token);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("");
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   setProducts(
  //     await api.get("http://localhost:3002/orders", {
  //       headers: { token: token },
  //     })
  //   );
  // };

  useEffect(() => {
    axios
      .get("http://localhost:3002/orders", { headers: { token: token } })
      .then((res) => setProducts(res.data));
  }, []);
  // const { products, error, loading } = useFetch(ORDERS, {
  //   headers: {
  //     token: token,
  //   },
  // });

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
      headerName: " مجموع مبلغ (تومان)",
      width: 300,
      sortable: false,
      editable: false,
      renderCell: (params) => {
        return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      //   valueFormatter: (params) => {
      //     return ('تومان'+ " " +params.value.toLocaleString());
      // }
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
      headerName: "وضعیت تحویل",
      width: 300,
      sortable: false,
      editable: false,

      renderCell: (params) => (
        <a href="#" onClick={() => handleOrder(params)} sx={{ color: "blue" }}>
          بررسی سفارش
        </a>
      ),
      // renderCell: (params) => (
      //   <Link to={`#${params.value}`} onClick={(params)=>handleOrderStatus(params)}>بررسی سفارش </Link>
      // )
    },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    username:
      product.customerDetail.firstName + " " + product.customerDetail.lastName,
    purchaseTotal: product.purchaseTotal,
    delivery: convertTimeStamToDate(product.delivery),
    url: "#",
  }));

  const handleOrder = (params) => {
    const id = params.row.id;
    console.log(id);

    console.log(products);
    //await axios.get(BASE_URL + ORDERS + `/${id}`, { headers: { token: token } });
    //axios.get(BASE_URL+ORDERS+`/${params.row.id}`,{headers:{token:token}}).then(res=>console.log(res.data))
    //setData(params.row.id)
    setData(products.find((item) => item.id === id));
    setIsOpen(true);
    console.log(data);
  };
  console.log(products);
  const handlechange = (value) => {
    if (value === 0) {
      axios
        .get(BASE_URL + ORDERS, { headers: { token: token } })
        .then((res) => setProducts(res.data));
      return;
    }
    axios
      .get(BASE_URL + ORDERS + `?orderStatus=${value}`)
      .then((res) => setProducts(res.data));

    // products = useFetch(, {
    //   headers: {
    //     token: token,
    //   },
    // });
  };

  return (
    <>
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
              defaultValue="0"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="تمام سفارشات  
"
                onChange={() => handlechange(0)}
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="سفارش های تحویل شده  
"
                onChange={() => handlechange(1)}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="سفارش های در انتظار ارسال"
                onChange={() => handlechange(2)}
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
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Grid>
      </Grid>
      <OrderModal open={isOpen} onClose={() => setIsOpen(false)} data={data} />
    </>
  );
}
