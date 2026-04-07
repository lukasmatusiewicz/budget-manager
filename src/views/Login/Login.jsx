import { useState } from 'react';
import LoginForm from '../../components/organisms/LoginForm/LoginForm.jsx';
import './Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegistering ? 'Create Account' : 'Login to Budget Manager'}</h2>
        <LoginForm onToggleMode={(mode) => setIsRegistering(mode)} />
      </div>
    </div>
  );
};

export default Login;
