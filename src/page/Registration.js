import React, {useState} from 'react'
import  Header  from "../component/Header";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    const[formData, setFormData] = useState({
        fname:'',
        lname:'',
        email:'',
        password: '',
        cpassword:''
    })
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const [error, setError] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault()
     console.log('Form submitted!', formData);
      let isvalid = true;
      let validationError = {}
      if(formData.fname==="" || formData.fname===null){
        isvalid=false;
        validationError.fname="First name required"
      }
      if(formData.lname==="" || formData.lname===null){
        isvalid=false;
        validationError.lname="Last name required"
      }

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
      if(formData.cpassword !== formData.password){
        isvalid=false;
        validationError.email="Current password not match"
      }
      setError(validationError);
      setValid(isvalid)

      if(Object.keys(validationError).length === 0){
        //alert('registration successfully');
        axios.post('http://localhost:9000/users', formData)
        .then(result => {
            setRegistrationSuccess(true);
            setTimeout(() => {
                navigate('/')
            }, 1000);
        })
        .catch(err => console.log(err))
      }

    }
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
  return (
    <> 
    <Header hideCart={true} />
    <div className='container mt-4'>
        {registrationSuccess && (
          <div className="success-msg">Registration successfully</div>
        )}
      <form className="form-container" onSubmit={handleSubmit}>
        {
            valid ? <></>:
            <div className='error-flex'>
                <span className='error'>{error.fname}</span>
                <span className='error'>{error.lname}</span>
                <span className='error'>{error.email}</span>
                <span className='error'>{error.password}</span>
                <span className='error'>{error.cpassword}</span>
            </div>
        }
         <div className="mb-3 row g-3">
                <div className='col-md-6'>
                    <label htmlFor="fullName" className="form-label">First name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder='First name'
                        autoComplete='off'
                        onChange={(e)=>setFormData({...formData, fname:e.target.value})}
                    />
                </div>
                <div className='col-md-6'>
                    <label htmlFor="LastName" className="form-label">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="LastName"
                        placeholder='Last name'
                        autoComplete='off'
                        onChange={(e)=>setFormData({...formData, lname:e.target.value})}
                    />
                </div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder='Email'
                autoComplete='off'
                onChange={(e)=>setFormData({...formData, email:e.target.value})}
              />
            </div>
             <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder='Password'
                autoComplete='off'
                onChange={(e)=>setFormData({...formData, password:e.target.value})}
                
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">Current password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                placeholder='Current password'
                autoComplete='off'
                onChange={(e)=>setFormData({...formData, cpassword:e.target.value})}
                
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <div className='registraion-link'>
           <span>If you have account, Please <Link to='/'>Login</Link></span>
        </div>
    </div>
    </>
  )
}

export default Registration
