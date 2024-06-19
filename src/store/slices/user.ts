import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  token: string;
  profile: {
    firstName: string;
  } | null;
}

const initialState: UserState = {
  token: '',
  profile: null,
};

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
    } catch (error) {
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
  }
});

export const { setToken, setProfile, logout } = userSlice.actions;
export default userSlice.reducer;
