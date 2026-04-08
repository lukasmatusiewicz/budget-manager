import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { vi } from 'vitest';
import AccessibilitySettings from './AccessibilitySettings.jsx';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe('AccessibilitySettings', () => {
  const dispatchMock = vi.fn();
  
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium'
    });
    vi.clearAllMocks();
  });

  it('renders settings groups and labels', () => {
    render(<AccessibilitySettings />);
    expect(screen.getByText('settings.accessibility')).toBeInTheDocument();
    expect(screen.getByText('settings.high_contrast')).toBeInTheDocument();
    expect(screen.getByText('settings.font_size')).toBeInTheDocument();
  });

  it('dispatches toggleHighContrast when checkbox changes', () => {
    render(<AccessibilitySettings />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('dispatches setFontSize when a font option is clicked', () => {
    render(<AccessibilitySettings />);
    const largeBtn = screen.getByText('settings.large');
    fireEvent.click(largeBtn);
    expect(dispatchMock).toHaveBeenCalled();
  });
});
