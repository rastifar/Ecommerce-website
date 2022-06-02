import * as React from "react";

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
import FormAddOrEdit from "./FormAddOrEdit";

export default function Modal({ open, onClose , data }) {
 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

 

  return (
    <Box>
     
      <Dialog
        fullScreen={fullScreen}
        maxWidth='lg'
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          افزودن/ویرایش کالا
        </DialogTitle>
        <DialogContent>
          <FormAddOrEdit data={data}/>
        </DialogContent>
        <DialogActions>
        <button onClick={onClose}>بستن</button>          
        </DialogActions>
      </Dialog>
    </Box>
  );
}
