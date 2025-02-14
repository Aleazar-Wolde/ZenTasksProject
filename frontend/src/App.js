// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdvancedDashboardAdvanced from './pages/AdvancedDashboardAdvanced';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<AdvancedDashboardAdvanced />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
