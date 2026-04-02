import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../store/slices/authSlice.js';
import { setInitialBudget } from '../../../store/slices/transactionSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initialBudget, setBudget] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'password123') {
      dispatch(setInitialBudget(parseFloat(initialBudget) || 0));
      dispatch(login());
      navigate('/');
    } else {
      alert('Invalid credentials. Use admin@example.com / password123');
    }
  };

  const fillMockData = () => {
    setEmail('admin@example.com');
    setPassword('password123');
    setBudget('1000');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <FormField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@example.com"
        required
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password123"
        required
      />
      <FormField
        label="Initial Budget"
        type="number"
        name="initialBudget"
        value={initialBudget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="0.00"
        step="0.01"
      />
      <Button type="submit" variant="primary">Login</Button>
      <Button type="button" onClick={fillMockData} variant="outline">
        Fill with Mock Data
      </Button>
    </form>
  );
};

export default LoginForm;
