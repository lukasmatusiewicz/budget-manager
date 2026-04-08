import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from './Modal.jsx';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Test Modal',
    message: 'Test Message',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    const { container } = render(<Modal {...defaultProps} />);
    fireEvent.click(container.querySelector('.modal-overlay'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', () => {
    render(<Modal {...defaultProps} />);
    fireEvent.click(screen.getByText('Test Modal'));
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });
});
