import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests

const PlayerLogin = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    passkey: '',
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

    const { username, passkey} = formData;
    console.log(username,passkey);
    await axios.post('/api/user-login', formData)
    
    .then(function(response){
      if(response.data[0]!=null){
        if (response.data[0].role === "user") {
                setLoggedIn(true);
                navigate('/playerlogin/playerdashboard');
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
            <h2>Player Login</h2>
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
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2>Welcome, {formData.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerLogin;
