import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";


const RequiredAuth = ({children}) => {
   // const token = useSelector((state) => state.token);
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  useEffect(() => {   
    if (!token) {     
      navigate("/login", { replace: false });
    }
  }, []);
  return <div>{children}</div>
};

export default RequiredAuth;
