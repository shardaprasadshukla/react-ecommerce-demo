// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import { useSelector, useDispatch } from "react-redux";
import Footer from '../component/Footer';
import { add } from "../store/cartSlice";
import ReactImageZoom from 'react-image-zoom';

export default function ProductDetails() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState('');
  const dispatch = useDispatch();

    const [CART, setCART] = useState([]);
    const cartItems = useSelector((state) => state.cart);
    useEffect(() => {
      setCART(cartItems)
    }, [cartItems])
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProductDetails(data);
        console.log('ss', data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productId]);

  
  const addProduct = () => {
     // Dispatch an action to add the product to the cart
      dispatch(add(productDetails));
  };

  if (!productDetails) {
    return <div className='loader'><span></span></div>;
  }
  return (
    <>
    <Header
       count={cartItems.length}
    />
    <section className="py-5">
      <div className="product-details-page">
        <div className="row gx-5 m-0">
          <aside className="col-md-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center left-product">
              {/* <img src={productDetails.image} alt={productDetails.title} width="520" /> */}
              <ReactImageZoom
                 zoomImage={productDetails.zoomedImage}
                 img={productDetails.image}
                 width={520}
              />
            </div>
          
          
          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
                {productDetails.title}
              </h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="ms-1">
                    {productDetails.rating.rate}
                  </span>
                </div>
                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{productDetails.rating.count} orders</span>
                <span className="text-success ms-2">In stock</span>
              </div>

              <div className="mb-3">
                <span className="h5">&#8377; {productDetails.price}</span>
              </div>

              <p>
                {productDetails.description}
              </p>

            

              <hr />

              {/* <div className="row mb-4">
                <div className="col-md-4 col-6">
                  <label className="mb-2 d-block">Quantity</label>
                  <div className="input-group">
                    <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                      <span>-</span>
                    </button>
                    <input type="text" className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div> */}

              <div className='flex'>
                <button className="btn btn-warning shadow-0"> Buy now </button>
                <button className="btn btn-primary shadow-0" onClick={addProduct}> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </button>
              </div>
            
            </div>
          </main>
        </div>
      </div>
   </section>
<Footer />
    </>
  );
}



