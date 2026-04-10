import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  User,
  getUserData,
  saveUserData,
  removeUserData,
  getCurrentUser,
  updateProfile as updateProfileApi,
  uploadProfilePhoto,
  logout as logoutApi,
} from '../../services/authService';

interface UserState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunks
export const loadUser = createAsyncThunk('user/loadUser', async (_, {rejectWithValue}) => {
  try {
    // First try to load from local storage
    const localUser = await getUserData();
    if (localUser) {
      return localUser;
    }
    return null;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to load user');
  }
});

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, {rejectWithValue}) => {
    try {
      const user = await getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch profile');
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: Partial<User>, {rejectWithValue}) => {
    try {
      const user = await updateProfileApi(data);
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update profile');
    }
  },
);

export const uploadUserPhoto = createAsyncThunk(
  'user/uploadPhoto',
  async (
    data: {uri: string; fileName?: string | null; type?: string | null},
    {rejectWithValue},
  ) => {
    try {
      const user = await uploadProfilePhoto(data);
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to upload photo');
    }
  },
);

export const logoutUser = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
  try {
    await logoutApi();
    await removeUserData();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to logout');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      // Also save to local storage
      saveUserData(action.payload);
    },
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      removeUserData();
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Load user
      .addCase(loadUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch profile
      .addCase(fetchUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update profile
      .addCase(updateUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Upload photo
      .addCase(uploadUserPhoto.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        // Still clear user on failed logout
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const {setUser, clearUser, setError, clearError} = userSlice.actions;

export default userSlice.reducer;
