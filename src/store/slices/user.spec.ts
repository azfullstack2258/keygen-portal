import userReducer, { setToken, setProfile, logout, fetchUser, login } from './user';
import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../store';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import apiClient from '../../lib/api/apiClient';
import axios from 'axios';

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface UserState {
  token: string;
  profile: {
    firstName: string;
  } | null;
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
  error: string | null;
}

const initialState: UserState = {
  token: '',
  profile: null,
  error: null,
};

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const createMockStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: { user: persistedReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: {} } }),
    preloadedState: initialState,
  });
};

describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setToken', () => {
    const actual = userReducer(initialState, setToken('mockToken'));
    expect(actual.token).toEqual('mockToken');
  });

  it('should handle setProfile', () => {
    const actual = userReducer(initialState, setProfile({ firstName: 'Elliot' }));
    expect(actual.profile).toEqual({ firstName: 'Elliot' });
  });

  it('should handle logout', () => {
    const state = {
      token: 'mockToken',
      profile: { firstName: 'Elliot' },
      error: null,
    };
    const actual = userReducer(state, logout());
    expect(actual).toEqual(initialState);
  });

  it('should handle fetchUser', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: {
          attributes: {
            firstName: 'Elliot',
          },
        },
      },
    });

    const store = createMockStore({ user: { ...initialState, token: 'mockToken', _persist: { version: -1, rehydrated: true } } });

    await store.dispatch(fetchUser() as unknown as AnyAction);

    const state = store.getState().user as UserState;
    console.log('State after fetchUser:', state); // Debugging line
    expect(state.profile).toEqual({ firstName: 'Elliot' });
  });

  it('should handle fetchUser failure', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: {
        data: {
          errors: [
            {
              detail: 'Failed to fetch user',
            },
          ],
        },
      },
    });

    const store = createMockStore({ user: { ...initialState, token: 'mockToken', _persist: { version: -1, rehydrated: true } } });

    await store.dispatch(fetchUser() as unknown as AnyAction);

    const state = store.getState().user as UserState;
    console.log('State after fetchUser failure:', state); // Debugging line
    expect(state.token).toEqual('');
    expect(state.profile).toBeNull();
  });

  it('should handle login', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          attributes: {
            token: 'mockToken',
          },
        },
      },
    });

    const store = createMockStore({ user: {...initialState,_persist: { version: -1, rehydrated: true }} });

    await store.dispatch(login({ email: 'test@example.com', password: 'password' }) as unknown as AnyAction);

    const state = store.getState().user as UserState;
    expect(state.token).toEqual('mockToken');
    expect(state.error).toBeNull();
  });

  it('should handle login failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: {
          errors: [
            {
              detail: 'Login failed',
            },
          ],
        },
      },
    });

    const store = createMockStore({ user: {...initialState,_persist: { version: -1, rehydrated: true }} });

    await store.dispatch(login({ email: 'test@example.com', password: 'wrongpassword' }) as unknown as AnyAction);

    const state = store.getState().user as UserState;
    expect(state.token).toEqual('');
    expect(state.error).toEqual('Login failed');
  });
});
