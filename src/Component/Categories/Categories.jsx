import React, { useEffect, useState } from 'react';
import style from './Categories.module.css'
import axios from 'axios';
import Slider from 'react-slick';
import { useQuery } from 'react-query';

function Categories() {

    
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ],
        appendDots: dots => (
          <div
            style={{
              // backgroundColor: "#ddd",
              borderRadius: "50px",
              padding: "0px"
            }}
          >
            <ul style={{ margin: "0px" }}> {dots} </ul>
          </div>
        ),
        customPaging: i => (
          <div
            style={{
              width: "15px",
              color: "#D6D6D6",
              border: "1px #D6D6D6 solid",
              height:"5px",
              backgroundColor:"#D6D6D6",
              borderRadius:"50px"
            }}
          >
          
          </div>
        )
      
      };

      function getCategories (){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }

      let {isLoading , isError , data} = useQuery('categorySlider' , getCategories)

  
    return (
        <>
        <div className="container my-5">

        <div className='row'>

        {
            data?.data.data? data?.data.data.map(item=>
                <div className="col-md-4 my-4" >

<div class="card product" key={item.id} >
<img src={item.image} alt={item.name} style={{height: "20rem" , objectFit:"cover"}}  className='w-100 mb-2' />
  <div class="card-body">
    <h5 class="card-title text-main text-center fw-bolder fs-3">{item.name}</h5>
    
  </div>
</div>

                {/* <div key={item._id} className='item px-1'>
                <img src={item.image} alt={item.name}  className='w-100 mb-2' />
                <h5 className='h6 fw-bold'>{item.name}</h5>
                </div> */}
                </div>
                ):''
            }
         </div>
     </div>
        </>
    );
}

export default Categories;