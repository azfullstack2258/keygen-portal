import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosHeaders } from 'axios';
import apiClient from '../../lib/api/apiClient';
import { RootState } from '../store';
import type { TokensResponse, AccountInfoResponse } from '../../typings/api';

interface UserState {
  token: string;
  profile: {
    firstName: string;
  } | null;
  error: string | null;
}

const initialState: UserState = {
  token: '',
  profile: null,
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const creds = btoa(`${email}:${password}`);
      const { data: res } = await apiClient.post<TokensResponse>('/tokens', null, {
        headers: new AxiosHeaders({
          Authorization: `Basic ${creds}`,
          Accept: 'application/json',
        }),
      });
      localStorage.setItem('token', res.data.attributes.token);
      return res.data.attributes.token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.errors?.[0]?.detail || 'Login failed');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    try {
      const { data: res } = await apiClient.get<AccountInfoResponse>('/me', {
        headers: new AxiosHeaders({
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        }),
      });
      return res.data.attributes.firstName;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.errors?.[0]?.detail || 'Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setProfile(state, action: PayloadAction<{ firstName: string }>) {
      state.profile = action.payload;
    },
    logout(state) {
      state.token = '';
      state.profile = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.profile = { firstName: action.payload };
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setToken, setProfile, logout } = userSlice.actions;
export default userSlice.reducer;
