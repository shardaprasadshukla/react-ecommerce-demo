import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { clearFormData, setFormDataStore } from '../store/formDataSlice';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
    const userName = localStorage.getItem('firstName');
    const { data: products, status } = useSelector((state) => state.product);
    const cartItems = useSelector((state) => state.cart);
    const formData2 = useSelector((state) => state.formData);
    
    const [formData, setFormData] = useState({
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      mobile: '',
      city: '',
      state: '',
      postalCode: ''
    })


    const [addresses, setAddresses] = useState(()=>{
        const savedAddresses = localStorage.getItem('addresses');
        return savedAddresses ? JSON.parse(savedAddresses) : [];
    });

    const [price, setPrice] = useState(0);
    let itemPrice=0;
    cartItems.map((item)=>{
        itemPrice = itemPrice + (item.price*item.quantity)
    })
       
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
        setPrice(itemPrice);
      }, []);

      
      const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({...formData, [name]: value});
          // dispatch(setFormData({ [name]: value }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        // setEditMode(true);
        setAddresses([...addresses, formData]);
        dispatch(setFormDataStore(formData)); 
        setEditMode(false);
      //   setFormData({
      //     fullName: '',
      //     addressLine1: '',
      //     addressLine2: '',
      //     mobile: '',
      //     city: '',
      //     state: '',
      //     postalCode: ''
      // });
      };
      const [editMode, setEditMode] = useState(false);
      const handleEdit = () => {
        setEditMode(false); 
      };
      const handleAddNewAddress = () => {
        setEditMode(true);
        
        dispatch(clearFormData(formData2));
      };
      useEffect(() => {
        localStorage.setItem('addresses', JSON.stringify(addresses));
    }, [addresses]);
      const navigate = useNavigate();
      const changeAddress = () =>{
        navigate("/login");
      }

  return (
    <>
      <Header count={cartItems.length} />
      <div className='container mt-4'>
         <div className='row'>
            <div className='col-md-8'>
               <div className='login-block flex justify-content-between'>
                   <div className='left-block flex'>
                      <div className='num-log'>
                         1
                      </div>
                      <div>
                        <div className='text-block'>Login 
                          <svg height="20" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" stroke="#2974f0"></path></svg>
                        </div>
                        <span>{userName} <strong>9013946180</strong></span>
                      </div>
                   </div>
                   <div className='right-block'>
                      <button onClick={changeAddress}>CHANGE</button>
                   </div>
               </div>

    
               <div className='delivery-block'>
                  <h3 className='top-strip'>
                    <span className='num-log'>2</span>
                    <span>Delivery Address</span>
                  </h3>
           
                  <div className='flex address-list'>
                    {editMode && <div className='fill-details'>
                        <form onSubmit={handleSubmit}>
                           <div className="row">
                            <div className='col-md-6'>
                                <label htmlFor="fname" className="form-label"> Full Name:</label>
                                <input type="text" id='fname' className='form-control mb-3' name="fullName" value={formData.fullName} onChange={handleChange} />
                            </div>
                            
                            <div className='col-md-6'>
                                <label htmlFor="address1" className="form-label"> Address Line 1:</label>
                                <input type="text" id='address1' className='form-control mb-3' name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
                            </div>
                            
                            <div className='col-md-6'>
                                <label htmlFor="address2" className="form-label"> Address Line 2:</label>
                                <input type="text" id='address2' className='form-control mb-3' name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
                            </div>
                            
                            <div className='col-md-6'>
                                <label htmlFor="city" className="form-label"> City:</label>
                                <input type="text" id='city' className='form-control mb-3' name='city' value={formData.city} onChange={handleChange} />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor="mobile" className="form-label">Mobile Number:</label>
                                <input type="text" id='mobile' className='form-control mb-3' name='mobile' value={formData.mobile} onChange={handleChange} />
                            </div>
                            
                            <div className='col-md-6'>
                                <label htmlFor="state" className="form-label"> State:</label>
                                <input type="text" id='state' className='form-control mb-3' name="state" value={formData.state} onChange={handleChange} />
                            </div>
                            
                            <div className='col-md-6'>
                                <label htmlFor="postalCode" className="form-label">Postal Code:</label>
                                <input type="text" id='postalCode' className='form-control mb-3' name='postalCode' value={formData.postalCode} onChange={handleChange} />
                            </div>
                            </div>
                            <button type="submit" className='deliver-btn mb-3'>Submit</button>
                        </form>
                    </div>}
                 
                     
                      <>
                      {addresses.map((address, index) => (
                        <label htmlFor="" className='label-check'>
                            <input type="radio" name='address' className='check' checked />
                            <div className="content-right">
                                <div className="contact-details">
                                    <div className='text'>
                                    <p className='para'>
                                        <span className='name'>{address.fullName}</span>
                                        <span className='home'>HOME</span>
                                        <span className='num'>{address.mobile}</span>
                                    </p>
                                    <span className='para-title'>
                                        {address.addressLine1}{address.addressLine2}
                                        {address.city}
                                    <span className='code-num'> {address.postalCode}</span></span>
                                    <button className="deliver-btn">Deliver Here</button>
                                    </div>
                                </div>
                            </div>
                        </label>
                        ))}
                        <div className="edit-area">
                            <button type='button' onClick={handleEdit} className='edit-btn'>EDIT</button>
                        </div>
                     </>
                  </div>
                  <div className='address-list addnew-address' onClick={handleAddNewAddress }>
                     <span>+</span>
                      Add a new address
                  </div>
               </div>
            </div>

            <div className='col-md-4'>
             <div className='payment-details'>
                  <span>Price details</span>
                  <div className='priceList flex justify-content-between'>
                     <strong>Price ({cartItems.length} item)</strong>
                     <span>&#8377; {itemPrice.toFixed(2)}</span>
                  </div>
                  <div className='priceList flex justify-content-between'>
                     <strong>Total Payment</strong>
                     <span>&#8377; {itemPrice.toFixed(2)}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
  )
}

export default CheckOutPage
