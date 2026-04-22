import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import Icon from '../../atoms/Icon/Icon.jsx';
import './AppHeader.css';

const AppHeader = ({ title }) => {
  return (
    <motion.header 
      className="app-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header-glass-overlay"></div>
      
      {/* Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <Link to="/" className="header-link">
        <div className="header-content">
          <motion.div 
            className="logo-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon name="wallet-icon" className="header-logo" />
          </motion.div>
          <div className="title-container">
            <h1>{title}</h1>
          </div>
        </div>
      </Link>
    </motion.header>
  );
};

export default AppHeader;
