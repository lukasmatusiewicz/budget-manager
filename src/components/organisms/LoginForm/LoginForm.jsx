import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { auth } from '../../../config/firebase.js';
import { login } from '../../../store/slices/authSlice.js';
import { setInitialBudget } from '../../../store/slices/transactionSlice.js';
import FormField from '../../molecules/FormField/FormField.jsx';
import Button from '../../atoms/Button/Button.jsx';
import './LoginForm.css';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [initialBudget, setBudget] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      dispatch(setInitialBudget(parseFloat(initialBudget) || 0));
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
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
          required
        />
      )}

      <FormField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
        required
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
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
      
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Login')}
      </Button>
      
      <div className="form-footer">
        <p>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button" 
            className="toggle-auth-btn"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
