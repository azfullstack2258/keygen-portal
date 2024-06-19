import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import Login from './Login';
import { RootState, AppDispatch } from '../../store';
import { login } from '../../store/slices/user';

jest.mock('../../store/slices/user', () => ({
  ...jest.requireActual('../../store/slices/user'),
  login: jest.fn(),
}));

const mockLogin = login as jest.MockedFunction<typeof login>;

(global.fetch as jest.Mock) = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: { attributes: { firstName: 'Elliot' } },
      }),
  })
);

type DispatchExts = ThunkMiddleware<RootState, any>;

const mockStore = configureMockStore<RootState, AppDispatch>([thunk as DispatchExts]);

test('renders login page and handles form submission', async () => {
  const store = mockStore({
    user: { token: '', profile: null, error: null, _persist: { version: -1, rehydrated: true } },
  });

  mockLogin.mockReturnValue({
    type: 'auth/login',
    payload: {
      email: 'elliot@keygen.example',
      password: 'a334_361c721',
    },
  } as any);

  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  expect(screen.getByRole('heading', { name: /Welcome back/i })).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: 'elliot@keygen.example' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'a334_361c721' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'elliot@keygen.example',
      password: 'a334_361c721',
    });
  });

  await waitFor(() => {
    expect(store.getActions()).toContainEqual({
      type: 'auth/login/fulfilled',
      payload: 'mockToken',
    });
  });
});

test('displays error message on login failure', async () => {
  const store = mockStore({
    user: { token: '', profile: null, error: 'Failed to login', _persist: { version: -1, rehydrated: true } },
  });

  mockLogin.mockReturnValue({
    type: 'auth/login',
    payload: {
      email: 'elliot@keygen.example',
      password: 'wrongpassword',
    },
  } as any);

  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: 'elliot@keygen.example' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'wrongpassword' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'elliot@keygen.example',
      password: 'wrongpassword',
    });
  });

  await waitFor(() => {
    expect(screen.getByText(/Failed to login/i)).toBeInTheDocument();
  });
});
