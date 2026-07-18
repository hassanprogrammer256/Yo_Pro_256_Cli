import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerstudent, user_profile } from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      if (response.access && response.refresh) {
        return response;
      }
      return rejectWithValue({ "Error": "Invalid response from server" });
    } catch (error) {
      return rejectWithValue({ "Error": error.message || "Invalid Credentials" });
    }
  }
);

export const registerStudent = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      return await registerstudent(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const user_data = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const data = await user_profile();
      if (!data) {
        return rejectWithValue("No data received");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access: localStorage.getItem("access"),
    loading: false,
    error: null, 
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.access = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.Error || "Login failed";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.error = null;
        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      
      // Register cases
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      
      .addCase(user_data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(user_data.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user_id",action.payload.id)
        state.error = null;
      })
      .addCase(user_data.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Failed to fetch user data";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;