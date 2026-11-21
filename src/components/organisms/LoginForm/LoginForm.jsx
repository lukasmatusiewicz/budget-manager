import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { auth } from '../../../config/firebase.js';
import { login } from '../../../store/slices/authSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './LoginForm.css';

const AUTH_ERROR_MAP = {
  'auth/invalid-credential': 'auth.error_invalid_credential',
  'auth/wrong-password': 'auth.error_invalid_credential',
  'auth/user-not-found': 'auth.error_user_not_found',
  'auth/email-already-in-use': 'auth.error_email_in_use',
  'auth/weak-password': 'auth.error_weak_password',
  'auth/invalid-email': 'auth.error_invalid_email',
  'auth/too-many-requests': 'auth.error_too_many_requests',
  'auth/network-request-failed': 'auth.error_network',
};

const LoginForm = ({ onToggleMode }) => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModeToggle = () => {
    const newMode = !isRegistering;
    setIsRegistering(newMode);
    setError('');
    if (onToggleMode) onToggleMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      const trimmedUsername = username.trim();
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (trimmedUsername) {
          await firebaseUpdateProfile(userCredential.user, { displayName: trimmedUsername });
        }
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || trimmedUsername || 'User'
      };

      dispatch(login(userData));
      navigate('/');
    } catch (err) {
      const errorKey = AUTH_ERROR_MAP[err?.code] || 'auth.auth_error_generic';
      setError(t(errorKey));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message" role="alert">{error}</div>}
      
      {isRegistering && (
        <div>
          <FormField
            label={t('auth.username')}
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
          />
          <p className="field-hint">{t('auth.display_name_hint')}</p>
        </div>
      )}

      <FormField
        label={t('auth.email')}
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
        required
      />
      <FormField
        label={t('auth.password')}
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />
      
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? t('common.loading') : (isRegistering ? t('auth.create_account') : t('auth.login'))}
      </Button>
      
      <div className="form-footer">
        <p>
          {isRegistering ? t('auth.have_account') : t('auth.no_account')}
          <button 
            type="button" 
            className="toggle-auth-btn"
            onClick={handleModeToggle}
          >
            {isRegistering ? t('auth.login_here') : t('auth.register_here')}
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
