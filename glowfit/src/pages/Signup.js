
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    role: 'user',        // default role
    plan: '',            // subscription plan
  });

  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', form);
      
      // Store the token and user data (optional but good practice)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Check the user's role and redirect accordingly
      if (response.data.user.role === 'admin') {
        navigate('/admin-dashboard');
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
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: 0,
        margin: 0
      }}
    >
      {/* Top Bar */}
      <div className="row a2 p-2">
        <div className="col-4">
          <Link className="navbar-brand text-light" to="/">
            GlowFit
          </Link>
        </div>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <fieldset
          className="border border-4 p-4 bg-light mt-3"
          style={{ borderRadius: 15, width: '100%', maxWidth: 400 }}
        >
          <h4 className="text-center mb-1">Create Your Account</h4>
          <p className="text-center text-muted">Join us and start your journey</p>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact:</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              placeholder="Enter contact number"
              value={form.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label">Role:</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Subscription Plan */}
          <div className="mb-3">
            <label className="form-label">Subscription Plan:</label>
            <select
              className="form-select"
              name="plan"
              value={form.plan}
              onChange={handleChange}
            >
              <option value="">Select Plan</option>
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          {/* Submit */}
          <div className="mb-3">
            <button type="submit" className="form-control btn btn-danger" style={{ borderRadius: 15 }}>
              Register
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <span>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'red' }}>
                Log in
              </Link>
            </span>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;










