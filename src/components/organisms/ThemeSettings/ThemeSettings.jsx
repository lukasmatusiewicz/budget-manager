import { useSelector, useDispatch } from 'react-redux';
import { selectThemeMode, setTheme } from '../../../store/slices/themeSlice.js';
import Icon from '../../atoms/Icon/Icon.jsx';
import './ThemeSettings.css';

const ThemeSettings = () => {
  const currentMode = useSelector(selectThemeMode);
  const dispatch = useDispatch();

  const themes = [
    { mode: 'light', label: 'Light', icon: 'sun-icon' },
    { mode: 'dark', label: 'Dark', icon: 'moon-icon' },
  ];

  return (
    <div className="theme-settings">
      <h3>Appearance</h3>
      <p className="settings-description">Customize how Budget Manager looks on your device.</p>
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.mode}
            className={`theme-option ${currentMode === theme.mode ? 'active' : ''}`}
            onClick={() => dispatch(setTheme(theme.mode))}
          >
            <Icon name={theme.icon} className="theme-icon" />
            <span>{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSettings;
