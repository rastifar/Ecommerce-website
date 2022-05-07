import { Grid } from '@mui/material';
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


const AdminLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      <Grid container>
     
        <Grid item xs={3}>
          <Sidebar/>
        </Grid>
        <Grid item xs={8} sx={{mt:"2rem"}}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLayout;