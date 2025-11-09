import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../auth/AuthAPI";

// --- Thunks ---

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const response = await api.register(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const response = await api.login(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Refresh access token
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await api.refresh();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Token refresh failed"
      );
    }
  }
);

// Fetch user profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.accessToken;
    if (!token) return thunkAPI.rejectWithValue("No access token found");
    try {
      const response = await api.getProfile(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// --- Initial State ---
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
  message: null,
};

// --- Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    logoutLocal(state) {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- REGISTER ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "User registered successfully!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- LOGIN ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.accessToken = action.payload.accessToken || action.payload.token;
        state.message = action.payload.message || "Login successful!";
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("accessToken", state.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- REFRESH TOKEN ---
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.message = "Token refreshed successfully!";
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- FETCH PROFILE ---
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAccessToken, logoutLocal, clearMessage, clearError } = authSlice.actions;
export default authSlice.reducer;
