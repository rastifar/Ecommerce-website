import React from "react";
//-------------Material
import {
  Button, 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
//-------------Api
import {deleteProductById} from "../../../api/goodsApi"

export default function DeleteConfirmModal({ open, onClose, data, getData }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!open) return "";

  const handelDelete = () => {
    deleteProductById(data)  
    getData();
    onClose();
  };

  return (
    <Box>     
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ bgcolor: "#F24C4C", p: 3 }}
        >
          حذف
        </DialogTitle>
        <DialogContent sx={{ p: 5, mt: 3 }}>
          <Typography>ایا از خذف کالای انتخاب شده اطمینان دارید</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ m: 2, bgcolor: "#125B50", color: "#FAF5E4" }}
          >
            انصراف
          </Button>
          <Button
            onClick={handelDelete}
            variant="outlined"
            sx={{ m: 2, color: "#F24C4C" }}
          >
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
