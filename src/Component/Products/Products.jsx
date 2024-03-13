import React, { useState, useEffect, useContext } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

function Products() {
    let {addToCart , setNumOfCartItems} = useContext(CartContext)
    let {addToWishlist} = useContext(WishlistContext)

    let [wishlist , setWishlist]=useState(localStorage.getItem('wishlist')?.split(','))
    
    console.log(wishlist);
    async function addProduct (productId){
       const toastId= toast.loading('Waiting...');
        let responce = await addToCart(productId)
        setNumOfCartItems(responce.data.numOfCartItems)

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

  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isLoading, isError, data, isFetching, refetch } = useQuery(
    "featuredProducts",
    getFeaturedProducts,
    {
      // cacheTime:3000,
      // refetchOnMount:false,
      // staleTime:30000,
      // refetchInterval:1000,
    }
  )

 
async function addProductToWishlist (id) {
        const toastId= toast.loading('Waiting...');

        // setAddedToWishlist(true)
        let {data} = await addToWishlist(id)
        setWishlist(data?.data)
        console.log(data);
        localStorage.setItem('wishlist' , data?.data)

        if(data?.status === 'success'){
          toast.success(data.message )
          toast.dismiss(toastId)
      }else {
          toast.error('Error in adding your product')
          toast.dismiss(toastId)
      }
      }

  

  return (
    <div className="container">
      {isLoading ? (
        <div className="text-center">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        <div className="row gy-3">
          {data?.data.data.map((item) => (
            <div className=" col-md-2 "  key={item._id}>
                <div className="product p-3 position-relative">
                  <div onClick={()=>addProductToWishlist(item._id)} className="d-flex justify-content-end heart-icon">
                       <i className={"fa-solid fa-heart fs-4 position-relative top-50 " +((wishlist?.find((idd)=>idd == item._id ))?'text-danger' : "")}   ></i>
                  </div>
                  

              <Link to={`/productdetails/${item._id}`}>
                  <img src={item.imageCover} alt="" className="w-100" />
                  <p className="text-main">{item.category.name}</p>
                  <h2 className="h6 fw-bold">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="d-flex justify-content-between ">
                    <span>{item.price} EGP</span>
                    <div className="rating">
                      <i className="fa fa-star rating-color me-1"></i>
                      <span>{item.ratingsAverage}</span>
                    </div>
                  </div>
              </Link>
                 
                  <button onClick={()=>addProduct(item._id)} className="btn bg-main w-100 text-white my-2 d-block m-auto">
                    Add to Cart
                  </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
