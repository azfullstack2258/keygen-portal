import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button onClick={() => {}}>Click Me</Button>);
  expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
});

test('calls onClick when button is clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  fireEvent.click(screen.getByText(/Click Me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
