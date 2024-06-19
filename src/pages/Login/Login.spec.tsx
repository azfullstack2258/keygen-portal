import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

// Mock fetch for testing purposes
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: {},
      errors: [{ detail: "Login failed" }]
    })
  })
) as jest.Mock;

test('renders login page', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
});

test('handles login failure', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'elliot@keygen.example' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'a334_361c721' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
  });
});
