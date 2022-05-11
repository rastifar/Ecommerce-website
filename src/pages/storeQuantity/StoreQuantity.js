import React,{useEffect} from "react";
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

const category = { 1: "میوه و سبزی تازه", 2: "میوه و سبزی منجمد", 3: "اسموتی" };

const headCells = [
  { id: "productName", label: "نام کالا" },
  { id: "image", label: "قیمت" },
  { id: "category", label: "موجودی " },
];

const StoreQuantity = () => {
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
      url: "/products",
    });
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table stickyHeader >        
          <TableHead>
            <TableRow>
              {headCells.map((head)=>(<TableCell align="center">{head.label}</TableCell>))}            
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
                {row.name}
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.count}</TableCell>
                
              </>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        <button onClick={() => paginate(-1)}><ArrowForwardIosTwoToneIcon /></button>
        <button onClick={()=>paginate(1)}><ArrowBackIosTwoToneIcon/></button>
      </TableContainer>
   
    </Paper>
  );
};

export default StoreQuantity;
