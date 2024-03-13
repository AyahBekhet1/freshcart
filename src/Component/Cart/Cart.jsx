import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';


function Cart() {
let {getLoggedUserCart , deleteCartItem , updateCartQuantity , clearUserCart ,setNumOfCartItems} = useContext(CartContext)
let[isloading , setIsLoading] = useState(false)
let [cartDetails , setCartDetails]=useState(null)

console.log(cartDetails);
async function getCart (){
    setIsLoading(true)
    let {data}=   await getLoggedUserCart()
    setCartDetails(data)
    setNumOfCartItems(data?.numOfCartItems)
    setIsLoading(false)
}

async function deleteItem (id){
    let {data}= await deleteCartItem(id)
    setCartDetails(data)
    setNumOfCartItems(data?.numOfCartItems)

}

async function updateCart (id,count){
let {data} = await updateCartQuantity(id , count)
setCartDetails(data)
if(count == 0){
    deleteItem(id)

}
}

async function clearCart (){
 let {data}= await clearUserCart()
    if(data?.message == 'success'){
        setCartDetails(null)
        setNumOfCartItems(data?.numOfCartItems)
    }
}
useEffect(()=>{
    getCart()

},[])
    return (
        <>
        {isloading?<div className="text-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>: <div className='container'>
            <div className='w-75 mx-auto p-3 bg-main-light my-5  p-5'>
            <div className='d-flex justify-content-between align-items-center'>
            <h3 className='fw-bold mb-4'>My Cart</h3>
            <Link className='btn border-main' to={'/checkout'}>
                CheckOut
            </Link>
                </div>
        {
            cartDetails?
            <>
            <div className="total mb-4 fw-bolder d-flex justify-content-between align-items-center">
            <p>total price: <span className='text-main'>{cartDetails?.data.totalCartPrice} EGP</span>  </p>
            <p>total number of items: <span className='text-main'>{cartDetails?.numOfCartItems}</span></p>
            </div>
            {
                cartDetails.data.products.map((product)=> <div key={product.product.id}><div className='row border-bottom align-items-center  mb-4 pb-2' >
                    <div className="col-md-2 ">
                    <img src={product.product.imageCover} className='w-100 ' alt="" />
                    </div>

                    <div className="col-md-10">
                        <div className="d-flex justify-content-between align-items-center">

                            <div>
                                <h3 className='h6'> {product.product.title.split(' ').slice(0,3).join(' ')}</h3>
                                <h6 className='text-main'>Price: {product.price} EGP</h6>
                            </div>

                            <div>
                                <button className='btn border-main p-3' onClick={()=> updateCart(product.product.id , product.count+1)}>+</button>
                                <span className='mx-2'>{product.count}</span>
                                <button className='btn border-main p-3' onClick={()=> updateCart(product.product.id , product.count-1)}>-</button>
                            </div>

                        </div>

                        <div onClick={()=>deleteItem(product.product.id)} className='btn p-0 text-danger border-0'>
                            <i className='text-danger font-sm fas fa-trash-can me-2'></i>
                            Remove
                        </div>
                    </div>
                </div>
                </div>
                )
            }
                <button className='d-block m-auto border-main btn' onClick={()=>clearCart()}>
                    Clear Your Cart
                </button>
            </>
        : <p>Your Cart is Empty</p>
    }
    </div>
    </div>
        
        
        }

        
        </>
    );
}

export default Cart;