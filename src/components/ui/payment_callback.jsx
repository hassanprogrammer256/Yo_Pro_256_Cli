// // PaymentCallback.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const PaymentCallback = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [verifying, setVerifying] = useState(true);
//   const [status, setStatus] = useState('pending');

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const params = new URLSearchParams(location.search);
//       const orderTrackingId = params.get('OrderTrackingId');
//       const merchantReference = params.get('OrderMerchantReference');
//       const notificationType = params.get('OrderNotificationType');

//       if (orderTrackingId && merchantReference) {
//         try {
//           const response = await fetch('/api/payments/verify-pesapal-status/', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               order_tracking_id: orderTrackingId,
//               merchant_reference: merchantReference,
//               notification_type: notificationType
//             }),
//           });

//           const data = await response.json();

//           if (data.status === 'COMPLETED') {
//             setStatus('success');
//             // Redirect to success page or dashboard after 3 seconds
//             setTimeout(() => {
//               navigate('/enrollment-success', { 
//                 state: { orderTrackingId, merchantReference }
//               });
//             }, 3000);
//           } else {
//             setStatus('failed');
//           }
//         } catch (error) {
//           console.error('Verification error:', error);
//           setStatus('failed');
//         }
//       } else {
//         setStatus('failed');
//       }
//       setVerifying(false);
//     };

//     verifyPayment();
//   }, [location, navigate]);

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center">
//       <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full text-center">
//         {verifying ? (
//           <>
//             <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <h2 className="text-xl font-semibold text-white">Verifying Payment...</h2>
//             <p className="text-gray-400 mt-2">Please wait while we confirm your payment</p>
//           </>
//         ) : status === 'success' ? (
//           <>
//             <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-white">Payment Successful!</h2>
//             <p className="text-gray-400 mt-2">Redirecting to dashboard...</p>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-white">Payment Failed</h2>
//             <p className="text-gray-400 mt-2">Please try again or contact support</p>
//             <button 
//               onClick={() => navigate('/checkout')}
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//             >
//               Try Again
//             {/* </button> */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentCallback;