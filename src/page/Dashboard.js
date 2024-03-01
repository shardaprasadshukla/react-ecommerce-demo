import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import CheckFilter from "../component/CheckFilters";
import ProductItem from "../component/ProductItem";
import CartList from "../component/CartList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { STATUSES, fetchProducts, setProducts, setStatus } from "../store/productSlice";
import { add } from "../store/cartSlice";


export default function CartDashboard() {
  const [productList, setProductList] = useState("");
  const dispatch = useDispatch();
  let { data: products, status } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart);
 
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 
  //console.log(products)
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showcart, setShowcart] = useState(false);
  const [searchProductItem, setSearchProductItem] = useState("");
   

  useEffect(() => {
    const loggedIn = localStorage.getItem("ecommUser")
      ? localStorage.getItem("ecommUser")
      : "";
    if (!loggedIn) {
      navigate("/");
    }
    const storedCartValue = localStorage.getItem("storeCartValue");
    if (storedCartValue === "success") {
      // Fetch and update cart from local storage
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      setCart(storedCart);
    }
    
  }, []);

  //add product in cart
  const addToCartHandler = (data) => {
     //localStorage.setItem('storeCartValue', 'success');
     //localStorage.setItem('cart', JSON.stringify([...cart, { ...data, quantity: 1 }]));
     // setCart([...cart, { ...data, quantity: 1 }]);
      dispatch(add({...data, quantity:1}));
  };

 //search product
  const handleSearch = (e) => {
    setSearchProductItem(e); // Update the search input value
   // Filter the products based on the search input
    const filterProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(e.toLowerCase());
    });
    // Update the productList state with the filtered products
    setProductList(filterProducts);
  };
  
  const cartdata = () => {
    setShowcart(true);
  };
  const backHome = () => {
    setShowcart(false);
  };
 
   const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory) {
      const filterProducts = products.filter((product) => {
        return product.category === selectedCategory;
      });
      setProductList(filterProducts);
    } else {
       setProductList(products);
    }
   };

  return (
    <>
      <Header
        handleSearch={handleSearch}
        count={cartItems.length}
       // storedCart={cart}
        cartdata={cartdata}
        backHome={backHome}
      />
       {status==='loading' && "Product loading..."}
        
          {productList.length>0? (
            <div className="container-fluid my-5 px-4">
              <div className="row mt-4">
                <CheckFilter handleCategoryChange={handleCategoryChange} />
                <div className="col-sm-10 col-md-10">
                  <ProductItem products={productList} addToCart={addToCartHandler} searchProductItem={searchProductItem} />
                  </div>
              </div>
            </div>
             ): (<div className="container-fluid my-5 px-4">
            <div className="row mt-4">
              <CheckFilter handleCategoryChange={handleCategoryChange} />
              <div className="col-sm-10 col-md-10">
                <ProductItem products={products} addToCart={addToCartHandler} searchProductItem={searchProductItem} />
                </div>
            </div>
           </div>)}
        
      
      <Footer />
    </>
  )}

