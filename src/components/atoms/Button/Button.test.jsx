import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Button from './Button.jsx';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant class', () => {
    const { container } = render(<Button variant="secondary">Button</Button>);
    expect(container.firstChild).toHaveClass('btn-secondary');
  });

  it('applies additional className if provided', () => {
    const { container } = render(<Button className="extra-class">Button</Button>);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('has the correct type attribute', () => {
    const { container } = render(<Button type="submit">Submit</Button>);
    expect(container.firstChild).toHaveAttribute('type', 'submit');
  });
});
