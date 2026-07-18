// store/slices/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async () => {
    const response = await api.get('/admin/stats')
    return response.data
  }
)

export const fetchRecentActivities = createAsyncThunk(
  'admin/fetchActivities',
  async () => {
    const response = await api.get('/admin/activities')
    return response.data
  }
)

export const fetchAdminAnnouncements = createAsyncThunk(
  'admin/fetchAnnouncements',
  async () => {
    const response = await api.get('/admin/announcements')
    return response.data
  }
)

export const createAnnouncement = createAsyncThunk(
  'admin/createAnnouncement',
  async (announcementData) => {
    const response = await api.post('/admin/announcements', announcementData)
    return response.data
  }
)

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (filters) => {
    const response = await api.get('/admin/users', { params: filters })
    return response.data
  }
)

export const updateUserStatus = createAsyncThunk(
  'admin/updateUserStatus',
  async ({ userId, status }) => {
    const response = await api.patch(`/admin/users/${userId}/status`, { status })
    return response.data
  }
)

export const fetchRevenueData = createAsyncThunk(
  'admin/fetchRevenue',
  async (period) => {
    const response = await api.get('/admin/revenue', { params: { period } })
    return response.data
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {
      totalUsers: 0,
      totalStudents: 0,
      totalInstructors: 0,
      totalCourses: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      activeUsers: 0,
      completionRate: 0,
      averageRating: 0,
      pendingPayments: 0
    },
    recentActivities: [],
    announcements: [],
    users: [],
    revenueData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false
        state.stats = action.payload
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.recentActivities = action.payload
      })
      .addCase(fetchAdminAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.announcements.unshift(action.payload)
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.revenueData = action.payload
      })
  },
})

export default adminSlice.reducer