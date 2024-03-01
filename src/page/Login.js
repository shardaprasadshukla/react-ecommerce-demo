import React, { useState } from 'react'
import  Header  from "../component/Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

  const Login = () => {
    const[formData, setFormData] = useState({
      email: '',
      password: ''
    })
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const [error, setError]=useState({})
    const [valid, setValid]=useState(true)
    const navigate = useNavigate();
    const [profile, setProfile] = useState();
    const [uname, setUname] = useState();

    const handleLogin = (e) =>{
      e.preventDefault();
      let isvalid = true;
      let validationError = {}

      if(formData.email==="" || formData.email===null){
        isvalid=false;
        validationError.email="Email required"
      }
      else if(emailRegex.test(formData.email)){
        isvalid=false;
        validationError.email="Email is not valid"
      }

      if(formData.password==="" || formData.password===null){
        isvalid=false;
        validationError.password="Password required"
      }else if(formData.password.length<6){
        isvalid=false;
        validationError.email="Password length at least 6 char"
      }
       
        axios.get('http://localhost:9000/users')
        .then(result => {
            result.data.map(user=>{
              if(user.email === formData.email){
                if(user.password === formData.password){
                  const userProfilePicture = user.profilePicture;
                  const uname = user.fname;
                  setUname(uname)
                  setProfile(userProfilePicture)
                 localStorage.setItem('userProfilePicture', userProfilePicture);
                 localStorage.setItem('firstName', uname);
                 localStorage.setItem('ecommUser', JSON.stringify(user));
                  navigate('/dashboard');
                 }else{
                  isvalid=false;
                  validationError.password='wrong password'
                }
              }
            })
            setError(validationError);
            setValid(isvalid)
        })
        .catch(err => console.log(err))
     
    }
    return (
      <>
      <div className='container mt-4'>
        <form className='form-container' onSubmit={handleLogin}>
        {
            valid ? <></>:
            <div className='error-flex'>
                <span className='error'>{error.email}</span>
                <span className='error'>{error.password}</span>
            </div>
        }
          <div className="row mb-3">
              <label htmlFor="inputEmail3" className="form-label">Email</label>
              <div className="col-sm-12">
              <input type="email" className="form-control" id="inputEmail3" autoComplete='off'
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
              />
              </div>
          </div>
          <div className="row mb-3">
              <label htmlFor="inputPassword3" className="form-label">Password</label>
              <div className="col-sm-12">
              <input type="password" className="form-control" id="inputPassword3" autoComplete='off'
              onChange={(e)=>setFormData({...formData, password:e.target.value})}
              />
              </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>
        
        </form>
          <div className='registraion-link'>
            <span>If you don't have account, Please <Link to='/registration'>Registration</Link></span>
          </div>
      </div>
      </>
    )
}

export default Login
