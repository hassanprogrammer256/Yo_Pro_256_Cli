import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/axios'

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetch',
  async () => {
    const response = await api.get('/subscriptions/plans')
    return response.data
  }
)

export const subscribeToPlan = createAsyncThunk(
  'subscriptions/subscribe',
  async ({ tier, paymentMethod }) => {
    const response = await api.post('/subscriptions/subscribe', {
      tier,
      paymentMethod,
    })
    return response.data
  }
)

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    plans: [],
    currentSubscription: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false
        state.plans = action.payload
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(subscribeToPlan.pending, (state) => {
        state.loading = true
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.loading = false
        state.currentSubscription = action.payload
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default subscriptionSlice.reducer