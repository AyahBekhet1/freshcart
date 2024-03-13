import React, { useContext, useEffect, useState } from 'react';
import style from './Wishlist.module.css'
import { ColorRing } from 'react-loader-spinner';
import { WishlistContext } from '../../Context/WishlistContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
function Wishlist() {

    let [wishList , setWishList] = useState([])
    let[isloading , setIsLoading] = useState(false)

    let {getUserWishlist,removeFromWishlist} = useContext(WishlistContext)
    let {addToCart} =useContext(CartContext)

  async  function getWishlist (){
    setIsLoading(true)
        let {data} = await getUserWishlist()
        console.log(data);
        setWishList(data.data)
        setIsLoading(false)
    }

    async function removeItemFromWishlist (id){
        const toastId= toast.loading('Waiting...');
         let {data} = await removeFromWishlist(id)
         getWishlist()
         if(data.status === 'success'){
             toast.success('Product removed successfully from your wishlist')
             toast.dismiss(toastId)
         }else {
             toast.error('Error in adding your product')
             toast.dismiss(toastId)
         } 
        let stored= localStorage.getItem('wishlist')
         delete stored[id]
        localStorage.setItem('wishlist' , data.data)


       
    }

    async function addProduct (productId){
        const toastId= toast.loading('Waiting...');
         let responce = await addToCart(productId)
 
         if(responce.data.status === 'success'){
             toast.success(responce.data.message , {
                 iconTheme:{
                     primary:"#0aad0a",
                 }
             })
             toast.dismiss(toastId)
         }else {
             toast.error('Error in adding your product')
             toast.dismiss(toastId)
         }
     }
     
    useEffect(()=>{
        getWishlist()
    },[])

    console.log(wishList);
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
        </div>: <div >
            <div className='w-75 mx-auto p-3 bg-main-light my-5  p-5'>
            <h3 className='fw-bold mb-4'>My Wish List</h3>
        {
            wishList?
            <>
            
            {
                wishList?.map((product)=> <div key={product._id}><div className='row border-bottom align-items-center  mb-4 pb-2' >
                    <div className="col-md-2 ">
                    <img src={product.imageCover} className='w-100 ' alt={product.title} />
                    </div>

                    <div className="col-md-10">
                        <div className="d-flex justify-content-between align-items-center">

                            <div>
                                <h3 className='h5 fw-bolder'> {product.title}</h3>
                                <h6 className='text-main'>Price: {product.price} EGP</h6>
                            </div>
                            <div>
                                <button onClick={()=>addProduct(product.id)} className='btn border-main'>Add to Cart</button>
                            </div>
                            

                        </div>

                        <div onClick={()=>removeItemFromWishlist(product.id)} className='btn p-0 text-danger'>
                            <i className='text-danger font-sm fas fa-trash-can me-2 '></i>
                            Remove
                        </div>
                    </div>
                </div>
                </div>
                )
            }
                
            </>
        : <p>Your Wish List is Empty</p>
    }
    </div>
    </div>
        
        
        }

        
        </>
    );
}

export default Wishlist;