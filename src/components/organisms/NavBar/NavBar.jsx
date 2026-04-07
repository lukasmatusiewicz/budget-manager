import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Icon from '../../atoms/Icon/Icon.jsx';
import './NavBar.css';

const NavBar = ({ onLogout }) => {
  const { t } = useTranslation();
  const navItems = [
    { name: t('nav.dashboard'), path: '/', icon: 'chart-icon' },
    { name: t('nav.transactions'), path: '/transactions', icon: 'wallet-icon' },
    { name: t('nav.reports'), path: '/reports', icon: 'reports-icon' },
    { name: t('nav.settings'), path: '/settings', icon: 'settings-icon' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <NavLink 
              to={item.path} 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.path === '/'}
            >
              <Icon name={item.icon} className="nav-icon" />
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
        <li className="nav-item logout">
          <button onClick={onLogout} className="logout-button">
            <Icon name="logout-icon" className="nav-icon" />
            <span>{t('common.logout')}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
