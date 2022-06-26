import React from 'react';
import PropTypes from 'prop-types';
//----------Component
import Header from './components/Header';

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
