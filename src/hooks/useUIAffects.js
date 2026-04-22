import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeMode, selectAccentColor } from '../store/slices/themeSlice.js';
import { selectAccessibility } from '../store/slices/accessibilitySlice.js';

export const useUIAffects = () => {
  const themeMode = useSelector(selectThemeMode);
  const accentColor = useSelector(selectAccentColor);
  const accessibility = useSelector(selectAccessibility);

  useEffect(() => {
    const root = document.documentElement;

    // Theme Mode
    root.classList.remove('light-theme', 'dark-theme');
    if (themeMode === 'light') {
      root.classList.add('light-theme');
    } else if (themeMode === 'dark') {
      root.classList.add('dark-theme');
    }

    // Accent Color
    if (!accessibility.highContrast) {
      root.style.setProperty('--accent', accentColor);
      root.style.setProperty('--accent-bg', `${accentColor}26`); // 15% opacity
      root.style.setProperty('--accent-border', `${accentColor}80`); // 50% opacity
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-bg');
      root.style.removeProperty('--accent-border');
    }

    // Accessibility
    const { highContrast, reducedMotion, fontSize } = accessibility;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${fontSize}`);
  }, [themeMode, accentColor, accessibility]);
};
