import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';
import { RootState, AppDispatch } from './store';
import { setToken, fetchUser } from './store/slices/user';
import { AnyAction } from 'redux';

// Mock fetch for user data
global.fetch = jest.fn() as jest.Mock;

// Define the middleware type
type DispatchExts = ThunkMiddleware<RootState, any>;

// Configure mock store with the correct types
const mockStore = configureMockStore<RootState, AppDispatch>([
  thunk as DispatchExts,
]);

test('renders login page by default', () => {
  const store = mockStore({
    user: {
      token: '',
      profile: null,
      error: null,
      _persist: { version: -1, rehydrated: true },
    },
    licenses: {
      licenses: null,
      loading: false,
      error: null,
      _persist: { version: -1, rehydrated: true },
    },
  });

  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  expect(
    screen.getByRole('heading', { name: /Welcome back/i })
  ).toBeInTheDocument();
});

test('renders home page when token is present', async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { attributes: { firstName: 'Elliot' } },
        }),
    })
  );

  const store = mockStore({
    user: {
      token: 'mockToken',
      profile: null,
      error: null,
      _persist: { version: -1, rehydrated: true },
    },
    licenses: {
      licenses: null,
      loading: false,
      error: null,
      _persist: { version: -1, rehydrated: true },
    },
  });

  render(
    <Provider store={store}>
      <Router initialEntries={['/']}>
        <App />
      </Router>
    </Provider>
  );

  // Dispatch setToken action to simulate login
  store.dispatch(setToken('mockToken') as unknown as AnyAction);

  // Mock the fetchUser action being called and profile being updated
  await store.dispatch(fetchUser() as unknown as AnyAction);

  // Wait for the Loading... text to be removed
  await waitFor(() =>
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
  );

  // Wait for the DOM to update with the new state
  await waitFor(
    () => {
      expect(screen.getByText(/Hello, Elliot!/i)).toBeInTheDocument();
    },
    {
      timeout: 5,
    }
  );
});
