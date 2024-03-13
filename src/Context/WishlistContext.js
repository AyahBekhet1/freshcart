import axios from "axios";
import { createContext } from "react";


export let WishlistContext = createContext()

let headers = {
    token:localStorage.getItem('userToken')
}

function addToWishlist (productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        productId:productId
    },{
        headers
    }).then(res=>res)
    .catch(err=>err)
}


function removeFromWishlist (id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` , {
        headers
    }).then(res=>res)
    .catch(err=>err)
}

function getUserWishlist (){
return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
    headers
}).then(res=>res)
.catch(err=>err)
}

export default function WishlistProvider (props){
 return   <WishlistContext.Provider value={{addToWishlist , removeFromWishlist , getUserWishlist}}>
        {props.children}
    </WishlistContext.Provider>
}

