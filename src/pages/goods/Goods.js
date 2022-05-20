import React, { useEffect ,useState} from "react";
import useFetch from "../../hooks/useFetch";
//constant
import { BASE_URL } from "../../constants/apiConst";
import { PRODUCTS } from "../../constants/apiConst";

//material
import { styled } from "@mui/material/styles";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HttpRequestApi from "../../api/HttpRequestApi";
//----------------------------------------------

//stylecomponent
const IMG = styled("img")`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;
//columns
const columns = [
  {
    field: "image",
    headerName: "تصویر",
    width: 200,
    sortable: false,
    renderCell: (params) => <IMG src={BASE_URL + params.value} />,
  },
  {
    field: "name",
    headerName: "نام کالا",
    sortable: false,
    editable: true,
    width: 400,
  },
  { field: "category", headerName: "دسته بندی", width: 400 },
  {
    field: "deleteOperation",
    headerName: "  ",
    sortable: false,
    width: 50,
    renderCell: () => <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />,
  },
  {
    field: "editOperation",
    headerName: "  ",
    sortable: false,
    width: 50,
    renderCell: () => <EditOutlinedIcon sx={{ color: "green" }} />,
  },
];




export default function Goods() {
  
  // const { products, error, loading} = useFetch(PRODUCTS);
  const [products, setProducts] = useState([])
  useEffect(() => {
    HttpRequestApi.get(PRODUCTS).then(res=>setProducts(res))
  },[])
  return (
    <div>{products.map(product => <p>{product.name}</p>)}</div>
)
  

  // const rows = products?.map((product) => ({
  //   id: product.id,
  //   image: product.image,
  //   name: product.name,
  //   category: product.category,
  // }));

  // return (
  //   <Grid
  //     container
  //     direction="column"
  //     alignItems="center"
  //     justifyContent="center"
  //     sx={{ p: 5 }}
  //   >
  //     <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
  //       <Grid item xs={2} align="right">
  //         <Typography>مدیریت کالاها</Typography>
  //       </Grid>
  //       <Grid item xs={8} align="center">
  //         جستجو
  //       </Grid>
  //       <Grid item xs={2} align="left">
  //         <Button variant="outlined" color="primary">
  //           افزودن کالا
  //         </Button>{" "}
  //       </Grid>
  //     </Grid>
  //     <Grid item sx={{ height: 400, width: "100%" }}>
  //       {/* <div > */}
  //       <DataGrid
  //         item
  //         sx={{ background: "white" }}
  //         rows={rows}
  //         columns={columns}
  //         pageSize={5}
  //         rowsPerPageOptions={[5, 10, 15]}
  //         localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
  //       />
  //     </Grid>
  //   </Grid>
  // );
}
