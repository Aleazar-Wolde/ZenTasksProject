// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdvancedDashboardAdvanced from './pages/AdvancedDashboardAdvanced';
import Calendar from './pages/Calendar';
import Setting from './pages/Setting';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<AdvancedDashboardAdvanced />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
