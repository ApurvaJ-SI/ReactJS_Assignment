// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Registration';
import AdminLogin from './components/AdminLogin';
import PlayerLogin from './components/PlayerLogin';
import AdminDashboard from './components/AdminDashboard';
import PlayerDashboard from './components/PlayerDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/playerlogin" element={<PlayerLogin />} />
        <Route path="/adminlogin/admindashboard" element={<AdminDashboard />}/>
        <Route path="/playerlogin/playerdashboard" element={<PlayerDashboard />}/>
      </Routes>
    </Router>
  );
};

export default App;
