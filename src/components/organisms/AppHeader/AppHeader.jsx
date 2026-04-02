import Icon from '../../atoms/Icon/Icon.jsx';
import './AppHeader.css';

const AppHeader = ({ title }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <Icon name="wallet-icon" className="header-logo" />
        </div>
        <div className="title-container">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="header-decoration"></div>
    </header>
  );
};

export default AppHeader;
