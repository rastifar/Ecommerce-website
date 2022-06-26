import React from "react";
import { toast } from "react-toastify";
//----------Material
import { DataGrid, faIR } from "@mui/x-data-grid";
import {  
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
//-----------Material-Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";
//----------Utils
import { numberDivider } from "../../utils/utils";
//----------Components
import CustomPagination from "../../components/CustomPagination";
import MyLink from "../../components/MyLink";
//----------Redux
import { useSelector, useDispatch } from "react-redux";
import {  
  increase,
  decrease,
  romeveItem,
  clearCart,
} from "../../redux/cartSlice";

const CartPage = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mb: 10, p: 4 }}
    >
      <Typography sx={{ my: 2, fontSize: "1.5rem" }}>سبد خرید</Typography>
      <Box item sx={{ height: 300, width: "100%", display: "flex" }}>
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
      </Box>

      {cartData.cartTotalAmount > 0 && (
        <Box
          display={"flex"}
          flexDirection={fullScreen ? "column" : "row"}
          justifyContent={"space-around"}
          alignItems="center"
          sx={{ width: "95vw", mt: 2 }}
        >
         
            <Button
              onClick={() => dispatch(clearCart())}
              color="error"
            variant="outlined"
            my={1}
            >
              پاک کردن سبد خرید
            </Button>
         
            <Typography my={1}>
              قیمت کل : {numberDivider(cartData.cartTotalAmount)} تومان
            </Typography>
          
            <MyLink to="/purchasefinalizing">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#BDF2D5",
                  my:1,
                  "&:hover": {
                    background: "#4B8673",
                  },
                }}
              >
                نهایی کردن سبد خرید
              </Button>
            </MyLink>
          </Box>
        
      )}
    </Box>
  );
};

export default CartPage;

// {
//   <Grid container>
//     <Grid
//       item
//       xs={12}
//       sm={12}
//       md={4}
//       my={1}
//       align={{ xs: "center", sm: "center", md: "right" }}
//     >
//       <Button
//         onClick={() => dispatch(clearCart())}
//         color="error"
//         variant="outlined"
//       >
//         پاک کردن سبد خرید
//       </Button>
//     </Grid>
//     <Grid
//       item
//       xs={12}
//       sm={12}
//       md={4}
//       my={1}
//       align={{ xs: "center", sm: "center", md: "center" }}
//     >
//       <Typography>
//         قیمت کل : {numberDivider(cartData.cartTotalAmount)} تومان
//       </Typography>
//     </Grid>
//     <Grid
//       item
//       xs={12}
//       sm={12}
//       md={4}
//       my={1}
//       align={{ xs: "center", sm: "center", md: "left" }}
//     >
//       <MyLink to="/purchasefinalizing">
//         <Button
//           variant="contained"
//           sx={{
//             bgcolor: "#BDF2D5",
//             "&:hover": {
//               background: "#4B8673",
//             },
//           }}
//         >
//           نهایی کردن سبد خرید
//         </Button>
//       </MyLink>
//     </Grid>
//   </Grid>;
// }
