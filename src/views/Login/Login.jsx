import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Specific mock login logic
    if (email === 'admin@example.com' && password === 'password123') {
      dispatch(login());
      navigate('/');
    } else {
      alert('Invalid credentials. Use admin@example.com / password123');
    }
  };

  const fillMockData = () => {
    setEmail('admin@example.com');
    setPassword('password123');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Budget Manager</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <button type="button" onClick={fillMockData} className="mock-data-button">
            Fill with Mock Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
