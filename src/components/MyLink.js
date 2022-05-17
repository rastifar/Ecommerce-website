import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

//stylecomponent
const LINK = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const MyLink = ({ children, ...props }) => {
  return <LINK {...props}>{children}</LINK>;
};

export default MyLink;
