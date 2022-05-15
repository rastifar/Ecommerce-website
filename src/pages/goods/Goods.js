import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/httpRequestApi";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const category = { 1: "میوه و سبزی تازه", 2: "میوه و سبزی منجمد", 3: "اسموتی" };

const headCells = [
  { id: "image", label: "تصویر", disableSorting: true },
  { id: "productName", label: "نام کالا", disableSorting: true },
  { id: "category", label: "دسته بندی" },
  { id: "crudBtn", label: "", disableSorting: true },
];
const SERVICE_URL = "http://localhost:3002";

const Goods = () => {
  const { products, error, loading, axiosFetch } = useAxios();

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
    <Grid container direction="column" >
      <Grid container sx={{p:5}}>
        <Grid item>مدیریت کالاها</Grid>
        <Grid item>جستجو</Grid>
        <Grid item>افزودن کالا</Grid>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headCells.map((head) => (
                  <TableCell align="center">{head.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
          <button> ➡️ قبلی</button>
          <button>بعدی ⬅️ </button>
        </TableContainer>
      </Grid>
    </Grid>
 );
};

export default Goods;

// const [open,setOpen] = useState(false)
// const [goods, error, loading, axiosFetch] = useAxios();
// const janatan={
//   axiosInstance: axios,
//   method: "POST",
//   url: "/products",
//   requestConfig: {
//     name: "کیف پول چرم جانتا مدل 124",
//     category: "15",
//     brand: "جانتا",
//     price: "120000",
//     count: "12",
//     description:
//       "اکارتی ها ابزار و پوشش برای محافظت و نگهداری از همه ی کارت های مهم یک فرد، به خصوص کارت های بانکی هستند. جاکارتی جدید مجموعه ی چرم جانتا از طراحی ساده و در عین حال کاربردی برخوردار است. از لحاظ جنس، این جاکارتی از متریال چرم طبیعی مرغوب و منعطف ساخته شده است. این محصول در رنگ بندی متنوع و زیبا ساخته شده که تمام سلیقه ها را پوشش می دهد. برشی به اندازه انگشت شصت روی سطح رویی محصول طراحی شده است.",
//     images: "c4e5c64298b479e9881aa323206920a3",
//     thumbnail: "c4e5c64298b479e9881aa323206920a3",
//   },
// }

// const handleNewAdd = () => {
//   axiosFetch(janatan);
// };

// return (
//   <div>
//     <h1>Goods</h1>
//     <button onClick={handleNewAdd}>add</button>
//     {/* <button onClick={()=>setOpen(true)}>modal</button> */}
//     <Modal title="افزودن کالا"/>
//   </div>
// );
