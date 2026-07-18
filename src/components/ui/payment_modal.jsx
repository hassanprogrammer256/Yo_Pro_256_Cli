import { motion, AnimatePresence } from 'framer-motion'
import { FaMobile, FaWallet } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { subscribeToPlan } from '../../features/student/subscriptionSlice'
import { togglePaymentModal } from '../../features/uiSlice'

const PaymentModal = () => {
  const dispatch = useDispatch()
  const { showPaymentModal, selectedTier } = useSelector((state) => state.ui)
  const { plans } = useSelector((state) => state.studentSubscription)

  const selectedPlan = plans.find(p => p.tier.toLowerCase() === selectedTier)

  const handlePayment = async (paymentMethod) => {
    try {
      await dispatch(subscribeToPlan({ tier: selectedTier, paymentMethod })).unwrap()
      toast.success(`Payment of $${selectedPlan?.price} via ${paymentMethod} successful!`)
      dispatch(togglePaymentModal(false))
    } catch (error) {
      console.error(error)
      toast.error('Payment failed. Please try again.' )
    }
  }

  return (
    <AnimatePresence>
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/95 border border-hassan-green/30 rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-2">Complete Payment</h3>
            <p className="text-gray-400 text-sm mb-1">Plan: <span className="text-hassan-green font-bold">{selectedTier}</span></p>
            <p className="text-gray-400 text-sm mb-4">Amount: <span className="text-hassan-green font-bold">${selectedPlan?.price}</span></p>
            
            <div className="space-y-3">
              <button 
                onClick={() => handlePayment('Mobile Money')}
                className="w-full p-3 bg-white/5 border border-hassan-green/20 rounded-lg flex items-center gap-3 hover:border-hassan-green/50 transition"
              >
                <FaMobile className="w-6 h-6 text-hassan-green" />
                <div className="text-left">
                  <p className="text-white font-medium">Mobile Money</p>
                  <p className="text-xs text-gray-500">MTN, Airtel, Africell</p>
                </div>
              </button>
              <button 
                onClick={() => handlePayment('Airtel Money')}
                className="w-full p-3 bg-white/5 border border-hassan-green/20 rounded-lg flex items-center gap-3 hover:border-hassan-green/50 transition"
              >
                <FaWallet className="w-6 h-6 text-yellow-400" />
                <div className="text-left">
                  <p className="text-white font-medium">Airtel Money</p>
                  <p className="text-xs text-gray-500">Airtel Uganda</p>
                </div>
              </button>
            </div>
            
            <button 
              onClick={() => dispatch(togglePaymentModal(false))}
              className="w-full mt-4 py-2 text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PaymentModal