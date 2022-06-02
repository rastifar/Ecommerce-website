import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import MyFooter from './components/MyFooter';

const UserLayout = (  {children}) => {
    return (
        <div >
            <Header />
            {children}
            <MyFooter/>
        </div>
    );
};

export default UserLayout;