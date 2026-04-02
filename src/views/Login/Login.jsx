import LoginForm from '../../components/organisms/LoginForm/LoginForm.jsx';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Budget Manager</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
