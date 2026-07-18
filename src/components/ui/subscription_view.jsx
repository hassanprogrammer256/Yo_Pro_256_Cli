import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import { setSelectedTier, togglePaymentModal } from '../../features/uiSlice'

const SubscriptionView = ({ plans }) => {
  const dispatch = useDispatch()

  const handleSubscribe = (tier) => {
    dispatch(setSelectedTier(tier))
    dispatch(togglePaymentModal(true))
  }

  return (
    <motion.div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Upgrade Your Learning</h2>
        <p className="text-gray-400">Choose the perfect plan for your journey</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.tier} className={`bg-black/60 backdrop-blur-sm border rounded-xl p-6 ${
            plan.tier === 'Gold' ? 'border-hassan-green shadow-lg shadow-hassan-green/20' : 'border-hassan-green/20'
          }`}>
            {plan.tier === 'Gold' && (
              <div className="text-center mb-3">
                <span className="px-3 py-1 bg-hassan-green text-black text-xs font-bold rounded-full">MOST POPULAR</span>
              </div>
            )}
            <h3 className="text-xl font-bold text-white text-center">{plan.tier}</h3>
            <p className="text-3xl font-bold text-hassan-green text-center mt-2">${plan.price}<span className="text-sm text-gray-400">/mo</span></p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <FaCheckCircle className="text-hassan-green w-4 h-4 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleSubscribe(plan.tier)}
              className={`w-full mt-4 py-2 rounded-lg font-bold transition ${
                plan.tier === 'Gold' 
                  ? 'bg-hassan-green text-black hover:shadow-lg hover:shadow-hassan-green/20' 
                  : 'border border-hassan-green text-hassan-green hover:bg-hassan-green/10'
              }`}
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SubscriptionView