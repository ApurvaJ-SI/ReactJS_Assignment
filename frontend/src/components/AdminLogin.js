import React, { useState } from 'react';
import './Login.css';
import axios from 'axios'; // Import Axios for making API requests
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    passkey: '',
    secretkey: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const { username, passkey, secretkey } = formData;
    console.log(username,passkey,secretkey);
    axios.post('/api/admin-login', {
      username,
      passkey,
      secretkey,
    })
    .then(function(response){
      if(response.data[0]!=null){
        if (response.data[0].role === "admin") {
                setLoggedIn(true);
                navigate('/adminlogin/admindashboard');
              } 
      }
      else {
        alert("Wrong credentials");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="form-style">
      <div className="login-form">
        {!loggedIn ? (
          <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="passkey"
                  value={formData.passkey}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Secret Key</label>
                <input
                  type="password"
                  name="secretkey"
                  value={formData.secretkey}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2>Welcome, {formData.username} (Admin)!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
