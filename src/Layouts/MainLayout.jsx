import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className='w-6/7 mx-auto flex flex-col min-h-screen'>
            <Header></Header>
            <div className='flex-grow'>
                <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
          
        </div>
    );
};

export default MainLayout;