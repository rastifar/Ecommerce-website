import React, { useState } from "react";

const usePagination = (records=[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const indexOfLastPost = currentPage + postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  // const pageNumber = []
  // for (let i = 1; Math.ceil(records / postPerPage); i++){
  //   pageNumber.push(i)
  // }

  const paginate = (arrowNumber) => {
    if (arrowNumber > 0) {
      setCurrentPage(currentPage + postPerPage);
    } else if (currentPage > postPerPage) {
      setCurrentPage(currentPage - postPerPage);
    }
  };
  return { indexOfFirstPost, indexOfLastPost, paginate };
};

export default usePagination;

// console.log("currentPage", currentPage);
// console.log("postPerPage", postPerPage);
// console.log("indexOfFirstPost", indexOfFirstPost);
// console.log("indexOfLastPost", indexOfLastPost);
