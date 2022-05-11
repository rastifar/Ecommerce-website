import React, { useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const indexOfLastPost = currentPage + postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const paginate = (pageNumber) => {
    if (pageNumber > 0) {
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
