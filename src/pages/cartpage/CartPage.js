import React, { useEffect } from "react";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography, Box } from "@mui/material";
//utile
import { numberDivider } from "../../utils/utils";
//components
import CustomPagination from "../../components/CustomPagination";
//icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";
//Toast
import { toast } from "react-toastify";
//Redux
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  increase,
  decrease,
  romeveItem,
  clearCart,
} from "../../redux/cartSlice";
import MyLink from "../../components/MyLink";

const CartPage = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const columns = [
    {
      field: "name",
      headerName: "کالا",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 2,
      headerAlign: "left",
      renderCell: (params) => (
        <MyLink to={`/products/${params.row.id}`} color="primary">
          {params.value}
        </MyLink>
      ),
    },
    {
      field: "price",
      headerName: "قیمت",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 2,
    },
    {
      field: "count",
      headerName: "تعداد",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 2,
      headerAlign: "left",
    },
    {
      field: "increase_decrease",
      headerName: "افزایش / کاهش",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <AddBoxTwoToneIcon
            onClick={() => handleIncrease(params)}
            sx={{ color: "purple" }}
          />
          <IndeterminateCheckBoxTwoToneIcon
            onClick={() => handleDecrease(params)}
            sx={{ color: "red" }}
          />
        </>
      ),
    },
    {
      field: "deleteOperation",
      headerName: " حذف محصول",
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <DeleteOutlineOutlinedIcon
          onClick={() => handleDeleter(params)}
          sx={{ color: "red" }}
        />
      ),
    },
  ];

  const rows = cartData.cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: numberDivider(item.price),
    count: item.quantity,
  }));

  const handleIncrease = (params) => {
    const id = params.row.id;
    const itemToIncrease = cartData.cartItems.find((item) => item.id === id);
    if (itemToIncrease.count > itemToIncrease.quantity) {
      dispatch(increase(itemToIncrease));
      return;
    }
    toast.error("میزان درخواستی بیشتر از موجودی انبار است");
  };
  const handleDecrease = (params) => {
    if (params.row.count == 1) {
      toast.error("اگه این کالا رو نمی خوای حذفش کن");
      return;
    }
    const id = params.row.id;
    const itemToIncrease = cartData.cartItems.find((item) => item.id === id);
    dispatch(decrease(itemToIncrease));
  };

  const handleDeleter = (params) => {
    const id = params.row.id;
    const itemToRemove = cartData.cartItems.find((item) => item.id === id);
    dispatch(romeveItem(itemToRemove));
  };
  return (
    <Box sx={{ mb: 10, p: 4 }}>
      <Typography   sx={{my:2,fontSize:'1.5rem'}}>سبد خرید</Typography>
      <Grid item sx={{ height: 300, width: "100%" }}>
        <DataGrid
          item
          sx={{ background: "white" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          pagination
          components={{
            Pagination: CustomPagination,
          }}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>

      {cartData.cartTotalAmount > 0 && (
        <Box
          display="flex"
          direction={{xs:'column',sm:'row'}}
          justifyContent={"space-between"}
          sx={{ mt: 3 }}
        >
          <Button onClick={() => dispatch(clearCart())} color="error" variant="outlined">
            پاک کردن سبد خرید
          </Button>
          <Typography>
            قیمت کل : {numberDivider(cartData.cartTotalAmount)} تومان
          </Typography>
          <MyLink to='/purchasefinalizing'>
          <Button  variant="contained" sx={{bgcolor:"#BDF2D5",'&:hover': {
              background: "#4B8673",
           }}}>
            نهایی کردن سبد خرید
            </Button>
            </MyLink>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
