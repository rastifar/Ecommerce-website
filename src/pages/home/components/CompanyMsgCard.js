import React from "react";
import { Link } from "react-router-dom";

const CompanyMsgCard = ({ image, title, description = "", link = "" }) => {
  return (
    <Link to={link ? link : "#"}>
      <div style={{ textAlign: "center" }}>
        <img src={image} />
        <p style={{ color: "#414141", fontSize: "1.2rem" }}>{title}</p>
        <p style={{ color: "#C1C1C1", fontSize: "1rem" }}>{description}</p>
      </div>
    </Link>
  );
};

export default CompanyMsgCard;
