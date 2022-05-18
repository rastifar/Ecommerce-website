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

export default function Modal({open, onClose}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return ReactDom.createPortal(   
  <div>
  <Button variant="outlined" onClick={handleClickOpen}>
    {title}
  </Button>
  <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">
      افزودن / ویرایش کالا
    </DialogTitle>
    <AddEditForm />
  </Dialog>
</div>   
,
document.getElementById("portal")
)
    
  
}
