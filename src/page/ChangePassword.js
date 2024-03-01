import React, { useState } from 'react';

const ChangePassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleChangePassword = async (e) => {
    e.preventDefault();
    // try {
    //   console.log(username)
    //   const response = await fetch(`http://localhost:9000/users?email=${username}&password=${password}`);
    //   const data = await response.json();
    //   if (data.length === 0) {
    //     throw new Error('Invalid username or password');
    //   }
    //   const id = data[0].id;
    //   console.log(data);
    //   const r = { password: newPassword };
    //   const res = await fetch("http://localhost:9000/users/"+id, {
    //     method: 'PATCH',
    //     body: JSON.stringify(r),
    //     headers: {
    //       'content-type': 'application/json',
    //     }
    //   });
    //   setSuccessMessage(true)
    // } catch (error) {
    //   console.log(error.message)
    //   alert(error.message);
    // }

    try {
    
      const response = await fetch(`http://localhost:9000/users?fname=${username}&password=${password}`);
      const data = await response.json();
      console.log(username)
      if (data.length === 0) {
        throw new Error('Invalid username or password');
      }
      const id = data[0].id;
      
      const r = { password: newPassword };
      const newData = {...data[0], password:newPassword, cpassword:newPassword}
      delete newData['id'];
      console.log('newData', newData);
      
      const res = await fetch("http://localhost:9000/users/"+id, {
        method: 'PUT',
        body: JSON.stringify(newData),
        headers: {
          'content-type': 'application/json',
        }
      });
      setSuccessMessage(true)
    } catch (error) {
      console.log(error.message)
      alert(error.message);
    }
  };
  

  return (
    <div>
        {successMessage && <div className="success-msg">Password changed successfully</div>}
        <div className='container mt-4'>
          <h3 className='text-center uppercase'>Password Change</h3>
          <form className="form-container" onSubmit={handleChangePassword}>
            <div className="mb-3">
              <label className="form-label">Username:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Old Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password:</label>
              <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
        </div>
    </div>
  );
}

export default ChangePassword;
