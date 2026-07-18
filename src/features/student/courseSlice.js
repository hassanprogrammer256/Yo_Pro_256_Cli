import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/axios'

const userId = localStorage.getItem("user_id")
export const fetchEnrolledCourses = createAsyncThunk(
  'courses/fetchEnrolled',
  async () => {
    const response = await api.get(`/courses/get_courses_enrolled/?student_id=${userId}`)
    return response.data
  }
)

export const fetchCourseDetails = createAsyncThunk(
  'courses/fetchDetails',
  async (courseId) => {
    const response = await api.get(`/courses/${courseId}`)
    return response.data
  }
)

export const updateCourseProgress = createAsyncThunk(
  'courses/updateProgress',
  async ({ courseId, progress }) => {
    const response = await api.patch(`/courses/${courseId}/progress`, { progress })
    return response.data
  }
)

const studentcourseSlice = createSlice({
  name: 'courses',
  initialState: {
    enrolledCourses: [],
    currentCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false
        state.enrolledCourses = action.payload.data
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false
        state.currentCourse = action.payload
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearCurrentCourse } = studentcourseSlice.actions
export default studentcourseSlice.reducer