import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo from '../assets/img/logo1.png';
import back from '../assets/img/back.jpg';
import googleLogo from '../assets/img/google.jpg';
import backgroundImage from '../assets/img/background.jpeg';
import '../assets/style.css';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name.trim()]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Corrected the port to 5000 to match the server.js file.
      const response = await axios.post('http://localhost:5000/api/auth/login', form);
      const { user } = response.data;

      // Call the login function from the AuthContext to update the state
      login(user);

      // Check the user's role and redirect accordingly
      if (user.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="a2"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Top Bar */}
      <div className="row a2 mb-3 p-2">
        <div className="col-4">
          <Link to="/">
            <img src={back} alt="Back" className="small_img" />
          </Link>
          <Link className="navbar-brand text-light" to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ height: 50, width: 100, borderRadius: '50%' }}
            />
          </Link>
        </div>
        <div className="col-4">
          <h4 className="a1 text-center">Flexibility Hub</h4>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <fieldset className="border a1 p-4 bg-light border-4" style={{ borderRadius: '15px' }}>
          <h4 className="text-center">Log in to FlexibilityHub</h4>
          <p>Continue on your journey with FlexibilityHub</p>

          <button type="button" className="btn border border-dark form-control rounded-pill mb-3">
            <img src={googleLogo} alt="Google" className="small_img me-2" />
            Continue with Google
          </button>

          <div className="line d-flex align-items-center my-3">
            <hr className="flex-grow-1 line-hr" />
            <span className="px-2 para">or</span>
            <hr className="flex-grow-1 line-hr" />
          </div>

          <div className="mb-3">
            <label className="form-label">Email ID:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email id"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-end">
            <Link to="#" style={{ color: 'rgba(0, 0, 0, 0.479)' }}>
              Forgot your password?
            </Link>
          </div>

          {error && <p className="text-danger text-center mt-2">{error}</p>}

          <button type="submit" className="form-control btn btn-danger text-light my-4" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="text-center">
            <span>
              New here?{' '}
              <Link to="/signup" style={{ color: 'red' }}>
                Sign-up
              </Link>
            </span>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
  