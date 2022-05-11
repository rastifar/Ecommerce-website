import { Table } from "@mui/material";
import React from "react";

const useTable = (records, handleCells) => {
  const tblContainer = (props) => {
   ( <Table>{props.children}</Table>)
  };
  return tblContainer;
};

export default useTable;
