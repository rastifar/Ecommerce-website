import MyLink from "../../../components/MyLink";
export const columns = [
    {
      field: "name",
      headerName: "کالا",
      width: 300,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <MyLink to={`/products/${params.row.id}`} color="primary">
          {params.value}
        </MyLink>
      ),
    },
    {
      field: "price",
      headerName: "قیمت",
      width: 100,
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    {
      field: "quantity",
      headerName: "تعداد",
      width: 100,
      sortable: true,
      editable: false,
      disableColumnMenu: true,
    },
  ];