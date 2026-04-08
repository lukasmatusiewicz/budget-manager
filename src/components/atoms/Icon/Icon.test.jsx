import { render } from '@testing-library/react';
import Icon from './Icon.jsx';

describe('Icon', () => {
  it('renders correctly with given name', () => {
    const { container } = render(<Icon name="test-icon" />);
    const useElement = container.querySelector('use');
    expect(useElement).toHaveAttribute('href', '/icons.svg#test-icon');
  });

  it('applies additional className if provided', () => {
    const { container } = render(<Icon name="test-icon" className="extra-class" />);
    expect(container.firstChild).toHaveClass('extra-class');
  });

  it('has default icon class', () => {
    const { container } = render(<Icon name="test-icon" />);
    expect(container.firstChild).toHaveClass('icon');
  });
});
