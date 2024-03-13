import React, { useContext } from 'react';
import style from './Home.module.css'
import { UserContext } from '../../Context/UserContext.js';
import MainSlider from '../MainSlider/MainSlider.jsx';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx'
import { Helmet } from 'react-helmet';
import Products from '../Products/Products.jsx';

function Home() {



    return (
        <>
         <Helmet>
                <title>FreshCart Home</title>
            </Helmet>
        <MainSlider />
        <CategoriesSlider />
        <Products />
        </>
    );
}

export default Home;