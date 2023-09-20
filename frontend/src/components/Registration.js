import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function RegistrationPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'admin') {
      // Redirect to the admin registration page or perform any desired action.
      // Example: history.push('/admin-registration');
    } else if (role === 'player') {
      // Redirect to the player registration page or perform any desired action.
      // Example: history.push('/player-registration');
    }
  };

  return (
    <div className="container">
      <div className="box">
      <div className="company-name">Sportz Interactive</div>
      <h1>Login as</h1>
      <div className="button-container">
      <button onClick={() => navigate('adminlogin')}>Admin</button>
      <button onClick={() => navigate('playerlogin')}>Player</button>
      </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
