import * as React from "react";
//---------------Material
import { Button, Grid, Box, Typography } from "@mui/material";
import { DataGrid, faIR } from "@mui/x-data-grid";
//----------------Utils
import { convertTimeStamToDate, numberDivider } from "../../../utils/utils";
//---------------Components
import CustomPagination from "../../../components/CustomPagination";
//---------------Columns
import { columns } from "./columns";
//--------------Redux
import { useDispatch, useSelector} from "react-redux";
import { changeState } from "../../../redux/modalSlice";
//---------------Toast
import { toast } from "react-toastify";
//---------------Api
import { deliveredOrder } from "../../../api/orderApi";

export default function OrderForm({ data, onClose,handlechange }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch()
  
  const rows = data.orderItems?.map((item) => ({
    id: item.id,
    name: item.name,
    price:  numberDivider(item.price),
    quantity: item.quantity,
  }));

  const handleDelivery = () => {
  deliveredOrder(data.id)    
      .then((res) => {
        handlechange(2)
        dispatch(changeState())
        toast.success("با موفقیت به کالاهای تحویل شده اضافه شد")
      })
      .catch((error) =>
      toast.error("خطایی روی داده است لطفا دوباره امتحان کنید")
    );    
    onClose();
  };
  return (
    <Box>
      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
      // sx={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}
      >
      
      <Box sx={{ border: "1px solid black", borderRadius: "5px" }}>
        <Grid container spacing={1} sx={{ mb: 2,p:2 }}>
          <Grid item xs={12} sm={6} sx={{ p: 2, mt: 1 }}>
            <Typography>
              {" "}
              نام مشتری :{" "}
              {`${data.customerDetail.firstName} ${data.customerDetail.lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 2, mt: 1 }}>
            <Typography>آدرس : {data.customerDetail.billingAddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 2, mt: 1 }}>
            <Typography>
              {" "}
              زمان تحویل: {convertTimeStamToDate(data.delivery)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 2, mt: 1 }}>
            <Typography>
              {" "}
              زمان سفارش: {convertTimeStamToDate(data.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 2, mt: 1 }}>
            <Typography>تلفن : {data.customerDetail.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 2, mt: 1 }}>
            <Typography sx={{ bgcolor: "body_bg" }}>
              مجموع مبلغ سفارش : {numberDivider(data.purchaseTotal)}
            </Typography>
          </Grid>
        </Grid>
        {/* <List>
          <ListItem>
            {" "}
            نام مشتری :{" "}
            {`${data.customerDetail.firstName} ${data.customerDetail.lastName}`}
          </ListItem>
          <ListItem>آدرس : {data.customerDetail.billingAddress}</ListItem>
          <ListItem>تلفن : {data.customerDetail.phone}</ListItem>
          <ListItem>
            زمان تحویل: {convertTimeStamToDate(data.delivery)}
          </ListItem>
          <ListItem>
            زمان تحویل: {convertTimeStamToDate(data.delivery)}
          </ListItem>
        </List> */}

        <Grid item sx={{ height: 300, width: "100%", p: 2 }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                item
                sx={{ background: "white" }}
                rows={rows}
                columns={columns}
                rowsPerPageOptions={[2]}
                pagination
                components={{
                  Pagination: CustomPagination,
                }}
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
              />
            </div>
          </div>
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {data.orderStatus !== 1 && (
          <Button
            autoFocus
            onClick={handleDelivery}
            variant="outlined"
            sx={{ px: 3, mt: 2 }}
          >
            تحویل شد
          </Button>
        )}
        {data.orderStatus === 1 && (
          <Box sx={{ px: 3, mt: 2 }}>
            <Typography>
              زمان تحویل : {convertTimeStamToDate(data.deliverdAt)}
            </Typography>
          </Box>
        )}
          </Box>
          </Box>
    </Box>
  );
}
