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
      .get(BASE_URL + WHOAMI)
      //   .then((res) =>{if (res.status === 200 || res.status === 201 && res.data.token !== token) {
      //       navigate("/login", { replace: false });
      // }})
      .then(res=>console.log(res))
      .catch((error) => navigate("/login", { replace: false }));
  }, []);
  return <div></div>;
};

export default RequiredAuth;
