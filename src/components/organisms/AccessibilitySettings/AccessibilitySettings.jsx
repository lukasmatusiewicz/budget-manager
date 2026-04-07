import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  selectAccessibility, 
  toggleHighContrast, 
  toggleReducedMotion, 
  setFontSize 
} from '../../../store/slices/accessibilitySlice.js';
import './AccessibilitySettings.css';

const AccessibilitySettings = () => {
  const { t } = useTranslation();
  const { highContrast, reducedMotion, fontSize } = useSelector(selectAccessibility);
  const dispatch = useDispatch();

  const fontSizes = [
    { value: 'small', label: t('settings.small') },
    { value: 'medium', label: t('settings.medium') },
    { value: 'large', label: t('settings.large') },
  ];

  return (
    <div className="accessibility-settings">
      <h3>{t('settings.accessibility')}</h3>
      <p className="settings-description">{t('settings.accessibility_desc')}</p>
      
      <div className="settings-group">
        <label className="settings-item">
          <div className="settings-info">
            <span className="settings-label">{t('settings.high_contrast')}</span>
            <span className="settings-hint">{t('settings.high_contrast_desc')}</span>
          </div>
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              checked={highContrast} 
              onChange={() => dispatch(toggleHighContrast())} 
            />
            <span className="slider"></span>
          </div>
        </label>

        <label className="settings-item">
          <div className="settings-info">
            <span className="settings-label">{t('settings.reduced_motion')}</span>
            <span className="settings-hint">{t('settings.reduced_motion_desc')}</span>
          </div>
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              checked={reducedMotion} 
              onChange={() => dispatch(toggleReducedMotion())} 
            />
            <span className="slider"></span>
          </div>
        </label>
      </div>

      <div className="settings-group">
        <span className="settings-label">{t('settings.font_size')}</span>
        <div className="font-options">
          {fontSizes.map((size) => (
            <button
              key={size.value}
              className={`font-option ${fontSize === size.value ? 'active' : ''}`}
              onClick={() => dispatch(setFontSize(size.value))}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
