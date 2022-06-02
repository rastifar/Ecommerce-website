import React from 'react';
import Header from './components/Header';
import PropTypes from 'prop-types';



const AdminLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

AdminLayout.prototype = {
  children : PropTypes.element
}

export default AdminLayout;
