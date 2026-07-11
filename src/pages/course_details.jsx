// CourseDetails.jsx
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaUserGraduate,
//   FaBookOpen,
  FaUsers,
  FaStar,
  FaClock,
//   FaVideo,
  FaCheckCircle,
  FaPlayCircle,
//   FaDownload,
  FaShare,
  FaHeart,
  FaRegHeart,
//   FaCertificate,
//   FaUserTie,
//   FaGlobe,
  FaLanguage,
  FaLevelUpAlt,
} from 'react-icons/fa'
import { MdOutlineVideoLibrary } from 'react-icons/md'
// import { BsFillPeopleFill } from 'react-icons/bs'
import { Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { all_courses } from '../features/courseSlice'
import { toast } from 'react-toastify'
import EnrollmentModal from '../components/ui/enrollment_modal'
import { BASE_API_URL } from '../configs'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { courses, loading } = useSelector((state) => state.courses)
  const [course, setCourse] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(all_courses())
        .unwrap()
        .catch((error) => {
          toast.error('Failed to load course details')
        })
    }
  }, [dispatch, courses.length])

  useEffect(() => {
    if (courses.length > 0) {
      const foundCourse = courses.find((c) => c.id === id)
      if (foundCourse) {
        setCourse(foundCourse)
      } else {
        toast.error('Course not found')
        navigate('/courses')
      }
    }
  }, [courses, id, navigate])

  const handleEnroll = () => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  const handleBack = () => {
    navigate('/courses')
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-hassan-gray/20 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border animate-spin w-16 h-16 border-4 border-red-500 rounded-full"></div>

        </div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-hassan-gray/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-sm rounded-2xl border border-[#ff3030]/20 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Thumbnail */}
            <div className="lg:col-span-1 relative">
              <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400x300'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-red to-redGlow text-white text-lg font-bold rounded-full">
                    {course.price}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FaUsers className="w-5 h-5 text-red-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Students</p>
                  <p className="text-white font-bold">{course.enrolled?.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <FaStar className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Rating</p>
                  <p className="text-white font-bold">{course.rating || 4.5} ★</p>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                      {course.level || 'Intermediate'}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                      {course.category || 'Web Development'}
                    </span>
                  </div>
                  <Typography
                    level="h1"
                    sx={{
                      background: 'linear-gradient(135deg, #ff0000, #ff6b6b, #ffb400)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      fontWeight: 'bold',
                      mb: 2,
                    }}
                  >
                    {course.title}
                  </Typography>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWishlist}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    {isWishlisted ? (
                      <FaHeart className="w-5 h-5 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <FaShare className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-4">{course.description}</p>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg mb-4">
                <img
                  src={`${course.instructor.profile_pic}` || './images/icon/default_instructor_icon.png'}
                  alt={course.instructor.full_name}
                  className="w-14 h-14 rounded-full border-2 border-red-500 object-cover"
                />
                <div>
                  <p className="text-white font-semibold">
                    {course.instructor?.full_name || 'Instructor Name'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {course.instructor?.title || 'Instructor Title'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <FaStar className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">
                      {course.instructor?.rating || 4.8} Instructor Rating
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MdOutlineVideoLibrary className="w-5 h-5 text-red-400" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaClock className="w-5 h-5 text-red-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FaLevelUpAlt className="w-5 h-5 text-red-400" />
                  <span>{course.level || 'Intermediate'}</span>
                </div>
              </div>

              {/* Enroll Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEnroll}
                className="w-full py-3 bg-gradient-to-r from-red to-redGlow text-white font-bold rounded-lg text-lg hover:shadow-lg hover:shadow-red-500/20 transition-all flex items-center justify-center gap-2"
              >
                <FaUserGraduate className="w-5 h-5" />
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <div className="flex gap-2 border-b border-[#ff3030]/20">
            {['overview', 'curriculum', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red to-redGlow"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 backdrop-blur-sm rounded-2xl border border-[#ff3030]/20 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Course Overview</h3>
                <p className="text-gray-300 mb-6">{course.full_description || course.description}</p>

                {/* What You'll Learn */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">What You'll Learn</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learning_objectives?.map((objective, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{objective}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start gap-2">
                          <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Build full-stack applications with Python and React</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">Master RESTful API development</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {course.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    )) || (
                      <>
                        <li>Basic programming knowledge</li>
                        <li>Familiarity with HTML, CSS, and JavaScript</li>
                        <li>Computer with internet connection</li>
                      </>
                    )}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'curriculum' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 backdrop-blur-sm rounded-2xl border border-[#ff3030]/20 p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Course Curriculum</h3>
                <div className="space-y-4">
                  {course.curriculum?.map((section, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-semibold">{section.title}</h4>
                        <span className="text-sm text-gray-400">{section.lessons} lessons</span>
                      </div>
                      <div className="space-y-2">
                        {section.lessons_list?.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center gap-3 text-sm text-gray-300 pl-4 border-l-2 border-red-500/30">
                            <FaPlayCircle className="w-4 h-4 text-red-400" />
                            <span>{lesson}</span>
                          </div>
                        )) || (
                          <>
                            <div className="flex items-center gap-3 text-sm text-gray-300 pl-4 border-l-2 border-red-500/30">
                              <FaPlayCircle className="w-4 h-4 text-red-400" />
                              <span>Introduction to the course</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-300 pl-4 border-l-2 border-red-500/30">
                              <FaPlayCircle className="w-4 h-4 text-red-400" />
                              <span>Setting up development environment</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )) || (
                    <>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-semibold">Section 1: Getting Started</h4>
                          <span className="text-sm text-gray-400">4 lessons</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm text-gray-300 pl-4 border-l-2 border-red-500/30">
                            <FaPlayCircle className="w-4 h-4 text-red-400" />
                            <span>Introduction to the course</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-300 pl-4 border-l-2 border-red-500/30">
                            <FaPlayCircle className="w-4 h-4 text-red-400" />
                            <span>Setting up development environment</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-black/60 backdrop-blur-sm rounded-2xl border border-[#ff3030]/20 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Student Reviews</h3>
                  <div className="flex items-center gap-2">
                    <FaStar className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-bold text-white">{course.rating || 4.5}</span>
                    <span className="text-gray-400">({course.reviews_count || 0} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.reviews?.map((review, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.user?.profile_pic || 'https://via.placeholder.com/40'}
                          alt={review.user?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-semibold">{review.user?.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Related Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Related Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {
              course?.related_courses?.length > 0 ?
    course?.related_courses
              ?.slice(0, 10)
              ?.map((relatedCourse) => (
                <div
                  key={relatedCourse.id}
                  onClick={() => navigate(`/courses/${relatedCourse.id}`)}
                  className="bg-black/60 backdrop-blur-sm rounded-2xl border border-[#ff3030]/20 p-4 cursor-pointer hover:border-[#ff3030]/50 transition-all"
                >
                  <img
                    src={relatedCourse.thumbnail || 'https://via.placeholder.com/400x200'}
                    alt={relatedCourse.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-white font-semibold mb-1">{relatedCourse.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{relatedCourse.lessons} lessons</span>
                    <span className="text-red-400 font-bold">{relatedCourse.price}</span>
                  </div>
                </div>
              ))
              :
                      <div className="text-center py-12">
            <p className="text-gray-400 text-lg capitalize">No Related Courses found for this Course</p>
          </div>
            }
          </div>
        </motion.div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedCourse={selectedCourse}
        allCourses={courses}
      />
    </section>
  )
}

export default CourseDetails