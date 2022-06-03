import * as React from "react";
//---------------Material
import { Button, Grid, Box, Typography } from "@mui/material";
import { DataGrid, faIR } from "@mui/x-data-grid";

//----------------Utils
import { convertTimeStamToDate, numberDivider } from "../../../utils/utils";

//---------------components
import CustomPagination from "../../../components/CustomPagination";

//---------------columns
import { columns } from "./columns";
import axios from "axios";
import { BASE_URL, ORDERS } from "../../../constants/apiConst";
//--------------Redux
import { useSelector} from "react-redux";

//---------------Toast
import { toast} from "react-toastify";

export default function OrderForm({ data, onClose,handlechange }) {
  const token = useSelector((state) => state.token);
  
  const rows = data.orderItems?.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  const handleDelivery = () => {
    axios
      .patch(
        BASE_URL + ORDERS +`/${data.id}`,
        { orderStatus: 1 ,deliverdAt: + new Date()},
        {
          headers: { token: token },
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        handlechange(2)
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
