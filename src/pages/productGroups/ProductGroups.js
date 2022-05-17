import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Container} from "@mui/material";
import axios from 'axios';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
const ProductGroups = () => {
    const { id } = useParams();
    const[data,setData] = useState([])
    // const { products, error, loading, axiosFetch } = useFetch();
    axios.get(`http://localhost:3002/products?category=${id}`).then(res => setData(res.data))
    
    return (
        <Container sx={{mt:"7rem"}}>
            <h1>This is product Group page</h1>
            <h2>{id}</h2>
        </Container >
    );
};

export default ProductGroups;