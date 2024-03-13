import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

function ProductDetails() {

    let { id } = useParams();

    let {addToCart ,setNumOfCartItems} = useContext(CartContext)
    // const [productDetails, setProductDetails] = useState(null);

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
    
    function getProductDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    let {data , isLoading ,isError} = useQuery('productDetails' ,()=> getProductDetails(id)
    )

    console.log('loading product' , isLoading);
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={data?.data.data.images[i]} className="w-100 "/>
         </a>
       );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

 
//   async function getProductDetails(id) {
//     let { data } = await axios.get(
//       `https://ecommerce.routemisr.com/api/v1/products/${id}`
//     );
//     // console.log(data.data);
//     setProductDetails(data.data);
//   }

//   useEffect(() => {
//     getProductDetails(id);
//   }, []);

  return (
    <div className="container">

    {data?.data.data?
     <div className="row my-5 align-items-center">
      <Helmet>
        <title>{data?.data.data.title}</title>
        <meta name="description" content={data?.data.data.description} />
      </Helmet>
        <div className="col-md-4">
                <div className="slider-container">
            <Slider {...settings}>
          {data?.data.data.images.slice(0,4).map((img,i) => (
            <div key={i}>
                <img src={img} className="w-100 mb-4"/>
            </div>

                    ))}
                
              </Slider>
            </div>
        </div>
        <div className="col-md-8">
            <h2 className="h5">{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>

            <h6 className="text-main">{data?.data.data.category?.name}</h6>
            <h6>Price: {data?.data.data.price} EGP</h6>

            <div className="d-flex justify-content-between">
                <span> <i className="fas fa-star rating-color"></i> {data?.data.data.ratingsAverage}</span>
                <span>ratings quanttity:{data?.data.data.ratingsQuantity}</span>
            </div>

            <button onClick={()=>addProduct(data.data.data._id)} className="btn w-100 bg-main text-white mt-2">Add To Cart</button>
        </div>    
      </div>:''
    
    
    
  }

     </div> 
  );
}

export default ProductDetails;
