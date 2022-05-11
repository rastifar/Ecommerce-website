import { TableBody } from "@mui/material";
import React from "react";
import useTable from "../../../hooks/useTable";

const GoodsTable = () => {
  const { tblContainer } = useTable(records, headCells);
  return (
    <>
      <tblContainer>
        <TableBody></TableBody>
      </tblContainer>
    </>
  );
};

export default GoodsTable;
