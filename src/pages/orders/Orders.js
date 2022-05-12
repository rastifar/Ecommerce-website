import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/httpRequestApi";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";
import ArrowBackIosTwoToneIcon from "@mui/icons-material/ArrowBackIosTwoTone";

import usePagination from "../../hooks/usePagination";

import { convertTimeStamToDate } from "../../utils/utils";

const headCells = [
  { id: "username", label: "نام کاربر" },
  { id: "purchaseTotal", label: "مجموع مبلغ" },
  { id: "orderDate", label: "زمان ثبت سفارش " },
  { id: "orderCrud", label: "" },
];

const Orders = () => {
  const { products, error, loading, axiosFetch } = useAxios();
  const { indexOfFirstPost, indexOfLastPost, paginate } = usePagination();

  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,    
      method: "GET",
      url: "/orders",
      requestConfig: {headers:{
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IkFtaXIgaG9zc2VpbiBNYWhkaW91biIsImlhdCI6MTY1MjM0MTg3MiwiZXhwIjoxNjUyMzUyNjcyfQ.vQHdWx6-hRfqOQbFxpPa9fzTP-USYv75fqWTmCJFjhA"
    }},
    });
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headCells.map((head) => (
                <TableCell align="center">{head.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <>
                  <TableCell component="th" scope="row">
                    {row.customerDetail.firstName +" " +row.customerDetail.lastName  } 
                  </TableCell>
                  <TableCell align="center">{row.purchaseTotal}</TableCell>
                  <TableCell align="center">
                    {convertTimeStamToDate(row.orderDate)}
                  </TableCell>
                  <TableCell align="center">بررسی سفارش</TableCell>
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <button onClick={() => paginate(-1)}>
          <ArrowForwardIosTwoToneIcon />
        </button>
        <button onClick={() => paginate(1)}>
          <ArrowBackIosTwoToneIcon />
        </button>
      </TableContainer>
    </Paper>
  );
};

export default Orders;
