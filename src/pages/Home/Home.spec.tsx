import React from 'react';
import { AnyAction } from 'redux';
import { render, screen, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { RootState } from '../../store';

// Mock fetch for user data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      data: { attributes: { firstName: 'Elliot' } }
    })
  })
) as jest.Mock;

// Define the middleware type
type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middlewares);

test('renders loading state', () => {
  const store = mockStore({ user: { token: '', profile: null } });

  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders user greeting', async () => {
  const store = mockStore({
    user: { token: 'mockToken', profile: null }
  });

  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );

  // Simulate the fetchUser action being fulfilled
  store.dispatch({
    type: 'user/fetchUser/fulfilled',
    payload: 'Elliot'
  });

  // Wait for the DOM to update with the new state
  await waitFor(() => {
    expect(screen.getByText(/Hello, Elliot!/i)).toBeInTheDocument();
  });
});
