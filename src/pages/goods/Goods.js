import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
//constant
import { BASE_URL } from "../../constants/apiConst";
import { PRODUCTS } from "../../constants/apiConst";
import api from "../../api/api";
import { category,subCategory } from "../../constants/categoryConst";
//modal
import AddOrEditModal from "./components/AddOrEditModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
//components
import CustomPagination from '../../components/CustomPagination';


//material
import { styled } from "@mui/material/styles";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography,Box } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
//----------------------------------------------

//stylecomponent
const IMG = styled("img")`
  width: 3rem;
  height: 3rem;   
  border-radius: 18px;
  object-fit: cover;
`;

export default function Goods() {
  //const { products, error, loading } = useFetch(PRODUCTS);
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [data, setData] = useState("");
  

  useEffect(() => {
    console.log('in useEffect');
    getData();
  }, [open,isDeleteOpen,data]);

  const getData = async () => {
    const response = await api.get(PRODUCTS+`?_sort=id&_order=desc`)
    setProducts(response.data);
  };
  //console.log(isDeleteOpen);
  //columns
  const columns = [
    {
      field: "image",
      headerName: "تصویر",
      flex: 1,
      sortable: false,
      editable: false,
      disableColumnMenu	:true,
      headerAlign: "left",
      renderCell: (params) => <IMG src={BASE_URL + "/files/" + params.value} />,
    },
    {
      field: "name",
      headerName: "نام کالا",
      sortable: false,
      editable: false,
      disableColumnMenu	:true,
      flex: 2,
      headerAlign: "left",
    },
    {
      field: "category",
      headerName: "دسته بندی",
      sortable: true,
      editable: false,
      disableColumnMenu	:true,
      flex: 2,
    },
    {
      field: "deleteOperation",
      headerName: " حذف محصول",
      editable: false,
      sortable: false,
      disableColumnMenu	:true,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <DeleteOutlineOutlinedIcon
          onClick={() => handleDelete(params)}
          sx={{ color: "red" }}
        />
      ),
    },
    {
      field: "editOperation",
      headerName: "ویرایش محصول",
      editable: false,
      sortable: false,
      disableColumnMenu	:true,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <EditOutlinedIcon
          onClick={() => handleEdit(params)}
          sx={{ color: "green" }}
        />
      ),
    },
  ];

  const handleDelete = async (params) => {
    // await axios.delete(BASE_URL+Products)
    const id = params.row.id; 
    setData(id);
    setIsDeleteOpen(true);
    // console.log(params.row);
  };
  const handleEdit = (params) => {
    const id = params.row.id;    
    setData(products.find((item) => item.id === id));
    setOpen(true);
  };

  const rows = products?.map((product) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    category: `${category[product.category - 1]} / ${subCategory[product.subcategory-1]}`
  }));

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <Box
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: .4 }}
    >
      <Grid container item sx={{ p: 2, background: "white", width: "100%" }}>
        <Grid item xs={12} sm={2} align={{ xs: "center", sm:'right' }} mb={1} >
          <Typography textAlign={'center' }>مدیریت کالاها</Typography>
        </Grid>
        <Grid item xs={12} sm={7} align="center"  mb={1} >
          جستجو
        </Grid>
        <Grid item xs={12} sm={2} align="center"  mb={1}>
          <Button variant="outlined" color="primary" onClick={handleOpenModal}>
            افزودن کالا
          </Button>{" "}
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ height: 400, width: "100%" }}>
        {/* <div > */}
        <DataGrid
          item
          sx={{ background: "white" }}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          pagination
          components={{
            Pagination: CustomPagination,
            LoadingOverlay: LinearProgress
          }}
          // {...data}

          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
      <AddOrEditModal
        open={open}
        onClose={() => {
          setOpen(false);
          setData("");
        }}
        data={data}
        getData={getData}
        // onReRenderAfterModal={() => setReRenderAfterModal(!reRenderAfterModal)}
      />
      <DeleteConfirmModal
        open={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setData("")
        }}
        data={data}
        getData={getData}
        // onReRenderAfterModal={() => setReRenderAfterModal(!reRenderAfterModal)}
      />
    </Box>
  );
}
