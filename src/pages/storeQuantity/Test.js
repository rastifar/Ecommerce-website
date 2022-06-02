import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduts } from '../../redux/productsSlice';

const Test = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products)
    console.log(products);
    useEffect(() => {
        dispatch(getProduts())
     },[dispatch])
    return (
        <div>
            
        </div>
    );
};

export default Test;