import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

//----------component
import MyLink from '../../../components/MyLink';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ProductBreadCrump({category,link}) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <MyLink underline="hover" color="inherit" to="/">
          دسته بندی
        </MyLink>
        <MyLink
          underline="hover"
          color="primary"
          to={`/productgroup/${link}`}
        >
         {category} 
        </MyLink>      
      </Breadcrumbs>
    </div>
  );
}
