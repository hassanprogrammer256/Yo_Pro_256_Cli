import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/axios'


export const fetchStudentDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const userID = localStorage.getItem('user_id')
    const response = await api.get(`/users/student/dashboard/?student_id=${userID}`)
    return response.data
  }
)

const studentdashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      enrolledCourses: 0,
      avgProgress: 0,
      completedCourses: 0,
      overallGrade: 'A-',
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboardStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStudentDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload.stats
      })
      .addCase(fetchStudentDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default studentdashboardSlice.reducer