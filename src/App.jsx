import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import React, { useContext } from 'react';
import Layout from './Component/Layout/Layout.jsx';
import Home from './Component/Home/Home.jsx';
import Brands from './Component/Brands/Brands.jsx';
import Categories from './Component/Categories/Categories.jsx';
import Login from './Component/Login/Login.jsx';
import NotFound from './Component/NotFound/NotFound.jsx';
import Register from './Component/Register/Register.jsx';
import Products from './Component/Products/Products.jsx';
import Cart from './Component/Cart/Cart.jsx';

import  { UserContext } from './Context/UserContext.js';
import { useEffect } from 'react';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx';
import Wishlist from './Component/Wishlist/Wishlist.jsx';
import Checkout from './Component/Checkout/Checkout.jsx';
import AllOrders from './Component/AllOrders/AllOrders.jsx';
import ForgetPass from './Component/ForgetPass/ForgetPass.jsx';
import VerifyCode from './Component/VerifyCode/VerifyCode.jsx';
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx';






let routes= createHashRouter([
  {path:'/' , element: <Layout  /> , children:[
    {index:true , element: <ProtectedRoute> <Home /> </ProtectedRoute> },
    {path:'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
    {path:'brands' , element :<ProtectedRoute> <Brands /></ProtectedRoute> },
    {path:'categories' , element:<ProtectedRoute> <Categories /></ProtectedRoute> },
    {path:'wishlist' , element:<ProtectedRoute> <Wishlist /></ProtectedRoute> },
    {path:'checkout' , element:<ProtectedRoute> <Checkout /></ProtectedRoute> },
    {path :'login' , element :<Login />  },
    {path:'register' , element : <Register /> },
    // {path:'freshcart' , element : <Register /> },
    {path:'forget-password' , element : <ForgetPass /> },
    {path:'verify-code' , element : <VerifyCode /> },
    {path:'reset-password' , element : <ResetPassword /> },
    {path : 'products' , element :<ProtectedRoute><Products/></ProtectedRoute> },
    {path : 'allorders' , element :<ProtectedRoute>< AllOrders  /></ProtectedRoute> },
    {path:'cart', element :<ProtectedRoute><Cart/></ProtectedRoute> } ,
    {path:'productdetails/:id',element : <ProtectedRoute> <ProductDetails /> </ProtectedRoute>},
    {path : '*' , element:<NotFound />}
  ]}
])

function App() {
  let {setUserToken} = useContext(UserContext)

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){

      setUserToken(localStorage.getItem('userToken'))
    }
  },[])


  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;