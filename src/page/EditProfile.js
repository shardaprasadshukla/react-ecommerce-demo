import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, updateUser } from '../store/editSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const edituser = useSelector((state) => state.user.user);
  const updatedUser = useSelector((state) => state.user.updatedUser);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  let loggedInUserId;
  
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(''); 
  
  useEffect(() => {
    loggedInUserId = JSON.parse(localStorage.getItem('ecommUser'));
    loggedInUserId = loggedInUserId['id']
    console.log(loggedInUserId)
    setUserId(loggedInUserId)
    const fetchUserData = async () => {
      try {
        console.log('ss',loggedInUserId)
        const response = await fetch(`http://localhost:9000/users/${loggedInUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json(); 
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch, loggedInUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUser({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      setSuccessMessage(true);
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000);
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      // Optionally, you can handle success or update some state to show success message
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
       {successMessage && <div className="success-msg">Profile changed successfully</div>}
       {edituser && (
        <div className='container mt-4'>
           <h3 className='text-center uppercase'>Edit Profile</h3>
          <form className="form-container" onSubmit={handleSubmit}>
             <div className="mb-3">
               <label className="form-label">First Name:</label>
               <input type="text" className="form-control" name="fname" value={updatedUser.fname} onChange={handleInputChange} />
             </div>
             <div className="mb-3">
               <label className="form-label">Last Name:</label>
               <input type="text" className="form-control" name="lname" value={updatedUser.lname} onChange={handleInputChange} />
             </div>
             <div className="mb-3">
               <label className="form-label"> Email:</label>
               <input type="email" className="form-control" name="email" value={updatedUser.email} onChange={handleInputChange} />
             </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
