import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectThemeMode } from '../store/slices/themeSlice.js';
import { selectAccessibility } from '../store/slices/accessibilitySlice.js';

export const useUIAffects = () => {
  const themeMode = useSelector(selectThemeMode);
  const accessibility = useSelector(selectAccessibility);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light-theme', 'dark-theme');
    if (themeMode === 'light') {
      root.classList.add('light-theme');
    } else if (themeMode === 'dark') {
      root.classList.add('dark-theme');
    }
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
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
  }, [accessibility]);
};
