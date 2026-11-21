import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../../components/organisms/LoginForm/LoginForm.jsx';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegistering ? t('auth.create_account') : t('auth.login_title')}</h2>
        <LoginForm onToggleMode={(mode) => setIsRegistering(mode)} />
      </div>
    </div>
  );
};

export default Login;
