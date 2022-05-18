import React, { useEffect,useState } from "react";
//components
import useFetch from "../../hooks/useFetch";
import Modal from "../../components/Modal";

//material
import { styled } from "@mui/material/styles";
import { DataGrid, faIR } from "@mui/x-data-grid";
import { Grid, Button, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
    renderCell: (params) => <IMG src={SERVICE_URL + params.value} />,
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
    renderCell: (cellValues) => {
      return (
        <DeleteOutlineOutlinedIcon
          sx={{ color: "red" }}
          onClick={() => {
            // handleClick(event, cellValues);
            console.log(cellValues.row.id);
          }}
        />
      );
    },
  },
  {
    field: "editOperation",
    headerName: "  ",
    sortable: false,
    width: 50,

    renderCell: (cellValues) => {
      return (
        <EditOutlinedIcon
          sx={{ color: "green" }}
          onClick={() => {
            // handleClick(event, cellValues);
            console.log(cellValues.row);
          }}
        />
      );
    },
  },
];

const SERVICE_URL = "http://localhost:3002";

export default function Goods() {
  const { products, error, loading, axiosFetch } = useFetch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosFetch({
      url: "/products",
    });
  };

  const rows = products.map((product) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    category: product.category,
  }));

  const handleAddProducts = () => {};

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
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddProducts}
          >
            افزودن کالا
          </Button>{" "}
        </Grid>
      </Grid>
      <Grid item sx={{ height: 400, width: "100%" }}>
        {/* <div > */}
        <DataGrid
          item
          sx={{ background: "white" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
      <Modal  open={isOpen} onClose={() => setIsOpen(false)} />
    </Grid>
  );
}
