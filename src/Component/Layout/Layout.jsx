import React from 'react';
import style from './Layout.module.css'
import NavBar from '../NavBar/NavBar.jsx';
 import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';



function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        <div>
            <Offline>
                <div className='network'>
                <i className='fas fa-wifi'>You are offline</i>
                </div>
            </Offline>
        </div>


        </>
    );
}

export default Layout;