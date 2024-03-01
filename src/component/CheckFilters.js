import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";



const CheckFilters = ({handleCategoryChange}) => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
   const uniqueCategories = [...new Set(products.map(productItem => productItem.category))];
   
 
  return (
    <>
          <div className="col-sm-2 col-md-2">
            <div className="filter">
                 <h3>FILTER</h3>
            </div>
        
            <div className="category-list">
            {
              uniqueCategories.map(category => {
                   return (
                       <div key={category}>
                          <div className="form-check">
                              <input 
                                className="form-check-input"
                                type="checkbox"
                                value={category}
                                id={`flexCheck${category}`}
                                onChange={(e)=>handleCategoryChange(e.target.value)}
                              />
                              <label className="form-check-label" htmlFor={`flexCheck${category}`}>
                                  {category}
                              </label>
                          </div>
                      </div>
                  );
                })
            }
            </div>
        </div>
    </>
  )
}

export default CheckFilters
