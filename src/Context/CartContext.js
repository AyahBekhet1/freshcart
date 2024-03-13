import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext = createContext()

let headers = {
    token:localStorage.getItem('userToken')
}



function addToCart (productId){

return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:productId
    },{
        headers
    }).then((res)=>res)
    .catch(err=>err)

}

function getLoggedUserCart (){
  return  axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers
    }).then(res=>res)
    .catch(err=>err)
}

function deleteCartItem (id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers
    }).then(res=>res)
    .catch(err=>err)
}


function updateCartQuantity (id,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        count:count
    },{
        headers
    }).then(res=>res)
    .catch(err=>err)
}


function clearUserCart (){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then(res=>res)
    .catch(err=>err)

}

export default function CartContextProvider (props){

    const [cartId , setCartId]= useState(null)
    const [numOfCartItems , setNumOfCartItems]= useState(0)

    async function getInitialCart (){
    let {data} =  await getLoggedUserCart()
    setNumOfCartItems(data?.numOfCartItems)
    setCartId(data?.data._id)
    }

    useEffect(()=>{
        getInitialCart()
    },[])

    function onlinePayment (shippingAddress){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress:shippingAddress
        },{
            headers
        }).then((res)=>  res)
        .catch(err=>err)
    }

return    <CartContext.Provider value={{setNumOfCartItems, numOfCartItems,addToCart,getLoggedUserCart , deleteCartItem , updateCartQuantity , clearUserCart , onlinePayment}}>
{props.children}
    </CartContext.Provider>
}