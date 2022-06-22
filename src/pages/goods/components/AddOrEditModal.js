import React from "react";
//----------Material
import { 
  Dialog, 
  DialogContent,
    DialogTitle,
    Box,
  useMediaQuery,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
//------------Material-Icon
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
//------------Components
import FormAddOrEdit from "./FormAddOrEdit";

export default function Modal({ open, onClose , data,getData }) {
 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    onClose();
   }

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
        <Box display='flex' justifyContent='space-between'>
            <Typography>افزودن/ویرایش کالا</Typography>
            <CancelPresentationTwoToneIcon sx={{ color: "red" }} onClick={onClose} />
          </Box>
        
        </DialogTitle>
        <DialogContent>
          <FormAddOrEdit data={data} onClose={onClose} getData={getData}/>
        </DialogContent>
      
      </Dialog>
    </Box>
  );
}
