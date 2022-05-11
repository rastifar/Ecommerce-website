// import React, { useState } from 'react'
// import { Table, TableHead, TableRow, TableCell, makeStyles, TablePagination, TableSortLabel } from "@mui/material";



// export default function useTable(records, headCells,filterFn) {

//     const classes = useStyles();

//     const pages = [5, 10, 25]
//     const [page, setPage] = useState(0)
//     const [rowsPerPage, setRowsPerPage] = useState(pages[page])
//     const [order, setOrder] = useState()
//     const [orderBy, setOrderBy] = useState()

//     const TblContainer = props => (
//         <Table className={classes.table}>
//             {props.children}
//         </Table>
//     )

//     const TblHead = props => {

//         const handleSortRequest = cellId => {
//             const isAsc = orderBy === cellId && order === "asc";
//             setOrder(isAsc ? 'desc' : 'asc');
//             setOrderBy(cellId)
//         }

//         return (<TableHead>
//             <TableRow>
//                 {
//                     headCells.map(headCell => (
//                         <TableCell key={headCell.id}
//                             sortDirection={orderBy === headCell.id ? order : false}>
//                             {headCell.disableSorting ? headCell.label :
//                                 <TableSortLabel
//                                     active={orderBy === headCell.id}
//                                     direction={orderBy === headCell.id ? order : 'asc'}
//                                     onClick={() => { handleSortRequest(headCell.id) }}>
//                                     {headCell.label}
//                                 </TableSortLabel>
//                             }
//                         </TableCell>))
//                 }
//             </TableRow>
//         </TableHead>)
//     }

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     }

//     const handleChangeRowsPerPage = event => {
//         setRowsPerPage(parseInt(event.target.value, 10))
//         setPage(0);
//     }

//     const TblPagination = () => (<TablePagination
//         component="div"
//         page={page}
//         rowsPerPageOptions={pages}
//         rowsPerPage={rowsPerPage}
//         count={records.length}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//     />)

//     function stableSort(array, comparator) {
//         const stabilizedThis = array.map((el, index) => [el, index]);
//         stabilizedThis.sort((a, b) => {
//             const order = comparator(a[0], b[0]);
//             if (order !== 0) return order;
//             return a[1] - b[1];
//         });
//         return stabilizedThis.map((el) => el[0]);
//     }

//     function getComparator(order, orderBy) {
//         return order === 'desc'
//             ? (a, b) => descendingComparator(a, b, orderBy)
//             : (a, b) => -descendingComparator(a, b, orderBy);
//     }

//     function descendingComparator(a, b, orderBy) {
//         if (b[orderBy] < a[orderBy]) {
//             return -1;
//         }
//         if (b[orderBy] > a[orderBy]) {
//             return 1;
//         }
//         return 0;
//     }

//     const recordsAfterPagingAndSorting = () => {
//         return stableSort(filterFn.fn(records), getComparator(order, orderBy))
//             .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
//     }

//     return {
//         TblContainer,
//         TblHead,
//         TblPagination,
//         recordsAfterPagingAndSorting
//     }
// }


// import React, { useEffect, useState, useMemo } from "react";
// import Header from "components/Header";
// import { TableHeader, Pagination, Search } from "components/DataTable";
// import useFullPageLoader from "hooks/useFullPageLoader";
// import ExternalInfo from "components/ExternalInfo";
// import AppConfig from "App.config";

// const DataTable = () => {
//     const [comments, setComments] = useState([]);
//     const [loader, showLoader, hideLoader] = useFullPageLoader();
//     const [totalItems, setTotalItems] = useState(0);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [search, setSearch] = useState("");
//     const [sorting, setSorting] = useState({ field: "", order: "" });

//     const ITEMS_PER_PAGE = 50;

//     const headers = [
//         { name: "No#", field: "id", sortable: false },
//         { name: "Name", field: "name", sortable: true },
//         { name: "Email", field: "email", sortable: true },
//         { name: "Comment", field: "body", sortable: false }
//     ];

//     useEffect(() => {
//         const getData = () => {
//             showLoader();

//             fetch("https://jsonplaceholder.typicode.com/comments")
//                 .then(response => response.json())
//                 .then(json => {
//                     hideLoader();
//                     setComments(json);
//                     console.log(json);
//                 });
//         };

//         getData();
//     }, []);

//     const commentsData = useMemo(() => {
//         let computedComments = comments;

//         if (search) {
//             computedComments = computedComments.filter(
//                 comment =>
//                     comment.name.toLowerCase().includes(search.toLowerCase()) ||
//                     comment.email.toLowerCase().includes(search.toLowerCase())
//             );
//         }

//         setTotalItems(computedComments.length);

//         //Sorting comments
//         if (sorting.field) {
//             const reversed = sorting.order === "asc" ? 1 : -1;
//             computedComments = computedComments.sort(
//                 (a, b) =>
//                     reversed * a[sorting.field].localeCompare(b[sorting.field])
//             );
//         }

//         //Current Page slice
//         return computedComments.slice(
//             (currentPage - 1) * ITEMS_PER_PAGE,
//             (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
//         );
//     }, [comments, currentPage, search, sorting]);

//     return (
//         <>
//             <Header title="Building a data table in react" />

//             <ExternalInfo page="datatable" />

//             <div className="row w-100">
//                 <div className="col mb-3 col-12 text-center">
//                     <div className="row">
//                         <div className="col-md-6">
//                             <Pagination
//                                 total={totalItems}
//                                 itemsPerPage={ITEMS_PER_PAGE}
//                                 currentPage={currentPage}
//                                 onPageChange={page => setCurrentPage(page)}
//                             />
//                         </div>
//                         <div className="col-md-6 d-flex flex-row-reverse">
//                             <Search
//                                 onSearch={value => {
//                                     setSearch(value);
//                                     setCurrentPage(1);
//                                 }}
//                             />
//                         </div>
//                     </div>

//                     <table className="table table-striped">
//                         <TableHeader
//                             headers={headers}
//                             onSorting={(field, order) =>
//                                 setSorting({ field, order })
//                             }
//                         />
//                         <tbody>
//                             {commentsData.map(comment => (
//                                 <tr>
//                                     <th scope="row" key={comment.id}>
//                                         {comment.id}
//                                     </th>
//                                     <td>{comment.name}</td>
//                                     <td>{comment.email}</td>
//                                     <td>{comment.body}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {loader}
//         </>
//     );
// };

// export default DataTable;