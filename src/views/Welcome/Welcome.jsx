import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { completeWelcome } from '../../store/slices/authSlice.js';
import Button from '../../components/atoms/Button/Button.jsx';
import './Welcome.css';

const Welcome = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = () => {
    dispatch(completeWelcome());
    navigate('/');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>{t('welcome.title')}</h1>
        <p className="welcome-description">
          {t('welcome.description')}
        </p>
        <div className="welcome-features">
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <p>{t('welcome.feature_1')}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏷️</span>
            <p>{t('welcome.feature_2')}</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <p>{t('welcome.feature_3')}</p>
          </div>
        </div>
        <Button onClick={handleStart} variant="primary" className="start-button">
          {t('welcome.button')}
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
