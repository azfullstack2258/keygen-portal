import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { RootState, AppDispatch } from './store';

// Mock fetch for user data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: { attributes: { firstName: 'Elliot' } }
    })
  })
) as jest.Mock;

// Define the middleware type
type DispatchExts = ThunkMiddleware<RootState, any>;

// Configure mock store with the correct types
const mockStore = configureMockStore<RootState, DispatchExts>([thunk]);

test('renders login page by default', () => {
  const store = mockStore({ user: { token: '', profile: null } });

  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
});

test('renders home page when token is present', async () => {
  const store = mockStore({
    user: { token: 'mockToken', profile: null }
  });

  // Mock the dispatch function
  store.dispatch = jest.fn(store.dispatch);

  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  // Simulate the fetchUser action being called and profile being updated
  await waitFor(() => {
    store.dispatch({
      type: 'user/fetchUser/fulfilled',
      payload: 'Elliot'
    });
  });

  // Wait for the DOM to update with the new state
  await waitFor(() => {
    expect(screen.getByText(/Hello, Elliot!/i)).toBeInTheDocument();
  });
});
