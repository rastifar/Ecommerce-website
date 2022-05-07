import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import React from "react";

const CompanyMsgCard = ({image,title,description}) => {
  return (
      <div style={{textAlign:"center"}}>
          <img src={image} />
          <p style={{color:"#414141",fontSize:"1.2rem"}}>{title}</p>
          <p style={{color:"#C1C1C1",fontSize:"1rem"}}>{description}</p>
          
   </div>

  );
};

export default CompanyMsgCard;