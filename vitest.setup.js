import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Global mocks
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));
