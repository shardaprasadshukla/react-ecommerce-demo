import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Header({handleSearch, count, backHome}) {
  const profile = localStorage.getItem('userProfilePicture');
  const userName = localStorage.getItem('firstName');
  const navigate = useNavigate();
  
  const logout = ()=> {
    navigate('/')
    localStorage.removeItem('ecommUser');
      //window.location.href = "/"
  }
 
  const cartdata = () =>{
    navigate('/cart')
  }

  const [profilePopup, setProfilePopup] = useState(false)
  const showProfilePopup = () =>{
   // setProfilePopup(true)
    setProfilePopup(prevState => !prevState);
  }
  const editprofile = () =>{
    navigate('/change-password')
  }
   return (
    <>
        <nav className="py-2 px-3 bg-body-tertiary border-bottom bg-color">
            <div className="d-flex flex-wrap">
            <ul className="nav me-auto">
                <li className="nav-item"><Link to="/dashboard" onClick={backHome} className="nav-link link-body-emphasis px-2 active" aria-current="page">Home</Link></li>
                <li className="nav-item"><a className="nav-link link-body-emphasis px-2">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">About</a></li>
            </ul>
            <ul className="nav flex">
                   <li>
                   <input
                      type="search"
                      className="form-control-sm"
                      onChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                      
                   />
                   </li>
                   <li className="nav-item dropdown">
                    <button onClick={showProfilePopup} className="logoutBtn nav-link link-body-emphasis px-2">
                       <img src={profile} alt="Profile" className="profile-picture"/>
                       &nbsp;<span>{userName}</span>
                    </button>
                    {profilePopup && (
                     <ul className="dropdown-menu dropdown-menu-dark show">
                      <li><Link to="/edit-profile" target='_blank' className="dropdown-item">Edit Profile</Link></li>
                      <li><Link target='_blank' to="/change-password" className="dropdown-item">Change Password</Link></li>
                      <li><a className="dropdown-item">Something else here</a></li>
                      <li><a className="dropdown-item">Separated link</a></li>
                      <li><a className="dropdown-item" onClick={logout}> Logout</a></li>
                    </ul>
                     )}
                    </li>
              
                 <li className="nav-item"><span onClick={cartdata} className="nav-link link-body-emphasis px-2">
                     Cart <sup>{count}</sup></span>
                  </li>
            </ul>
        </div>
        </nav> 
       
    </>
  )
}
