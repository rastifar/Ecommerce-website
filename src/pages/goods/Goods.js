import React, { useEffect ,useState} from "react";
import useFetch from "../../hooks/useFetch";
//constant
import { BASE_URL } from "../../constants/apiConst";
import { PRODUCTS } from "../../constants/apiConst";
//axiosApi
import api from "../../api/api";

//material
import { styled } from "@mui/material/styles";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

//----------------------------------------------

//stylecomponent
const IMG = styled("img")`
  width: 3rem;
  height: 3rem;
  border-radius: 18px;
  object-fit: cover;
`;




export default function Goods() {
  // const { products, error, loading } = useFetch(PRODUCTS);
  const[products,setProducts] = useState([])
  const [pageSize, setPageSize] = useState(5);
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {getData()}, [])
  const getData = async() => {
    setProducts(await api.get(PRODUCTS))
  }
  //columns
  const columns = [
    {
      field: "image",
      headerName: "تصویر",
      flex: 1,
      sortable: false,
      editable: false,
      renderCell: (params) => <IMG src={BASE_URL + params.value} />,
    },
    {
      field: "name",
      headerName: "نام کالا",
      sortable: false,
      editable: false,
      flex: 3,
    },
    { field: "category", headerName: "دسته بندی", flex: 3 },
    {
      field: "deleteOperation",
      headerName: " حذف محصول",
      editable: false,
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <DeleteOutlineOutlinedIcon
          onClick={() => handleDeleter(params)}
          sx={{ color: "red" }}
        />
      ),
    },
    {
      field: "editOperation",
      headerName: "ویرایش محصول",
      sortable: false,
      flex: 1,
      renderCell: () => (
        <EditOutlinedIcon onClick={handleEdit} sx={{ color: "green" }} />
      ),
    },
  ];

  const handleDeleter = async (params) => {
    // await axios.delete(BASE_URL+Products)
    console.log(params.row);
  };
  const handleEdit = () => {
    console.log("Edit");
  };

//console.log(products);

  const rows = products.map((product) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    category: product.category,
  }));
 

return (
  <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ p: 5 }}
  >
    <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
      <Grid item xs={2} align="right">
        <Typography>مدیریت کالاها</Typography>
      </Grid>
      <Grid item xs={8} align="center">
        جستجو
      </Grid>
      <Grid item xs={2} align="left">
        <Button variant="outlined" color="primary">
          افزودن کالا
        </Button>{" "}
      </Grid>
    </Grid>
    <Grid item sx={{ height: 400, width: "100%" }}>
      
      <DataGrid
        item
        sx={{ background: "white" }}
        rows={rows}
        columns={columns}          
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Grid>
  </Grid>
);
}
