import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  FaTimes, 
  FaCheck, 
  FaChevronRight, 
  FaChevronLeft, 
  FaEnvelope,
  FaTrash,
  FaBookOpen,
  FaGraduationCap,
  FaUserGraduate,
  FaSearch
} from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_TO_EMAIL } from '../../configs'
// import { useParams } from 'react-router-dom'
import PaymentStep from './payment_step'
import { useDispatch, useSelector} from 'react-redux'
import { user_data } from '../../features/authSlice'
import { resetPaymentState } from '../../features/paymentSlice'


emailjs.init(EMAILJS_PUBLIC_KEY)

const EnrollmentModal = ({ isOpen, onClose, selectedCourse, allCourses }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    selectedCourses: [],
    totalAmount: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showCourseSelector, setShowCourseSelector] = useState(false) 
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const prevIsOpen = useRef(isOpen)
  const totalRef = useRef(0)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setStep(1)
      setIsSuccess(false)
      setFormData(prev => ({
        ...prev,
        selectedCourses: [],
        totalAmount: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
      }))
      setShowCourseSelector(false)
      setSearchTerm('')
    }
    dispatch(user_data())
    prevIsOpen.current = isOpen
  }, [isOpen])

    useEffect(() => {
    return () => {
      dispatch(resetPaymentState());
    };
  }, [dispatch]);

  // Calculate total whenever selected courses change
  useEffect(() => {
    const total = formData.selectedCourses.reduce((sum, courseId) => {
      const course = allCourses.find(c => c.id === courseId)
      const price = course ? course.price : 0
      return sum + price
    }, 0)
    
    if (total !== totalRef.current) {
      totalRef.current = total
      setFormData(prev => ({ ...prev, totalAmount: total }))
    }
  }, [formData.selectedCourses, allCourses])
  // Toggle course selection
  const toggleCourseSelection = (courseId) => {
    setFormData(prev => {
      const isSelected = prev.selectedCourses.includes(courseId)
      const newSelection = isSelected
        ? prev.selectedCourses.filter(id => id !== courseId)
        : [...prev.selectedCourses, courseId]
      return { ...prev, selectedCourses: newSelection }
    })
  }

  const addInitialCourse = (courseId) => {
    
    if (!formData.selectedCourses.includes(courseId)) {
      setFormData(prev => ({
        ...prev,
        selectedCourses: [...prev.selectedCourses, courseId]
      }))
    }
  }

  // Remove course from selection
  const removeCourse = (courseId) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.filter(id => id !== courseId)
    }))
  }

  // Get course details
  const getCourseDetails = (courseId) => {
    return allCourses.find(c => c.id === courseId)
  }

  // Filter courses for the selector
  const filteredCourses = allCourses.filter(course => {
    const searchLower = searchTerm.toLowerCase()
    return course?.title?.toLowerCase().includes(searchLower) ||
           course.description.toLowerCase().includes(searchLower)
  })

  // Validate current step
  const validateStep = () => {
    const newErrors = {}
    
    if (step === 1) {
      if (formData.selectedCourses.length === 0) {
        newErrors.selectedCourses = 'Please select at least one course for enrollment.'
      }
    } else if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1)
    }
  }





  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

