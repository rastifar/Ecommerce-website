import * as React from 'react';
//-------------Materail
import {Breadcrumbs} from '@mui/material';
//-------------Component
import MyLink from '../../../components/MyLink';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ProductBreadCrump({category,catLink,subcategory,subLink}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <MyLink underline="hover" color="inherit" to="/">
          دسته بندی
        </MyLink>
        <MyLink
          underline="hover"
          color="primary"
          to={`/productgroup/${catLink}`}
        >
         {category} 
        </MyLink> 
        <MyLink
          underline="hover"
          color="primary"
          to={`/productgroup/${catLink}/subcategory/${subLink}`}
        >
         {subcategory} 
        </MyLink> 
      </Breadcrumbs>
    </div>
  );
}
