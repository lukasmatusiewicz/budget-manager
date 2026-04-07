import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeWelcome } from '../../store/slices/authSlice.js';
import Button from '../../components/atoms/Button/Button.jsx';
import './Welcome.css';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    dispatch(completeWelcome());
    navigate('/');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to Budget Manager!</h1>
        <p className="welcome-description">
          Take control of your finances with our simple and effective budget tracking tool.
        </p>
        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <p>Track your daily expenses and income</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏷️</span>
            <p>Categorize transactions for better insights</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <p>Access your data from anywhere</p>
          </div>
        </div>
        <Button onClick={handleStart} variant="primary" className="start-button">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
