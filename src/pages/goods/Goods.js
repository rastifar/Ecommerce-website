import React, { useEffect, useState } from "react";
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
import axios from "axios";

//stylecomponent
const IMG = styled("img")`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const SERVICE_URL = "http://localhost:3002";

export default function Goods() {
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
              handleDelete(cellValues.row.id);
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
            onClick={(event) => {
              // handleClick(event, cellValues);
              handleEdit(event, cellValues);
              // console.log(cellValues.row);
            }}
          />
        );
      },
    },
  ];
  // const { products, error, loading, axiosFetch } = useFetch();
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3002/products")
      .then((res) => setProducts(res.data));
  });
  // useEffect(() => {

  //   getData();
  // }, []);

  // const getData = () => {
  //   axiosFetch({
  //     url: "/products",
  //   });
  // };

  const handleEdit = (event, cellValues) => {
    // console.log("edit from handle", cellValues.row);
    setIsOpen(true);
    // const result = products.find(item => item.id = cellValues.row.id)
    // console.log(result);
    setData(cellValues.row);
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:3002/products/${id}`);
      const products = await axios.get("http://localhost:3002/products");
    } catch (error) {
      console.log(error);
    }
  }

  const rows = products.map((product) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    category: product.category,
  }));

  const handleAddProducts = () => {
    setIsOpen(true);
  };

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
      <Modal open={isOpen} onClose={() => setIsOpen(false)} data={data} />
    </Grid>
  );
}
