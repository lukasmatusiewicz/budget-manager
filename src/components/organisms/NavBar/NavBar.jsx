import { NavLink } from 'react-router-dom';
import Icon from '../../atoms/Icon/Icon';
import './NavBar.css';

const NavBar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: 'chart-icon' },
    { name: 'Transactions', path: '/transactions', icon: 'wallet-icon' },
    { name: 'Reports', path: '/reports', icon: 'piggy-bank-icon' },
    { name: 'Settings', path: '/settings', icon: 'expense-icon' }, // Using expense icon as a temporary placeholder for settings
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
      </ul>
    </nav>
  );
};

export default NavBar;
