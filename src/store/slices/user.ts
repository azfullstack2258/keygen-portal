import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  token: string | null;
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
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.keygen.sh/v1/accounts/demo/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data.token;
    } catch (error: any) {
      return rejectWithValue('Failed to login');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    try {
      const res = await fetch('https://api.keygen.sh/v1/accounts/demo/me', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      });
      const result = await res.json();
      return result.data.attributes.firstName;
    } catch (error: any) {
      return rejectWithValue(error.message);
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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.profile = { firstName: action.payload };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.token = '';
      state.profile = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  }
});

export const { setToken, setProfile, logout } = userSlice.actions;
export default userSlice.reducer;
