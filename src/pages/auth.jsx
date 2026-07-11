// Auth.tsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaUserCircle, FaCamera, FaPhone, FaVenusMars} from 'react-icons/fa'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { login, registerStudent} from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { isPassword_Valid, isPhone_Number_Valid } from '../configs'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({profile_pic: '',first_name: '',last_name: '',email: '',phone_number: '',gender:'',password: '',confirm_password: ''})
  const {loading} = useSelector((state) => state.auth)
const [profilePicPreview, setProfilePicPreview] = useState(null);
 const dispatch = useDispatch()
 const navigate = useNavigate()

const resetForm =() =>{
  setFormData({profile_pic: '',first_name: '',last_name: '',email: '',phone_number: '',gender:'',password: '',confirm_password: ''});
  setProfilePicPreview(null);
  return
}

const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  
  if (type === 'file' && name === 'profile_pic') {
    const file = files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePicPreview(previewUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profile_pic: file
        }));
      };
      reader.readAsDataURL(file);
    }
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault()
          
     
try{
if (isLogin) {
await dispatch(login(formData)).unwrap()
      try {
        toast.success("Logged In Successfully");
        navigate('/student')}
 catch (error) {
       
        toast.error(error || "Invalid Credentials");
      }
      return;
    }    
else {
      const response =  await dispatch(registerStudent(formData)).unwrap()
      if (formData.password !== formData.confirm_password) {
        toast.error('Passwords do not match!')
        return
      }

      if (formData.profie_pic == "" || !profilePicPreview) {
        toast.error('Please Upload your Profile Picture')
        return
      }
     
      if (formData.gender == "") {
        toast.error('Please Select your Gender')
        return
      }
      if (!isPhone_Number_Valid(formData.phone_number)) {
        toast.error('Invalid Phone Number format, use 10 digits starting with 07')
        return
      }
      if (!isPassword_Valid(formData.password)) {
        toast.error('Password is weak, it must have atleast 8 characters,1 digit, 1 uppercase letter,1 special character')
        return
      }

     if (response.payload.email){
 toast.success('Account created successfully, Login Now')
 resetForm();
 setIsLogin(true);
     }else{
      toast.error('An Error Occurred')
     }
    }}
catch(e){
    console.error(e)
  if(e.Error === "Request failed with status code 401"){
toast.error('Invalid Credentials')
  }else{
    toast.error('An Error Occurred')
  }

   
}}


 

  // const handleSocialAuth = (provider) => {
  //   toast.info(`Connecting with ${provider}...`)
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-hassan-gray/20 py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-screen-md"
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
        <form onSubmit={handleSubmit} className="space-y-4">
    {/* Profile Picture Upload - Avatar */}
    {!isLogin && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="relative group">
          {/* Avatar Preview */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-yellow-500/20 border-2 border-white/10 overflow-hidden flex items-center justify-center">
            {profilePicPreview ? (
              <img 
                src={profilePicPreview} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-16 h-16 text-gray-500" />
            )}
          </div>
          
          {/* Upload Button Overlay */}
          <label 
            htmlFor="profile_pic"
            className="absolute bottom-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer hover:bg-red-600 transition-colors shadow-lg"
          >
            <FaCamera className="w-4 h-4 text-white" />
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept="image/*"
              
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">Upload profile picture</p>
      </motion.div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Name */}
      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required={!isLogin}
              className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
              placeholder="First Name"
            />
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </motion.div>
      )}

      {/* Last Name */}
      {!isLogin && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required={!isLogin}
              className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
              placeholder="Last Name"
            />
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </motion.div>
      )}
    </div>

    {/* Email */}
    <div>
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

    {/* Phone Number */}
    {!isLogin && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
  
        <div className="relative">
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
            placeholder="07XXXXXXXX"
          />
          <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </motion.div>
    )}

    {/* Gender */}
    {!isLogin && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
      
        <div className="relative">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition appearance-none"
          >
            <option value="">Select your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>
          <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.div>
    )}

    {/* Password */}
    <div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 pr-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
          placeholder={isLogin ? 'Enter your password' : 'Create password'}
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

    {!isLogin && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
      >

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required={!isLogin}
            className="w-full bg-black/50 border rounded-lg px-4 py-3 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-red transition"
            placeholder="Confirm your password"
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
      </motion.div>
    )}


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

    {/* Toggle */}
    <div className="text-center mt-2">
      <p className="text-sm text-gray-400">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            // Reset form when toggling
            setFormData({
              profile_pic: '',
              first_name: '',
              last_name: '',
              email: '',
              phone_number: '',
              gender: '',
              password: '',
              confirm_password: '',
            });
            setProfilePicPreview(null);
          }}
          className="text-yellow-400 font-medium hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>

    <div className="text-center mt-2">
      <p className="text-sm text-gray-400">
        {isLogin ? "Continue as? " : null}
        <button
          type="button"
          onClick={() => {
           navigate('/');
            
          }}
          className="text-yellow-400 font-medium underline hover:no-underline hover:text-red"
        >
          {isLogin ? 'Guest' :null}
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