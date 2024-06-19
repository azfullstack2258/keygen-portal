import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../lib/api/apiClient';
import { RootState } from '../store';
import { AxiosHeaders } from 'axios';
import {
  LicenseWithEntitlements,
  LicenseEntitlementsResponse,
  LicensesResponse,
} from '../../typings/api';

interface LicensesState {
  licenses: LicenseWithEntitlements[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LicensesState = {
  licenses: null,
  loading: false,
  error: null,
};

export const fetchLicenses = createAsyncThunk(
  'licenses/fetchLicenses',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    try {
      const { data: licensesData } = await apiClient.get<LicensesResponse>('/licenses', {
        headers: new AxiosHeaders({
          Authorization: `Bearer ${token}`,
        }),
      });
      const licenses = licensesData.data;

      const licensesWithEntitlements = await Promise.all(
        licenses.map(async (license: any) => {
          const { data: entitlementsData } =
            await apiClient.get<LicenseEntitlementsResponse>(
              `/licenses/${license.id}/entitlements`,
              {
                headers: new AxiosHeaders({
                  Authorization: `Bearer ${token}`,
                }),
              }
            );
          return { ...license, entitlements: entitlementsData.data };
        })
      );

      return licensesWithEntitlements;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch licenses.');
    }
  }
);

const licensesSlice = createSlice({
  name: 'licenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLicenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLicenses.fulfilled, (state, action: PayloadAction<LicenseWithEntitlements[]>) => {
        state.licenses = action.payload;
        state.loading = false;
      })
      .addCase(fetchLicenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default licensesSlice.reducer;
