import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('renders input with placeholder', () => {
  render(<Input type="text" placeholder="Enter text" value="" onChange={() => {}} />);
  expect(screen.getByPlaceholderText(/Enter text/i)).toBeInTheDocument();
});

test('calls onChange when input value changes', () => {
  const handleChange = jest.fn();
  render(<Input type="text" placeholder="Enter text" value="" onChange={handleChange} />);
  fireEvent.change(screen.getByPlaceholderText(/Enter text/i), { target: { value: 'New Value' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
