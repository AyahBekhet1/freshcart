import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
function Brands() {
  let [brands, setBrands] = useState([]);

  async function getBrands() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");

    setBrands(data);
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          {brands?.data?.map((item) => (<>
            <div className="col-md-3 my-4">
            <button className="btn  border-0 " data-bs-toggle="modal" data-bs-target={`#${item.name}`}>
              <div className="card product ">
                <img src={item.image} alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title text-center fw-bolder fs-3">
                    {item.name}
                  </h5>
                </div>
              </div>
            </button>
            <div className="modal fade" id={item.name} tabIndex="-1" aria-labelledby={`${item.name}`} aria-hidden="true">
        <div className="modal-dialog">
             <div className="modal-content">
                 <div className="modal-header">
        <h1 className="modal-title fs-5" id={`${item.name}`}>{item.name}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex ">
      <img src={item.image} alt={item.name} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
            </div>
            </div>
           
            
          </>
          ))}
        </div>

        
      </div>
    </>
  );
}

export default Brands;
