import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AppFooter.css';

const AppFooter = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/legal#impressum">{t('legal.impressum_title')}</Link>
          <Link to="/legal#agb">{t('legal.agb_title')}</Link>
          <a href="/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
        </div>
        <p className="copyright">
          © {currentYear} Lukas Matusiewicz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
