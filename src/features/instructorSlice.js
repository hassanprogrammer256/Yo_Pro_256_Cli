// store/slices/instructorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchInstructorCourses = createAsyncThunk(
  'instructor/fetchCourses',
  async () => {
    const response = await api.get('/instructor/courses')
    return response.data
  }
)

export const fetchScheduledLessons = createAsyncThunk(
  'instructor/fetchLessons',
  async () => {
    const response = await api.get('/instructor/lessons')
    return response.data
  }
)

export const createSchedule = createAsyncThunk(
  'instructor/createSchedule',
  async (scheduleData) => {
    const response = await api.post('/instructor/lessons', scheduleData)
    return response.data
  }
)

export const fetchSubmissions = createAsyncThunk(
  'instructor/fetchSubmissions',
  async () => {
    const response = await api.get('/instructor/submissions')
    return response.data
  }
)

export const gradeSubmission = createAsyncThunk(
  'instructor/gradeSubmission',
  async ({ submissionId, grade }) => {
    const response = await api.patch(`/instructor/submissions/${submissionId}`, { grade })
    return response.data
  }
)

export const fetchInstructorNotifications = createAsyncThunk(
  'instructor/fetchNotifications',
  async () => {
    const response = await api.get('/instructor/notifications')
    return response.data
  }
)

export const fetchInstructorAnnouncements = createAsyncThunk(
  'instructor/fetchAnnouncements',
  async () => {
    const response = await api.get('/instructor/announcements')
    return response.data
  }
)

export const updateLesson = createAsyncThunk(
  'instructor/updateLesson',
  async ({ lessonId, data }) => {
    const response = await api.patch(`/instructor/lessons/${lessonId}`, data)
    return response.data
  }
)

export const deleteLesson = createAsyncThunk(
  'instructor/deleteLesson',
  async (lessonId) => {
    await api.delete(`/instructor/lessons/${lessonId}`)
    return lessonId
  }
)

const instructorSlice = createSlice({
  name: 'instructor',
  initialState: {
    courses: [],
    scheduledLessons: [],
    submissions: [],
    notifications: [],
    announcements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchScheduledLessons.fulfilled, (state, action) => {
        state.scheduledLessons = action.payload
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.scheduledLessons.push(action.payload)
      })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload
      })
      .addCase(gradeSubmission.fulfilled, (state, action) => {
        const index = state.submissions.findIndex(s => s.id === action.payload.id)
        if (index !== -1) {
          state.submissions[index] = action.payload
        }
      })
      .addCase(fetchInstructorNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload
      })
      .addCase(fetchInstructorAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        const index = state.scheduledLessons.findIndex(l => l.id === action.payload.id)
        if (index !== -1) {
          state.scheduledLessons[index] = action.payload
        }
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.scheduledLessons = state.scheduledLessons.filter(l => l.id !== action.payload)
      })
  },
})

export default instructorSlice.reducer