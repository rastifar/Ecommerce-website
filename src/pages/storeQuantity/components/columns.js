export const columns = [
    {
      field: "productName",
      headerName: "کالا",
      sortable: false,
      editable: false,
      disableColumnMenu: true,
      minWidth: 300,
      flex: 1,
    },
    {
      field: "price",
      headerName: "قیمت (تومان) ",
      type: 'number',
      headerAlign: "left",
      align: "left",
      sortable: true,
      editable: true,
      disableColumnMenu: true,
      minWidth: 300,
      flex: 1,
      // renderCell: (params) => {
      //   return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // },
      preProcessEditCellProps: (params) => {
        const num = Number(params.props.value);
        const hasError = !(Number.isInteger(num) && num >= 0);
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "count",
      headerName: "موجودی",
      type: 'number',
      headerAlign: "left",
      align: "left",
      sortable: true,
      editable: true,
      disableColumnMenu: true,
      minWidth: 300,
      flex: 1,
      // renderCell: (params) => {
      //   return params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // },
      preProcessEditCellProps: (params) => {
        const num = Number(params.props.value);
        const hasError = !(Number.isInteger(num) && num >= 0);
        return { ...params.props, error: hasError };
      },
    },
  ];