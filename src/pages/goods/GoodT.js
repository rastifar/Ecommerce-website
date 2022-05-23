// //constant
import { goodsHeadCells } from "../../constants/tableHeaderConst";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,TablePagination,IconButton,TableFooter,Box
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import TablePaginationActions from "../../components/TablePaginationAction"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


export default function Goods(props) {
  const { products, error, loading, axiosFetch } = useFetch();
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosFetch({
      url: "/products",
    });
  };
  // let rows = props.row;
  // let rowCat = props.rowCat;
  // let setRow = props.setRow;
  // let setRowCat = props.setRowCat;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  async function Handledelete(id) {
    // try {
    //   await axios.delete(`http://localhost:3002/products/${id}`);
    //   const products = await axios.get("http://localhost:3002/products");
    //   const category = await axios.get("http://localhost:3002/category");
    //   setRow(products.data);
    //   setRowCat(category.data);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <TableContainer 
      component={Paper}
      sx={{ direction: "rtl", mr: 20, width: "60vw", height: "60vh" }}
    >
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {goodsHeadCells.map((header) => (
              <TableCell> {header.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ direction: "rtl" }}>
      
          {(rowsPerPage > 0
            ? products.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : products
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell
                style={{ width: 40 }}
                component="th"
                scope="row"
                align="right"
              >
                {row.name}
              </TableCell>
              <TableCell style={{ width: 40 }} align="right">
                {row.category}
              </TableCell>
              <TableCell style={{ width: 40 }} align="right">
                <Button sx={{ ml: 1 }}>
                  {" "}
                  <EditOutlinedIcon id={row.id} />{" "}
                </Button>
                <Button sx={{ mr: 1 }} onClick={() => Handledelete(row.id)}>
                  <DeleteOutlineOutlinedIcon />{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 45 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={products.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
