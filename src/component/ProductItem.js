import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Card({addToCart, products}) {

return <div className="">
 {!products && <h3>Loading...</h3>}
    {products.length>0 && <div className="row">
       { 
        products.map((productItem)=>{
          const {id, title, price, category,image, rating} = productItem;
          return(
              <div key={productItem.id} className="col-sm-4 mb-3">
                <div className="card">
                <Link to={`/product/${id}`} className="card-link"><img src={image} className="card-img-top" alt="..." /></Link>
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="rating">
                      <strong>Rating: </strong>
                      <span>{rating.rate}</span>
                    </div>
                    <p className="card-text">
                      <span>{category}</span>
                    </p>
                    <div className="price">&#8377;{price}</div>
                    <button onClick={() => addToCart(productItem)} className="btn btn-secondary btn-sm mt-2">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            )
         })
        }
         </div>
      
      }
    </div>
}
