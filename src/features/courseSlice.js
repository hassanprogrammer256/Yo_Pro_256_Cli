import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllCourses } from "../api"; 

export const all_courses = createAsyncThunk(
  "courses/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AllCourses();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const initialState = {
  courses: [],
  loading: false,
  error: null,
  filteredCourses: [],
  searchTerm: "",
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
      state.filteredCourses = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(all_courses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(all_courses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.filteredCourses = action.payload; 
      })
      .addCase(all_courses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.courses = [];
        state.filteredCourses = [];
      });
  },
});

export const { setSearchTerm, clearCourses, clearError,clearSearchTerm } = courseSlice.actions;
export default courseSlice.reducer;