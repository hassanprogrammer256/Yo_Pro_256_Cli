import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/axios'


export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async () => {
    const response = await api.get('/notifications')
    return response.data
  }
)

export const fetchAnnouncements = createAsyncThunk(
  'notifications/fetchAnnouncements',
  async () => {
    const response = await api.get('/notifications/announcements')
    return response.data
  }
)

export const markNotificationRead = createAsyncThunk(
  'notifications/markRead',
  async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}/read`)
    return response.data
  }
)

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    announcements: [],
    unreadCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    incrementUnread: (state) => {
      state.unreadCount += 1
    },
    clearUnread: (state) => {
      state.unreadCount = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.notifications = action.payload
        state.unreadCount = action.payload.filter(n => !n.read).length
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.announcements = action.payload
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload.id)
        if (notification) {
          notification.read = true
          state.unreadCount = state.notifications.filter(n => !n.read).length
        }
      })
  },
})

export const { incrementUnread, clearUnread } = notificationSlice.actions
export default notificationSlice.reducer