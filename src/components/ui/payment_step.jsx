// PaymentStep.jsx
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaUserGraduate, FaPhone, FaCreditCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  initiatePesapalPayment,
  pollPaymentStatus,
  resetPaymentState,
  toggleIframe,
  setPaymentComplete,
  setPaymentStatus,
  selectPaymentState,
} from '../../features/paymentSlice';

const PaymentStep = ({ formData, setFormData, errors, onPaymentSuccess, user }) => {
  const dispatch = useDispatch();
  
  // Select payment state
  const {
    paymentUrl,
    isProcessing,
    showIframe,
    paymentStatus,
    paymentComplete,
    enrollmentData,
    // orderTrackingId,
    // merchantReference,
    error: paymentError,
  } = useSelector(selectPaymentState);

  // const [verificationAttempts, setVerificationAttempts] = useState(0);

  // Auto-populate user data
  useEffect(() => {
    if (user) {
      const updates = {};
      if (user.phone_number && !formData.phone_number) {
        updates.phone_number = user.phone_number;
      }
      if (user.email && !formData.email) {
        updates.email = user.email;
      }
      if (user.first_name && !formData.first_name) {
        updates.first_name = user.first_name;
      }
      if (user.last_name && !formData.last_name) {
        updates.last_name = user.last_name;
      }
      if (Object.keys(updates).length > 0) {
        setFormData(prev => ({ ...prev, ...updates }));
      }
    }
  }, [user, formData, setFormData]);

  // Reset payment state on unmount
  useEffect(() => {
    return () => {
      dispatch(resetPaymentState());
    };
  }, [dispatch]);

  // Handle payment initiation
  const handleConfirmPayment = async () => {
    try {
      const paymentData = {
        currency: "UGX",
        amount: formData.totalAmount,
        description: `Course Enrollment - ${formData.selectedCourses.length} courses`,
        callback_url: `${window.location.origin}/payment-callback`,
        cancellation_url: `${window.location.origin}/payment-cancelled`,
        redirect_mode: "PARENT_WINDOW",
        email: formData.email,
        phone_number: formData.phone_number,
        first_name: formData.first_name,
        last_name: formData.last_name,
        address: formData.address || '',
        city: formData.city || "Kampala",
        country_code: "UG",
        course_ids: formData.selectedCourses,
        total_amount: formData.totalAmount,
      };

      const result = await dispatch(initiatePesapalPayment(paymentData)).unwrap();
      
      if (result.redirect_url) {
        // Payment initiated successfully
        console.log('Payment initiated:', result);
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      // Show error to user
      alert(error.message || 'Failed to initiate payment. Please try again.');
    }
  };

  // Handle payment completion (callback from iframe)
  useEffect(() => {
    const handleMessage = async (event) => {
      // Check if message is from Pesapal iframe
      if (event.data && event.data.type === 'PESAPAL_PAYMENT_COMPLETE') {
        const { orderTrackingId, merchantReference } = event.data;
        
        // Start polling for payment status
        try {
          const result = await dispatch(pollPaymentStatus({
            orderTrackingId,
            merchantReference,
            maxAttempts: 10,
            delay: 3000,
          })).unwrap();

          if (result.status === 'COMPLETED') {
            dispatch(setPaymentComplete(true));
            dispatch(setPaymentStatus('completed'));
            dispatch(toggleIframe(false));
            
            // Call parent callback
            if (onPaymentSuccess) {
              onPaymentSuccess({
                status: 'COMPLETED',
                enrollment: result.enrollment,
                data: result.data,
              });
            }
          } else if (result.status === 'FAILED') {
            dispatch(setPaymentStatus('failed'));
            dispatch(toggleIframe(false));
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          dispatch(setPaymentStatus('failed'));
          dispatch(toggleIframe(false));
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dispatch, onPaymentSuccess]);

  // If payment is successful, show success message
  if (paymentComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCreditCard className="text-white text-3xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
        <p className="text-gray-400">Your enrollment has been confirmed.</p>
        {enrollmentData && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-300">
              Enrollment ID: {enrollmentData.enrollment_id}
            </p>
          </div>
        )}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Continue to Dashboard
        </button>
      </motion.div>
    );
  }

  // If payment failed, show error
  if (paymentStatus === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCreditCard className="text-white text-3xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Payment Failed</h3>
        <p className="text-gray-400">{paymentError || 'Your payment could not be processed.'}</p>
        <button
          onClick={() => {
            dispatch(resetPaymentState());
            setFormData(prev => ({ ...prev }));
          }}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {!showIframe ? (
        <>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FaUserGraduate className="text-green-500" />
            Payment Information
          </h3>

          <div className="p-4 bg-white/5 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Enrollment Summary</p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {formData.selectedCourses.map(course => {
                if (!course) return null;
                const price = course.price || 0;
                return (
                  <div key={course.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{course.title}</span>
                    <span className="text-white">UGX: {price.toLocaleString()}</span>
                  </div>
                );
              })}
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="flex justify-between font-bold text-white">
                  <span>Total Fee</span>
                  <span>UGX: {formData.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="text-sm text-gray-400 mb-1 flex items-center gap-2">
              <FaPhone className="text-green-500" />
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone_number || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
              className={`w-full px-4 py-2 bg-black/60 border rounded-lg text-white focus:outline-none focus:border-red-600 ${
                user?.phone_number ? 'opacity-70' : ''
              }`}
              placeholder="Enter your phone number"
              readOnly={!!user?.phone_number}
            />
            {user?.phone_number && (
              <p className="text-xs text-gray-400 mt-1">
                Phone number auto-filled from your profile
              </p>
            )}
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
            )}
          </div>

          {/* Payment Error Display */}
          {paymentError && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm">{paymentError}</p>
            </div>
          )}

          {/* Confirm Payment Button */}
          <button
            onClick={handleConfirmPayment}
            disabled={isProcessing || !formData.phone_number || !formData.email}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              'Confirm & Pay with Pesapal'
            )}
          </button>

          <p className="text-xs text-gray-400 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </>
      ) : (
        // Pesapal Iframe
        <div className="relative">
          <div className="w-full h-[600px] bg-white rounded-lg overflow-hidden">
            <iframe
              src={paymentUrl}
              className="w-full h-full"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
              title="Pesapal Payment"
            />
          </div>
          
          {/* Loading overlay */}
          {paymentStatus === 'processing' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white">Loading payment gateway...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default PaymentStep;