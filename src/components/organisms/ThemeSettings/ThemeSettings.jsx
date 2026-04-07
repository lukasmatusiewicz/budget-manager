import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectThemeMode, setTheme } from '../../../store/slices/themeSlice.js';
import Icon from '../../atoms/Icon/Icon.jsx';
import './ThemeSettings.css';

const ThemeSettings = () => {
  const { t } = useTranslation();
  const currentMode = useSelector(selectThemeMode);
  const dispatch = useDispatch();

  const themes = [
    { mode: 'light', label: t('settings.light'), icon: 'sun-icon' },
    { mode: 'dark', label: t('settings.dark'), icon: 'moon-icon' },
  ];

  return (
    <div className="theme-settings">
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
  );
};

export default ThemeSettings;
