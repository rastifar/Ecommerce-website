import React from 'react';
import Header from './components/Header';



const AdminLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;