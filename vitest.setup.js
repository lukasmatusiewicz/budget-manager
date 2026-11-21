import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global mocks
if (typeof globalThis.localStorage === 'undefined') {
  let storage = {};
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (key) => (key in storage ? storage[key] : null),
      setItem: (key, value) => { storage[key] = String(value); },
      removeItem: (key) => { delete storage[key]; },
      clear: () => { storage = {}; },
    },
    configurable: true,
    writable: true,
  });
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));
