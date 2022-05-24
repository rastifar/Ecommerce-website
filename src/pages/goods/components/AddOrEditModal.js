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

export default function Modal({ title }) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          افزودن/ویرایش کالا
        </DialogTitle>
        <DialogContent>
          <FormAddOrEdit/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            بستن
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
