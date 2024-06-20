import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import axios from 'axios';
import { RootState } from '../store';
import licensesReducer, { fetchLicenses } from './licenses';

// Mock Axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

interface LicensesState {
  licenses: any[] | null;
  loading: boolean;
  error: string | null;
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}

const initialState: LicensesState = {
  licenses: null,
  loading: false,
  error: null,
  _persist: { version: -1, rehydrated: true },
};

const createMockStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: { licenses: licensesReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: {} } }),
    preloadedState: initialState,
  });
};

describe('licenses reducer', () => {
  it('should handle initial state', () => {
    expect(licensesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchLicenses', async () => {
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

    const store = createMockStore({ licenses: initialState });

    await store.dispatch(fetchLicenses() as unknown as AnyAction);

    const state = store.getState().licenses as LicensesState;
    expect(state.licenses).toEqual([
      {
        id: 'license1',
        attributes: {
          name: 'License 1',
          created: '2023-01-01T00:00:00Z',
          expiry: '2024-01-01T00:00:00Z',
        },
        entitlements: [
          {
            id: 'entitlement1',
            attributes: {
              name: 'Entitlement 1',
            },
          },
        ],
      },
    ]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle fetchLicenses failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(
      new Error('Failed to fetch licenses')
    );

    const store = createMockStore({ licenses: initialState });

    await store.dispatch(fetchLicenses() as unknown as AnyAction);

    const state = store.getState().licenses as LicensesState;
    expect(state.licenses).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch licenses.');
  });
});
