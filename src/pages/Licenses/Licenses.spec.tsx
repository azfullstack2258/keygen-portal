import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import Licenses from './Licenses';
import { RootState, AppDispatch } from '../../store';
import { fetchLicenses } from '../../store/slices/licenses';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

type DispatchExts = ThunkMiddleware<RootState, any>;

const mockStore = configureMockStore<RootState, AppDispatch>([
  thunk as DispatchExts,
]);

describe('Licenses Page', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  it('renders loading state initially', () => {
    const store = mockStore({
      licenses: {
        licenses: null,
        loading: true,
        error: null,
        _persist: { version: -1, rehydrated: true },
      },
      user: {
        token: 'mockToken',
        profile: null,
        error: null,
        _persist: { version: -1, rehydrated: true },
      },
    });

    render(
      <Provider store={store}>
        <Licenses />
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders licenses after fetching', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              id: 'license1',
              attributes: {
                name: 'License 1',
                created: '2023-01-01T00:00:00Z',
                expiry: '2024-01-01T00:00:00Z',
              },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              id: 'entitlement1',
              attributes: {
                name: 'Entitlement 1',
              },
            },
          ],
        },
      });

    const store = mockStore({
      licenses: {
        licenses: null,
        loading: false,
        error: null,
        _persist: { version: -1, rehydrated: true },
      },
      user: {
        token: 'mockToken',
        profile: null,
        error: null,
        _persist: { version: -1, rehydrated: true },
      },
    });

    render(
      <Provider store={store}>
        <Licenses />
      </Provider>
    );

    await store.dispatch(fetchLicenses());

    await waitFor(() => {
      expect(screen.getByText(/License 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Entitlement 1/i)).toBeInTheDocument();
    });
  });

  it('renders error state on fetch failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error('Failed to fetch licenses')
    );

    const store = mockStore({
      licenses: {
        licenses: null,
        loading: false,
        _persist: { version: -1, rehydrated: true },
        error: 'Failed to fetch licenses.',
      },
      user: {
        token: 'mockToken',
        profile: null,
        error: null,
        _persist: { version: -1, rehydrated: true },
      },
    });

    render(
      <Provider store={store}>
        <Licenses />
      </Provider>
    );

    await store.dispatch(fetchLicenses());

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch licenses./i)
      ).toBeInTheDocument();
    });
  });
});
