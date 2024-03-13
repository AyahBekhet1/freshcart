import React from "react";
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";

import img4 from '../../Assets/images/ad-banner-1.jpeg'
import img5 from '../../Assets/images/ad-banner-2.jpeg'
function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    arrows:false,
    customPaging: i => (
      <div
        style={{
          width: "15px",
          color: "#D6D6D6",
          border: "1px #D6D6D6 solid",
          height:"5px",
          backgroundColor:"#D6D6D6",
          borderRadius:"50px",
          marginTop:"20px",
        }}
      >
      
      </div>

    )
  };
  return (
    <div className="container my-5 ">
      <div className="row gx-0">
        <div className="col-md-8 mb-4 ">
          <Slider {...settings}>
            <img src={img3} alt="" style={{objectFit:'cover'}} height={'400'} className="w-100 " />
            <img src={img1} alt="" style={{objectFit:'cover'}} height={'400'} className="w-100 " />
            <img src={img2} alt="" style={{objectFit:'cover'}} height={'400'} className="w-100 " />
          </Slider>
        </div>

        <div className="col-md-4 ">
            <img style={{objectFit:'cover'}} src={img4} height={'200'} alt="" className="w-100 "/>
            <img style={{objectFit:'cover'}} src={img5} height={'200'} alt="" className="w-100 " />
        </div>
      </div>
    </div>
  );
}

export default MainSlider;
