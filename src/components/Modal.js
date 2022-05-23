import * as React from "react";
import AddEditForm from "./AddEditForm";
import ReactDom from "react-dom";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Modal({ open, onClose, data }) {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!open) return null;
  console.log(data);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    onClose();
  };

  return ReactDom.createPortal(
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>افزوردن / ویرایش کالا</DialogTitle>
        <DialogContent>
          <AddEditForm formData={data}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' >بستن</Button>
          
        </DialogActions>
      </Dialog>
    </div>,
    document.getElementById("portal")
  );
}
