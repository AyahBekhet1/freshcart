import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/js/bootstrap.bundle.js'

import {QueryClient ,  QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import './index.css';
import UserContextProvider from './Context/UserContext';
import CartContextProvider from './Context/CartContext';

import {Toaster} from 'react-hot-toast'
import WishlistProvider from './Context/WishlistContext';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

let queryClient = new QueryClient()
root.render(
    <Provider store={store}>

    <QueryClientProvider client={queryClient}>

    <UserContextProvider>
        <WishlistProvider>

    <CartContextProvider>

        <App />
        <Toaster />
    </CartContextProvider>

        </WishlistProvider>
    </UserContextProvider>
    <ReactQueryDevtools intialIsopen='false' position='bottom-right' />
    </QueryClientProvider>
    </Provider>
);


