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
    if (onToggleMode) onToggleMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Update Firebase profile with username
        if (username) {
          await firebaseUpdateProfile(userCredential.user, { displayName: username });
        }
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || username || 'User'
      };

      dispatch(login(userData));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error-message">{error}</div>}
      
      {isRegistering && (
        <FormField
          label={t('auth.username')}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          required
        />
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
