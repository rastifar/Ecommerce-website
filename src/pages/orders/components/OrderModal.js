import React from "react";
import ReactDom from "react-dom";
import {
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function OrderModal({ open, onClose, data }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    if (!open) return null;
    //const [products,setProducts]= useState([])

  return ReactDom.createPortal(
    <>
      <Grid container>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid container>
          {/* <TableContainer>
            <Table>
              <TableHead>
                <TableCell>کالا</TableCell>
                <TableCell>قیمت</TableCell>
                <TableCell>تعداد</TableCell>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer> */}
        </Grid>
      </Grid>
    </>,
    document.getElementById("portal")
  );
}
