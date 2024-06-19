import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';

test('renders Input component with correct props', () => {
  render(
    <Input
      id="email"
      name="email"
      type="email"
      label="Email"
      placeholder="you@example.com"
      required
    />
  );

  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
});

test('forwards ref correctly', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(
    <Input
      id="email"
      name="email"
      type="email"
      label="Email"
      placeholder="you@example.com"
      required
      ref={ref}
    />
  );

  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});
