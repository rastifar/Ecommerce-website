import React, { useEffect, useState } from "react";
//------------Constants
import { BASE_URL, ORDERS } from "../../constants/apiConst";
//------------Material
import { DataGrid, faIR } from "@mui/x-data-grid";
import {
  Grid,
  Radio,
  Typography,
  RadioGroup,
  Box,
  FormControlLabel, 
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
//------------Utils
import { convertTimeStamToDate, numberDivider } from "../../utils/utils";
//------------Components
import OrderModal from "./component/OrderModal";
import CustomPagination from "../../components/CustomPagination";
//------------ReduxStore
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "../../redux/modalSlice";
//------------Api
import { getAllOrders } from "../../api/orderApi";
//-------------------------------------------------------

export default function Orders() {
  const modalmode = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  //const token = localStorage.getItem('token')
  const token = useSelector((state) => state.token);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("");
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getOrders = () => {
      getAllOrders(`?_sort=createdAt&_order=desc`).then((res) =>
        setProducts(res)
      );
    };
    getOrders();
  }, []);

  //columns
  const columns = [
    {
      field: "username",
      headerName: "نام کاربر",
      minWidth: 300,
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: "purchaseTotal",
      headerName: " مجموع مبلغ (تومان)",
      minWidth: 300,
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      // renderCell: (params) => {
      //   return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // },
      //   valueFormatter: (params) => {
      //     return ('تومان'+ " " +params.value.toLocaleString());
      // }
    },
    {
      field: "delivery",
      headerName: "زمان ثبت سفارش",
      minWidth: 300,
      flex: 1,
      sortable: true,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: "orderStatus",
      headerName: "وضعیت تحویل",
      minWidth: 300,
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu: true,

      // renderCell: (params) => (
      //   <a href="#" onClick={() => handleOrder(params)} sx={{ color: "blue" }}>
      //     بررسی سفارش
      //   </a>
      // ),
      renderCell: (params) => (
        <Typography
          onClick={() => handleOrder(params)}
          sx={{ color: "#2155CD" }}
        >
          {" "}
          بررسی سفارش
        </Typography>
      ),

      // renderCell: (params) => (
      //   <Link to={`#${params.value}`} onClick={(params)=>handleOrderStatus(params)}>بررسی سفارش </Link>
      // )
    },
  ];

  const rows = products?.map((product) => ({
    id: product.id,
    username:
      product.customerDetail.firstName + " " + product.customerDetail.lastName,
    purchaseTotal: numberDivider(product.purchaseTotal),
    delivery: convertTimeStamToDate(product.createdAt),
    url: "#",
  }));

  const handleOrder = (params) => {
    const id = params.row.id;
    setData(products.find((item) => item.id === id));
    setIsOpen(true);
    dispatch(changeState());
  };

  const handlechange = (value) => {
    if (value === 0) {
      getAllOrders(`?_sort=createdAt&_order=desc`).then((res) =>
        setProducts(res)
      );
    }
    if (value === 1 || value === 2) {
      getAllOrders(`?orderStatus=${value}&_sort=createdAt&_order=desc`).then(
        (res) => setProducts(res)
      );
      // axios
      //   .get(BASE_URL + ORDERS + `?orderStatus=${value}`)
      //   .then((res) => setProducts(res.data));
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={0.4}
      >
        <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
          <Grid
            item
            xs={12}
            sm={3}
            md={2}
            color={{ xs: "red", sm: "text.primary" }}
          >
            <Typography p={1}>مدیریت سفارش ها</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={10} align="right">
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="تمام سفارشات "
                onChange={() => handlechange(0)}
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="سفارش های تحویل شده  "
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
            components={{
              Pagination: CustomPagination,
              LoadingOverlay: LinearProgress,
            }}
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
          />
          <OrderModal
            data={data}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            handlechange={handlechange}
          />
        </Grid>
      </Box>
    </>
  );
}