const handleSubmit = async () => {
  if (!validateStep()) return;

  setIsSubmitting(true);

  try {
    const selectedCoursesDetails = formData.selectedCourses.map(id => {
      const course = getCourseDetails(id);

      return {
        name: course.title,
        price:course.price
      };
    });

    const coursesTableRows = selectedCoursesDetails
      .map(
        (course, index) => `
        <tr>
            <td style="padding:12px;border:1px solid #333;color:#ffffff;text-align:center;">
                ${index + 1}
            </td>

            <td style="padding:12px;border:1px solid #333;color:#ffffff;">
                ${course.title}
            </td>

            <td style="padding:12px;border:1px solid #333;color:#ffffff;text-align:right;">
                UGX ${course.price.toLocaleString()}
            </td>
        </tr>
    `
      )
      .join("");

    const emailBody = `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width,initial-scale=1.0">

</head>

<body style="margin:0;padding:20px;background:#0f0f0f;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center">

<table width="700" cellpadding="0" cellspacing="0"
style="max-width:700px;width:100%;background:#181818;border-radius:12px;overflow:hidden;">

<tr>

<td style="background:#ff3030;padding:25px;text-align:center;">

<h1 style="margin:0;color:#ffffff;">
New Course Enrollment
</h1>

</td>

</tr>

<tr>

<td style="padding:30px;">

<p style="color:#cccccc;margin:0 0 10px;">
<strong style="color:#ffffff;">Enrollment ID:</strong>
Enrollment Id
</p>

<p style="color:#cccccc;">
<strong style="color:#ffffff;">Date:</strong>
${new Date().toLocaleString()}
</p>

<hr style="border:0;border-top:1px solid #333;margin:25px 0;">

<h2 style="color:#ff3030;margin-bottom:15px;">
Student Information
</h2>

<table width="100%" cellpadding="8" cellspacing="0">

<tr>
<td style="color:#ffffff;"><strong>First Name</strong></td>
<td style="color:#dddddd;">${formData.firstName}</td>
</tr>

<tr>
<td style="color:#ffffff;"><strong>Last Name</strong></td>
<td style="color:#dddddd;">${formData.lastName}</td>
</tr>

<tr>
<td style="color:#ffffff;"><strong>Email</strong></td>
<td style="color:#dddddd;">${formData.email}</td>
</tr>

<tr>
<td style="color:#ffffff;"><strong>Phone</strong></td>
<td style="color:#dddddd;">${formData.phone}</td>
</tr>

<tr>
<td style="color:#ffffff;"><strong>Address</strong></td>
<td style="color:#dddddd;">${formData.address}</td>
</tr>

</table>

<h2 style="color:#ff3030;margin-top:35px;">
Selected Courses
</h2>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="border-collapse:collapse;">

<thead>

<tr style="background:#ff3030;">

<th style="padding:12px;border:1px solid #333;color:#ffffff;">
#
</th>

<th style="padding:12px;border:1px solid #333;color:#ffffff;">
Course
</th>

<th style="padding:12px;border:1px solid #333;color:#ffffff;">
Price
</th>

</tr>

</thead>

<tbody>

${coursesTableRows}

<tr style="background:#242424;">

<td colspan="2"
style="padding:15px;border:1px solid #333;color:#ffffff;font-weight:bold;">
Total Fee
</td>

<td
style="padding:15px;border:1px solid #333;color:#ff3030;font-size:18px;font-weight:bold;text-align:right;">
UGX ${formData.totalAmount.toLocaleString()}
</td>

</tr>

</tbody>

</table>

</td>

</tr>

<tr>

<td
style="background:#111111;padding:20px;text-align:center;color:#888888;font-size:13px;">

This enrollment notification was generated automatically.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

    const templateParams = {
      email: EMAILJS_TO_EMAIL, 
      first_name: formData.firstName,
      last_name: formData.lastName,
      from_email: formData.email,
      phone: formData.phone,
      address: formData.address,
      enrollment_id: "Enrollment Id",
      total_amount: `UGX: ${formData.totalAmount.toLocaleString()}`,
      message: emailBody
    };

  await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );


    setIsSuccess(true);
    setStep(3);

  } catch (error) {
    console.error(error);

    alert(
      error.text ||
      "Failed to submit enrollment. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-[#ff3030]/20 p-6 mt-24"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {isSuccess ? 'Enrolled Successfullyy!' : (
              <>
                <FaGraduationCap className="text-red-500" />
                Course Enrollment
              </>
            )}
          </h2>
          
          {/* Stepper */}
          {!isSuccess && (
            <div className="mt-4 flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      s === step
                        ? 'bg-red-600 text-white'
                        : s < step
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {s < step ? <FaCheck /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        s < step ? 'bg-green-600' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Course Selection */}
          {step === 1 && !isSuccess && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaBookOpen className="text-red-400" />
                  Select Courses for Enrollment
                </h3>
                <span className="text-sm text-gray-400">
                  Selected: <span className="text-white font-bold">
                    {formData.selectedCourses.length} course(s)
                  </span>
                </span>
              </div>
              
              {selectedCourse && !formData.selectedCourses.includes(selectedCourse.id) && (
                <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                  <p className="text-gray-300 flex items-center justify-between">
                    <span>
                      <FaUserGraduate className="inline mr-2 text-green-400" />
                      <strong className="text-green-400">Recommended Course:</strong> {selectedCourse.title}
                    </span>
                    <button
                      onClick={() => addInitialCourse(selectedCourse.id)}
                      className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      + Add Course
                    </button>
                  </p>
                </div>
              )}

              {/* Course Selector Toggle */}
              <button
                onClick={() => setShowCourseSelector(!showCourseSelector)}
                className="w-full py-3 bg-red-600/20 border border-red-600/30 rounded-lg text-white hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
              >
                {showCourseSelector ? '− Hide Course List' : '+ Browse Available Courses'}
              </button>

              {/* Course Selector */}
              {showCourseSelector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  </div>

                  {/* Course List with Checkboxes */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredCourses.map((course) => {
                      const isSelected = formData.selectedCourses.includes(course.id)
                      const price = course.price || 0
                      
                      return (
                        <label
                          key={course.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-green-600 bg-green-600/20'
                              : 'border-gray-700 hover:border-gray-600 hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleCourseSelection(course.id)}
                            className="w-4 h-4 accent-red-600"
                          />
                          
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">
                              {course.title}
                            </p>
                            <p className="text-sm text-gray-400 truncate">
                              {course.description}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-white font-bold">
                              UGX: {price.toLocaleString()}
                            </p>
                            {isSelected && (
                              <p className="text-xs text-green-400">✓ Selected</p>
                            )}
                          </div>
                        </label>
                      )
                    })}
                    
                    {filteredCourses.length === 0 && (
                      <div className="text-center py-4 text-gray-400">
                        No courses found matching your search
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Selected Courses List */}
              {formData.selectedCourses.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 font-medium">
                    Your Selected Courses ({formData.selectedCourses.length})
                  </p>
                  {formData.selectedCourses.map(id => {
                    const course = getCourseDetails(id)
                    if (!course) return null
                    const price = course?.price || 0
                    
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3 p-3 bg-green-600/5 border border-green-600/30 rounded-lg"
                      >
                        <FaCheck className="text-green-400" />
                        <div className="flex-1">
                          <p className="text-white font-medium">{course.title}</p>
                          <p className="text-sm text-gray-400">
                            UGX: {price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeCourse(id)}
                          className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {errors.selectedCourses && (
                <p className="text-red-500 text-sm">{errors.selectedCourses}</p>
              )}

              {/* Total Summary */}
              {formData.selectedCourses.length > 0 && (
                <div className="p-4 bg-gradient-to-r from-red-600/10 to-red-600/5 border border-red-600/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-sm">Courses Selected</p>
                      <p className="text-white font-semibold">
                        {formData.selectedCourses.length} course(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Total Fee Fee</p>
                      <p className="text-2xl font-bold text-white">
                        UGX: {formData.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          )}

          {/* Step 2: Student Information */}
          {step === 2 && !isSuccess && (
            <PaymentStep formData={formData} setFormData={setFormData} errors={errors} onPaymentSuccess={handleNext} user={user}/>
            // <motion.div
            //   key="step2"
            //   initial={{ opacity: 0, x: 20 }}
            //   animate={{ opacity: 1, x: 0 }}
            //   exit={{ opacity: 0, x: -20 }}
            //   className="space-y-4"
            // >
            //   <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            //     <FaUserGraduate className="text-green-500" />
            //    Student Information
            //   </h3>

            //   {/* Enrollment Summary */}
            //   <div className="p-4 bg-white/5 rounded-lg border border-gray-700">
            //     <p className="text-sm text-gray-400 mb-2">Enrollment Summary</p>
            //     <div className="space-y-1">
            //       {formData.selectedCourses.map(id => {
            //         const course = getCourseDetails(id)
            //         if (!course) return null
            //         const price =course.price || 0
            //         return (
            //           <div key={id} className="flex justify-between text-sm">
            //             <span className="text-gray-300">{course.title}</span>
            //             <span className="text-white">UGX: {price.toLocaleString()}</span>
            //           </div>
            //         )
            //       })}
            //       <div className="border-t border-gray-700 pt-2 mt-2">
            //         <div className="flex justify-between font-bold text-white">
            //           <span>Total Fee</span>
            //           <span>UGX: {formData.totalAmount.toLocaleString()}</span>
            //         </div>
            //       </div>
            //     </div>
            //   </div>

            //   {/* Student Info Form */}
            //   <div className="space-y-4">
            //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            //       <div>
            //         <label className="block text-sm text-gray-400 mb-1">
            //           First Name *
            //         </label>
            //         <input
            //           type="text"
            //           value={formData.firstName}
            //           onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            //           className={`w-full px-4 py-2 bg-black/60 border rounded-lg text-white focus:outline-none focus:border-red-600 ${
            //             errors.firstName ? 'border-red-500' : 'border-gray-700'
            //           }`}
            //           placeholder="Enter your first name"
            //         />
            //         {errors.firstName && (
            //           <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            //         )}
            //       </div>

            //       <div>
            //         <label className="block text-sm text-gray-400 mb-1">
            //           Last Name *
            //         </label>
            //         <input
            //           type="text"
            //           value={formData.lastName}
            //           onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            //           className={`w-full px-4 py-2 bg-black/60 border rounded-lg text-white focus:outline-none focus:border-red-600 ${
            //             errors.lastName ? 'border-red-500' : 'border-gray-700'
            //           }`}
            //           placeholder="Enter your last name"
            //         />
            //         {errors.lastName && (
            //           <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            //         )}
            //       </div>
            //     </div>

            //     <div>
            //       <label className="block text-sm text-gray-400 mb-1">
            //         Email Address *
            //       </label>
            //       <input
            //         type="email"
            //         value={formData.email}
            //         onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            //         className={`w-full px-4 py-2 bg-black/60 border rounded-lg text-white focus:outline-none focus:border-red-600 ${
            //           errors.email ? 'border-red-500' : 'border-gray-700'
            //         }`}
            //         placeholder="Enter your email address"
            //       />
            //       {errors.email && (
            //         <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            //       )}
            //     </div>

            //     <div>
            //       <label className="block text-sm text-gray-400 mb-1">
            //         Phone Number *
            //       </label>
            //       <input
            //         type="tel"
            //         value={formData.phone}
            //         onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            //         className={`w-full px-4 py-2 bg-black/60 border rounded-lg text-white focus:outline-none focus:border-red-600 ${
            //           errors.phone ? 'border-red-500' : 'border-gray-700'
            //         }`}
            //         placeholder="Enter your phone number"
            //       />
            //       {errors.phone && (
            //         <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            //       )}
            //     </div>

            //     <div>
            //       <label className="block text-sm text-gray-400 mb-1">
            //         Address *
            //       </label>
            //       <textarea
            //         value={formData.address}
            //         onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            //         rows={2}
            //         className={`w-full px-4 py-2 bg-black/60 border rounded-lg text-white focus:outline-none focus:border-red-600 ${
            //           errors.address ? 'border-red-500' : 'border-gray-700'
            //         }`}
            //         placeholder="Enter your address"
            //       />
            //       {errors.address && (
            //         <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            //       )}
            //     </div>
            //   </div>
            // </motion.div>
          )}

          {/* Step 3: Success */}
          {isSuccess && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 mx-auto bg-green-600/20 rounded-full flex items-center justify-center mb-4">
                <FaCheck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Enrollment Submitted Successfully! 🎉
              </h3>
              <p className="text-gray-400 mb-4">
                Thank you for enrolling! A confirmation email has been sent to your email address.
              </p>
              
              <div className="p-4 bg-gray-800/50 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Enrollment Summary:</strong>
                </p>
                <ul className="text-sm text-gray-300 mt-2">
                  {formData.selectedCourses.map(id => {
                    const course = getCourseDetails(id)
                    return course ? (
                      <li key={id} className="flex justify-between">
                        <span>{course.title}</span>
                        <span>UGX: {parseFloat(course.price.replace(/[$,UGX:\s]/g, '')).toLocaleString()}</span>
                      </li>
                    ) : null
                  })}
                </ul>
                <div className="border-t border-gray-700 mt-2 pt-2">
                  <p className="flex justify-between text-white font-bold">
                    <span>Total Fee:</span>
                    <span>UGX: {formData.totalAmount.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!isSuccess && (
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <FaChevronLeft className="w-4 h-4" />
                Back to Courses
              </button>
            )}
            
            {step < 2 ? (
              <button
                onClick={handleNext}
                disabled={formData.selectedCourses.length === 0}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <FaChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 ml-auto disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Enrollment
                    <FaEnvelope className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default EnrollmentModal