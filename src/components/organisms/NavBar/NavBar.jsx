import { NavLink } from 'react-router-dom';
import Icon from '../../atoms/Icon/Icon.jsx';
import './NavBar.css';

const NavBar = ({ onLogout }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'chart-icon' },
    { name: 'Transactions', path: '/transactions', icon: 'wallet-icon' },
    { name: 'Reports', path: '/reports', icon: 'reports-icon' },
    { name: 'Settings', path: '/settings', icon: 'settings-icon' },
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
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
