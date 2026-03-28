import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', response.data.username);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">🔐 Welcome Back!</h2>
        <p className="auth-subtitle">TaskManager — Login</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="auth-input" type="email" name="email"
            placeholder="Email" value={formData.email}
            onChange={handleChange} required />
          <input className="auth-input" type="password" name="password"
            placeholder="Password" value={formData.password}
            onChange={handleChange} required />
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link-text">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;