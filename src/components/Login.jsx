import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8082/api/auth/login', formData);
        
        console.log('Login Successful:', response.data); // Logs token and user details

        if (response.data) {
          // Extract relevant data
          const { userId,username, token } = response.data;
  
          // Store in localStorage
          localStorage.setItem("userId",userId);
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          localStorage.setItem("user", "authenticated"); // Mock authentication

          // Redirect to the original page or fallback to home
          console.log(location.state?.from?.pathname );
          const redirectTo = location.state?.from?.pathname || "/dashboard"; 
          navigate(redirectTo, { replace: true });
        // navigate("/dashboard");
        }

      } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        setApiError(error.response?.data?.message || 'Login failed. Please try again.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login with your Credentials.</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {apiError && <p className="error-message">{apiError}</p>}

          <button type="submit" className="login-button">
            Sign in
          </button>

          <p className="signup-prompt">
            New user? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
