import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LanguageSettings from './LanguageSettings.jsx';

const mockChangeLanguage = vi.fn();

// Override the global mock to test i18n functions
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: mockChangeLanguage,
      language: 'en'
    }
  }),
}));

describe('LanguageSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders language options', () => {
    render(<LanguageSettings />);
    expect(screen.getByText('settings.language')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Polski')).toBeInTheDocument();
  });

  it('calls changeLanguage when a button is clicked', () => {
    render(<LanguageSettings />);
    const plBtn = screen.getByText('Polski');
    fireEvent.click(plBtn);
    expect(mockChangeLanguage).toHaveBeenCalledWith('pl');
  });
});
