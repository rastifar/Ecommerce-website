import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import api from "../../api/api";
import { BASE_URL, WHOAMI } from "../../constants/apiConst";

const RequiredAuth = () => {
    const token = useSelector((state) => state.token);
    const navigate = useNavigate()
  useEffect(() => {
    api
      .post(BASE_URL + WHOAMI, token)
        .then((res) =>{if (res.status === 200 || res.status === 201) {
            navigate("/dashboard", { replace: false });
      }})
      .catch((error) => navigate("/login", { replace: false }));
  }, []);
  return <div></div>;
};

export default RequiredAuth;
