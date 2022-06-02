import * as React from "react";
//----------Material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography
} from "@mui/material";
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import OrderForm from "./OrderForm";

export default function OrderModal({ data, open, onClose ,handlechange}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
       fullScreen={fullScreen}
       maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Box display='flex' justifyContent='space-between'>
            <Typography>  نمایش سفارش</Typography>
            <CancelPresentationTwoToneIcon sx={{ color: "red" }} onClick={onClose} />
          </Box>
        
        </DialogTitle>

        <DialogContent  sx={{width:'60vw'}}>
                  <OrderForm data={data} onClose={onClose} handlechange={handlechange}/>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
