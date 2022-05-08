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

export default function Modal({ title }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          افزودن/ویرایش کالا
        </DialogTitle>
        <DialogContent>
          <form>
            <input type="text" name="firstName" />
            <input type="file" name="firstName" />
            <input type="text" name="age" />
                      <input type="submit" />
                      <Box>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="تصویر کالا"
              type="text"
              
              variant="standard"
            />
            <Button variant="contained" component="label">
              بارگذاری عکس
              <input type="file" hidden />
                          </Button>
                          </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
