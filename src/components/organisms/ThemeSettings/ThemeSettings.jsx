import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectThemeMode, setTheme, selectAccentColor, setAccentColor } from '../../../store/slices/themeSlice.js';
import Icon from '../../atoms/Icon/Icon.jsx';
import './ThemeSettings.css';

const ThemeSettings = () => {
  const { t } = useTranslation();
  const currentMode = useSelector(selectThemeMode);
  const currentAccent = useSelector(selectAccentColor);
  const dispatch = useDispatch();

  const themes = [
    { mode: 'light', label: t('settings.light'), icon: 'sun-icon' },
    { mode: 'dark', label: t('settings.dark'), icon: 'moon-icon' },
  ];

  const presets = [
    { color: '#aa3bff', label: 'Purple' },
    { color: '#3b82f6', label: 'Blue' },
    { color: '#10b981', label: 'Green' },
    { color: '#f59e0b', label: 'Orange' },
    { color: '#ef4444', label: 'Red' },
  ];

  return (
    <div className="theme-settings">
      <div className="setting-group">
        <h3>{t('settings.theme')}</h3>
        <p className="settings-description">{t('settings.appearance_desc')}</p>
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

      <div className="setting-group accent-picker-section">
        <h3>{t('settings.accent_color')}</h3>
        <div className="accent-options">
          {presets.map((preset) => (
            <button
              key={preset.color}
              className={`accent-option ${currentAccent === preset.color ? 'active' : ''}`}
              style={{ '--preset-color': preset.color }}
              onClick={() => dispatch(setAccentColor(preset.color))}
              title={preset.label}
            >
              <div className="color-swatch"></div>
            </button>
          ))}
          <div className="custom-color-picker">
            <input 
              type="color" 
              value={currentAccent} 
              onChange={(e) => dispatch(setAccentColor(e.target.value))}
              title="Custom Color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
