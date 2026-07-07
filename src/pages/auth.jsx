// Auth.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash} from 'react-icons/fa'
import { toast } from 'react-toastify'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isLogin) {
      toast.success('Welcome back! Redirecting to dashboard...')
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!')
        setLoading(false)
        return
      }
      if (!formData.agreeTerms) {
        toast.error('Please agree to the terms and conditions')
        setLoading(false)
        return
      }
      toast.success('Account created successfully! Please verify your email.')
    }
    setLoading(false)
  }

  // const handleSocialAuth = (provider) => {
  //   toast.info(`Connecting with ${provider}...`)
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-hassan-gray/20 py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Auth Card */}
        <div className="bg-black/80 backdrop-blur-xl border border-red/30 rounded-2xl p-8 shadow-2xl shadow-red/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {isLogin
                ? 'Sign in to access your dashboard and courses'
                : 'Join our community and start learning today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username (Register only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-xs font-mono text-gray-400 mb-1">USERNAME</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full bg-black/50 border  rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
                    placeholder="Choose a username"
                  />
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
                  placeholder="you@example.com"
                />
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border  rounded-lg px-4 py-3 pl-11 pr-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
                  placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
                />
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-xs font-mono text-gray-400 mb-1">CONFIRM PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full bg-black/50 border  rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
                    placeholder="Confirm your password"
                  />
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </motion.div>
            )}

            {/* Terms (Register only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-start gap-2"
              >
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-red bg-black/50 rounded"
                />
                <label className="text-xs text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-red hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-red hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </motion.div>
            )}

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-xs text-yellow-400 hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black rounded-lg font-bold text-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </motion.button>

            {/* Divider */}
            {/* <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-black text-gray-500">OR CONTINUE WITH</span>
              </div>
            </div> */}

            {/* Social Auth */}
            {/* <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleSocialAuth('Google')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:border-red/30 transition"
              >
                <FaGoogle className="w-4 h-4 text-red-400" />
                <span className="text-sm">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => handleSocialAuth('GitHub')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:border-red/30 transition"
              >
                <FaGithub className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </motion.button>
            </div> */}

            {/* Toggle */}
            <div className="text-center mt-2">
              <p className="text-sm text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-yellow-400 font-medium hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </form>
        </div>

      </motion.div>
    </div>
  )
}

export default Auth