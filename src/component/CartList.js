import React from 'react'
import { useState, useEffect } from 'react';
//ctr + shift + L replace multiple class name
import Header from "../component/Header";
import { useSelector, useDispatch } from "react-redux";
import { STATUSES, fetchProducts, setProducts } from "../store/productSlice";
import { quantityUpdate, remove } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartList() {
    const [CART, setCART] = useState([]);
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);
    const cartItems = useSelector((state) => state.cart);
    const [cart, setCart] = useState([]);
 
  
   
    useEffect(() => {
      dispatch(fetchProducts());
    }, []);
    
    const handleDecreaseQuantity = (cartItem) => {
        const updatedQuantity = Math.max(0, cartItem.quantity - 1);
        dispatch(quantityUpdate({ ...cartItem, quantity: updatedQuantity }));
    };
    
    const handleIecreaseQuantity = (cartItem) => {
        const updatedQuantity = cartItem.quantity + 1;
        dispatch(quantityUpdate({ ...cartItem, quantity: updatedQuantity }));
    };
   
    const removeItem = (itemId) => {
        // const updatedCart = CART.filter((item, index) => index !== cartindex);
        // setCART(updatedCart);
        // cartItems.removeItem(updatedCart)
        dispatch(remove(itemId.id));
    };
    // const changeHandle = (e, cartindex) =>{
    //     const updatedCart = CART.map((item, index) => {
    //         return cartindex === index ? { ...item, quantity: e.target.value } : item;
    //     });
    //     setCART(updatedCart);
    // }

    const navigate = useNavigate();
    const checkout = () =>{
        navigate("/checkout");
    }
    useEffect(() => {
        setCART(cartItems)
    }, [cartItems])
  return (
    <>
    <Header
       count={cartItems.length}
    />
    <div className="container mt-4 mb-210">
        {
            cartItems?.map((cartItem, cartindex)=>{
                return(
                   <div className="row added-item-row">
                        <div className="d-flex flex-row justify-content-between align-items-center pt-lg-4 pt-2 pb-3 border-bottom mobile">
                           <div className='d-flex flex-row align-items-center width24'>
                             <div className='image-block'><img src={cartItem.image} alt='' width={45} /></div>
                             <div className='d-flex flex-column pl-md-3 pl-1'><span>{cartItem.title}</span></div>
                           </div>
                           
                           <div className='flex'>
                            <button onClick={() => handleDecreaseQuantity(cartItem,cartindex)}>-</button>
                                {/* <input type='text' onChange={(e) => changeHandle(e, cartindex)} value={cartItem.quantity} /> */}
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => handleIecreaseQuantity(cartItem,cartindex)}>+</button>
                            </div>
                          
                           <div className='width25'>&#8377; {(cartItem?.price * cartItem?.quantity).toFixed(2)}</div>
                           <div onClick={()=>removeItem(cartItem)} className='remove-item width10'>x</div>
                        </div>
                       
                   </div>
                )
            })
        }
        <div className='mt-3 align-right'> <strong>Total: </strong>&#8377;
                {
                    cartItems.map(item => item.price * item.quantity).reduce((total, value) => total + value, 0).toFixed(2)
                }
       </div>
          <div className='flex align-right'>
                <button onClick={checkout} className="btn btn-warning shadow-0">Checkout</button>
         </div>
    </div>
    </>
  )
}
