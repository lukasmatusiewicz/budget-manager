import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAccessibility, 
  toggleHighContrast, 
  toggleReducedMotion, 
  setFontSize 
} from '../../../store/slices/accessibilitySlice.js';
import './AccessibilitySettings.css';

const AccessibilitySettings = () => {
  const { highContrast, reducedMotion, fontSize } = useSelector(selectAccessibility);
  const dispatch = useDispatch();

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="accessibility-settings">
      <h3>Accessibility</h3>
      <p className="settings-description">Adjust settings to make Budget Manager easier to use.</p>
      
      <div className="settings-group">
        <label className="settings-item">
          <div className="settings-info">
            <span className="settings-label">High Contrast</span>
            <span className="settings-hint">Increase color contrast for better readability.</span>
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
            <span className="settings-label">Reduced Motion</span>
            <span className="settings-hint">Minimize animations and transitions.</span>
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
        <span className="settings-label">Font Size</span>
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
