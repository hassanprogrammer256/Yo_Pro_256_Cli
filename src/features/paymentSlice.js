// store/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/axios'; // Your API client

// Initial state
const initialState = {
  // Payment initiation
  paymentData: null,
  paymentUrl: null,
  orderTrackingId: null,
  merchantReference: null,
  isProcessing: false,
  isInitiated: false,
  
  // Payment verification
  paymentStatus: 'idle', // idle | processing | completed | failed | pending
  verificationData: null,
  isVerifying: false,
  verificationAttempts: 0,
  maxVerificationAttempts: 10,
  
  // Payment history
  transactions: [],
  currentTransaction: null,
  
  // Error handling
  error: null,
  errorDetails: null,
  
  // UI states
  showIframe: false,
  paymentComplete: false,
  enrollmentData: null,
};

// Async Thunks

/**
 * Initiate Pesapal Payment
 */
export const initiatePesapalPayment = createAsyncThunk(
  'payment/initiate',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/initiate/', paymentData);
      
      if (response.data.status === '200' && response.data.redirect_url) {
        return {
          redirect_url: response.data.redirect_url,
          order_tracking_id: response.data.order_tracking_id,
          merchant_reference: response.data.merchant_reference,
          payment_data: paymentData,
        };
      } else {
        return rejectWithValue({
          message: response.data.message || 'Failed to initiate payment',
          details: response.data
        });
      }
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || error.message || 'Payment initiation failed',
        details: error.response?.data || error
      });
    }
  }
);

/**
 * Verify Payment Status
 */
export const verifyPesapalPayment = createAsyncThunk(
  'payment/verify',
  async ({ orderTrackingId, merchantReference }, { rejectWithValue }) => {
    try {
      const response = await api.post('/payments/verify/', {
        order_tracking_id: orderTrackingId,
        merchant_reference: merchantReference,
      });
      
      if (response.data.status === 'COMPLETED') {
        return {
          status: 'COMPLETED',
          data: response.data,
          enrollment: response.data.enrollment,
        };
      } else if (response.data.status === 'FAILED') {
        return rejectWithValue({
          status: 'FAILED',
          message: response.data.message || 'Payment failed',
          data: response.data,
        });
      } else {
        // PENDING or other status
        return {
          status: 'PENDING',
          data: response.data,
          message: response.data.message || 'Payment is being processed',
        };
      }
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || error.message || 'Payment verification failed',
        details: error.response?.data || error
      });
    }
  }
);

/**
 * Poll Payment Status (for pending payments)
 */
export const pollPaymentStatus = createAsyncThunk(
  'payment/poll',
  async ({ orderTrackingId, merchantReference, maxAttempts = 10, delay = 3000 }, { dispatch, rejectWithValue }) => {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      attempts++;
      
      try {
        const result = await dispatch(verifyPesapalPayment({
          orderTrackingId,
          merchantReference,
        })).unwrap();
        
        // If completed or failed, return result
        if (result.status === 'COMPLETED' || result.status === 'FAILED') {
          return result;
        }
        
        // If pending, wait and try again
        if (result.status === 'PENDING') {
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        return result;
      } catch (error) {
        // If it's a FAILED status, return it
        if (error.status === 'FAILED') {
          return { status: 'FAILED', data: error };
        }
        
        // If it's the last attempt, throw error
        if (attempts >= maxAttempts) {
          return rejectWithValue({
            message: 'Payment verification timed out',
            attempts,
          });
        }
        
        // Otherwise, wait and retry
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return rejectWithValue({
      message: 'Maximum verification attempts exceeded',
      attempts,
    });
  }
);

/**
 * Fetch User Transactions
 */
export const fetchUserTransactions = createAsyncThunk(
  'payment/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/payments/transactions/');
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || 'Failed to fetch transactions',
      });
    }
  }
);

/**
 * Check Payment Status by Order ID
 */
export const checkPaymentStatus = createAsyncThunk(
  'payment/checkStatus',
  async (orderTrackingId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/payments/status/${orderTrackingId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.error || 'Failed to check payment status',
      });
    }
  }
);

// Slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // Reset payment state
    resetPaymentState: (state) => {
      state.paymentData = null;
      state.paymentUrl = null;
      state.orderTrackingId = null;
      state.merchantReference = null;
      state.isProcessing = false;
      state.isInitiated = false;
      state.paymentStatus = 'idle';
      state.verificationData = null;
      state.isVerifying = false;
      state.error = null;
      state.errorDetails = null;
      state.showIframe = false;
      state.paymentComplete = false;
      state.enrollmentData = null;
    },
    
    // Set payment data
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
    
    // Update payment status
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    
    // Toggle iframe
    toggleIframe: (state, action) => {
      state.showIframe = action.payload !== undefined ? action.payload : !state.showIframe;
    },
    
    // Set payment complete
    setPaymentComplete: (state, action) => {
      state.paymentComplete = action.payload;
    },
    
    // Update current transaction
    setCurrentTransaction: (state, action) => {
      state.currentTransaction = action.payload;
    },
    
    // Clear errors
    clearPaymentErrors: (state) => {
      state.error = null;
      state.errorDetails = null;
    },
    
    // Update from callback
    updatePaymentFromCallback: (state, action) => {
      const { orderTrackingId, merchantReference, status } = action.payload;
      state.orderTrackingId = orderTrackingId;
      state.merchantReference = merchantReference;
      state.paymentStatus = status;
      state.showIframe = false;
      
      if (status === 'COMPLETED') {
        state.paymentComplete = true;
      }
    },
    
    // Add transaction to history
    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Initiate Payment
      .addCase(initiatePesapalPayment.pending, (state) => {
        state.isProcessing = true;
        state.isInitiated = false;
        state.error = null;
        state.errorDetails = null;
        state.paymentStatus = 'processing';
      })
      .addCase(initiatePesapalPayment.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.isInitiated = true;
        state.paymentUrl = action.payload.redirect_url;
        state.orderTrackingId = action.payload.order_tracking_id;
        state.merchantReference = action.payload.merchant_reference;
        state.paymentData = action.payload.payment_data;
        state.showIframe = true;
        state.paymentStatus = 'initiated';
        state.error = null;
        state.errorDetails = null;
      })
      .addCase(initiatePesapalPayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.isInitiated = false;
        state.paymentStatus = 'failed';
        state.error = action.payload?.message || 'Payment initiation failed';
        state.errorDetails = action.payload?.details || null;
        state.showIframe = false;
      })
      
      // Verify Payment
      .addCase(verifyPesapalPayment.pending, (state) => {
        state.isVerifying = true;
        state.error = null;
        state.errorDetails = null;
      })
      .addCase(verifyPesapalPayment.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.verificationData = action.payload.data;
        state.paymentStatus = action.payload.status;
        state.showIframe = false;
        
        if (action.payload.status === 'COMPLETED') {
          state.paymentComplete = true;
          state.enrollmentData = action.payload.enrollment;
          
          // Add to transactions if not already present
          if (state.currentTransaction) {
            state.transactions = state.transactions.map(t => 
              t.order_tracking_id === state.currentTransaction.order_tracking_id
                ? { ...t, status: 'COMPLETED', enrollment: action.payload.enrollment }
                : t
            );
          }
        } else if (action.payload.status === 'PENDING') {
          state.paymentStatus = 'pending';
        }
      })
      .addCase(verifyPesapalPayment.rejected, (state, action) => {
        state.isVerifying = false;
        state.paymentStatus = action.payload?.status === 'FAILED' ? 'failed' : 'error';
        state.error = action.payload?.message || 'Payment verification failed';
        state.errorDetails = action.payload?.data || null;
        state.showIframe = false;
      })
      
      // Poll Payment Status
      .addCase(pollPaymentStatus.pending, (state) => {
        state.isVerifying = true;
        state.error = null;
        state.errorDetails = null;
      })
      .addCase(pollPaymentStatus.fulfilled, (state, action) => {
        state.isVerifying = false;
        state.verificationData = action.payload.data;
        state.paymentStatus = action.payload.status;
        state.showIframe = false;
        
        if (action.payload.status === 'COMPLETED') {
          state.paymentComplete = true;
          state.enrollmentData = action.payload.enrollment;
        }
      })
      .addCase(pollPaymentStatus.rejected, (state, action) => {
        state.isVerifying = false;
        state.paymentStatus = 'failed';
        state.error = action.payload?.message || 'Payment verification timed out';
        state.showIframe = false;
      })
      
      // Fetch Transactions
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to fetch transactions';
      })
      
      // Check Payment Status
      .addCase(checkPaymentStatus.fulfilled, (state, action) => {
        state.paymentStatus = action.payload.status;
        state.verificationData = action.payload;
      })
      .addCase(checkPaymentStatus.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to check payment status';
      });
  },
});

// Export actions
export const {
  resetPaymentState,
  setPaymentData,
  setPaymentStatus,
  toggleIframe,
  setPaymentComplete,
  setCurrentTransaction,
  clearPaymentErrors,
  updatePaymentFromCallback,
  addTransaction,
} = paymentSlice.actions;

// Selectors
export const selectPaymentState = (state) => state.payment;
export const selectPaymentStatus = (state) => state.payment.paymentStatus;
export const selectPaymentUrl = (state) => state.payment.paymentUrl;
export const selectPaymentComplete = (state) => state.payment.paymentComplete;
export const selectIsProcessing = (state) => state.payment.isProcessing;
export const selectShowIframe = (state) => state.payment.showIframe;
export const selectPaymentError = (state) => state.payment.error;
export const selectTransactions = (state) => state.payment.transactions;
export const selectEnrollmentData = (state) => state.payment.enrollmentData;
export const selectVerificationData = (state) => state.payment.verificationData;
export const selectOrderTrackingId = (state) => state.payment.orderTrackingId;
export const selectMerchantReference = (state) => state.payment.merchantReference;
export const selectCurrentTransaction = (state) => state.payment.currentTransaction;

export default paymentSlice.reducer;