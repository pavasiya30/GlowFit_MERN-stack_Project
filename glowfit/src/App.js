import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import the AuthProvider from the AuthContext file
import { AuthProvider } from './components/AuthContext';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Program from './pages/Program';

import Beginner from './pages/Beginner';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import AdminDashboard from './pages/admin/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import FollowSection from './components/FollowSection';

function App() {
  return (
    <Router>
      {/* Wrap all components that need access to the authentication state */}
      {/* in the AuthProvider */}
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/program" element={<Program />} />

          <Route path="/beginner" element={<Beginner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='/follow' element={<FollowSection/>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
