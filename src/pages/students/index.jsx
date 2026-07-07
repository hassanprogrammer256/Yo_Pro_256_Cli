// StudentDashboard.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaBook, FaGraduationCap, FaClock, FaCheckCircle, FaDownload, 
  FaPrint, FaMobile, FaWallet, FaBell, FaBullhorn, 
 FaCreditCard, FaFileAlt, FaChartLine, FaStar,
  FaVideo, FaChalkboardTeacher
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import Layout from '../../components/layouts'

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
//   const [selectedCourse, setSelectedCourse] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedTier, setSelectedTier] = useState('gold')

  // Mock data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Python Programming Mastery',
      instructor: 'Hassan Programmer 256',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Hassan+Programmer&background=00ff88&color=000&size=40',
      progress: 78,
      level: 'Intermediate',
      lessonsCompleted: 38,
      totalLessons: 48,
      grade: 'A-',
      status: 'In Progress',
      syllabus: [
        'Python Basics & Syntax',
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'File I/O & Exception Handling',
        'Decorators & Generators',
        'Web Scraping & Automation',
        'Final Capstone Project'
      ],
      completedLessons: ['Python Basics & Syntax', 'Data Structures & Algorithms', 'Object-Oriented Programming']
    },
    {
      id: 2,
      title: 'Django Framework Pro',
      instructor: 'Hassan Programmer 256',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Hassan+Programmer&background=00ff88&color=000&size=40',
      progress: 45,
      level: 'Advanced',
      lessonsCompleted: 23,
      totalLessons: 52,
      grade: 'B+',
      status: 'In Progress',
      syllabus: [
        'Django Basics & Models',
        'Views & Templates',
        'Authentication & Authorization',
        'Django REST Framework',
        'Testing & Debugging',
        'Deployment & Security',
        'E-Commerce Project'
      ],
      completedLessons: ['Django Basics & Models', 'Views & Templates']
    },
    {
      id: 3,
      title: 'React + TypeScript',
      instructor: 'Hassan Programmer 256',
      instructorAvatar: 'https://ui-avatars.com/api/?name=Hassan+Programmer&background=00ff88&color=000&size=40',
      progress: 100,
      level: 'Intermediate',
      lessonsCompleted: 56,
      totalLessons: 56,
      grade: 'A',
      status: 'Completed',
      certificate: 'https://example.com/certificate.pdf',
      syllabus: [
        'React Fundamentals',
        'Hooks & Context API',
        'TypeScript Basics',
        'Advanced TypeScript Patterns',
        'State Management with Redux',
        'Testing React Components',
        'Full Stack Integration'
      ],
      completedLessons: [
        'React Fundamentals',
        'Hooks & Context API',
        'TypeScript Basics',
        'Advanced TypeScript Patterns',
        'State Management with Redux',
        'Testing React Components',
        'Full Stack Integration'
      ]
    },
  ]

  const notifications = [
    { id: 1, title: 'New Assignment', message: 'Python assignment 3 has been posted', time: '2 hours ago', read: false },
    { id: 2, title: 'Course Update', message: 'New lecture added to Django course', time: '5 hours ago', read: false },
    { id: 3, title: 'Certificate Ready', message: 'React course certificate is now available', time: '1 day ago', read: true },
  ]

  const announcements = [
    { id: 1, from: 'Admin', message: 'New course enrollment period opens next week', date: '2025-03-10', type: 'broadcast' },
    { id: 2, from: 'Hassan Programmer 256', message: 'Live Q&A session this Friday at 4PM', date: '2025-03-08', type: 'unicast' },
  ]

  const subscriptions = [
    { tier: 'Silver', price: '49', features: ['Basic Python & JavaScript', 'HTML/CSS Fundamentals', '5 Live Sessions', 'Community Access'] },
    { tier: 'Gold', price: '99', features: ['Full Django & React', 'TypeScript Mastery', '15 Live Sessions', '1-on-1 Mentorship', 'Portfolio Projects'] },
    { tier: 'Platinum', price: '199', features: ['All Gold Features', 'Advanced System Design', 'DevOps & Deployment', 'Unlimited Live Sessions', 'Career Coaching'] },
  ]

  const handleDownloadCertificate = (course) => {
    toast.success(`📄 Certificate for "${course.title}" downloaded successfully!`)
  }

  const handlePrintCertificate = () => {
    toast.info('🖨️ Preparing certificate for printing...')
  }

  const handleSubscribe = (tier) => {
    setSelectedTier(tier)
    setShowPaymentModal(true)
  }

  const handlePayment = (method) => {
    toast.success(`✅ Payment of $${selectedTier === 'Silver' ? '49' : selectedTier === 'Gold' ? '99' : '199'} via ${method} successful!`)
    setShowPaymentModal(false)
  }

  return (
    <Layout role="student">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Enrolled Courses</p>
              <p className="text-2xl font-bold text-white">{enrolledCourses.length}</p>
            </div>
            <FaBook className="w-8 h-8 text-hassan-green opacity-50" />
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg Progress</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)}%
              </p>
            </div>
            <FaChartLine className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-white">
                {enrolledCourses.filter(c => c.status === 'Completed').length}
              </p>
            </div>
            <FaCheckCircle className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Overall Grade</p>
              <p className="text-2xl font-bold text-white">A-</p>
            </div>
            <FaStar className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-hassan-green/20 pb-4">
        {['dashboard', 'courses', 'progress', 'certificates', 'subscription'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-hassan-green text-black'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard View */}
      {activeTab === 'dashboard' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Recent Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.slice(0, 2).map((course) => (
              <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full" />
                      <span className="text-xs text-gray-400">{course.instructor}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    course.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{course.progress}% Complete</span>
                    <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-hassan-green rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-400">Grade: <span className="text-hassan-green font-bold">{course.grade}</span></span>
                  <button className="text-xs text-hassan-green hover:underline">View Details</button>
                </div>
              </div>
            ))}
          </div>

          {/* Notifications & Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FaBell className="text-hassan-green" />
                Recent Notifications
              </h3>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className={`p-2 rounded-lg ${notif.read ? 'bg-white/5' : 'bg-hassan-green/10 border border-hassan-green/20'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{notif.title}</span>
                      <span className="text-xs text-gray-500">{notif.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <FaBullhorn className="text-yellow-400" />
                Announcements
              </h3>
              <div className="space-y-2">
                {announcements.slice(0, 2).map((ann, i) => (
                  <div key={i} className="p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{ann.from}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        ann.type === 'broadcast' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {ann.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{ann.message}</p>
                    <span className="text-xs text-gray-600">{ann.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaVideo className="w-6 h-6 text-hassan-green mx-auto mb-1" />
              <span className="text-xs text-gray-400">Join Live Class</span>
            </button>
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaChalkboardTeacher className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">My Instructors</span>
            </button>
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaFileAlt className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">Transcripts</span>
            </button>
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaCreditCard className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">Subscription</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Courses View */}
      {activeTab === 'courses' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full" />
                      <span className="text-xs text-gray-400">{course.instructor}</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 bg-hassan-green/20 text-hassan-green border border-hassan-green/30 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{course.progress}% Complete</span>
                    <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-hassan-green rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium text-gray-400">Syllabus Progress:</p>
                  {course.syllabus.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      {course.completedLessons.includes(item) ? (
                        <FaCheckCircle className="text-hassan-green w-3 h-3" />
                      ) : (
                        <FaClock className="text-gray-500 w-3 h-3" />
                      )}
                      <span className={course.completedLessons.includes(item) ? 'text-gray-300' : 'text-gray-500'}>
                        {item}
                      </span>
                    </div>
                  ))}
                  {course.syllabus.length > 4 && (
                    <span className="text-xs text-gray-600">+{course.syllabus.length - 4} more lessons</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-hassan-green/10">
                  <span className="text-sm text-gray-400">Grade: <span className="text-hassan-green font-bold">{course.grade}</span></span>
                  <button className="text-xs text-hassan-green hover:underline">View Full Details</button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Progress & Transcripts View */}
      {activeTab === 'progress' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{course.title}</h3>
                  <p className="text-xs text-gray-400">Instructor: {course.instructor}</p>
                </div>
                <span className="text-sm font-bold text-hassan-green">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-hassan-green rounded-full transition-all" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>{course.lessonsCompleted} of {course.totalLessons} lessons completed</span>
                <span>Grade: <span className="text-hassan-green font-bold">{course.grade}</span></span>
              </div>
              {course.status === 'Completed' && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-sm text-green-400">Course Completed! Certificate available.</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Certificates View */}
      {activeTab === 'certificates' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.filter(c => c.status === 'Completed').map((course) => (
            <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-6 text-center">
              <div className="w-20 h-20 mx-auto bg-hassan-green/10 rounded-full flex items-center justify-center border-2 border-hassan-green">
                <FaGraduationCap className="w-10 h-10 text-hassan-green" />
              </div>
              <h3 className="text-white font-bold mt-4">{course.title}</h3>
              <p className="text-sm text-gray-400">Certificate of Completion</p>
              <p className="text-xs text-gray-500 mt-1">Grade: {course.grade}</p>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleDownloadCertificate(course)}
                  className="flex-1 py-2 bg-hassan-green text-black rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-hassan-green/20 transition flex items-center justify-center gap-2"
                >
                  <FaDownload className="w-4 h-4" />
                  Download
                </button>
                <button 
                  onClick={() => handlePrintCertificate(course)}
                  className="flex-1 py-2 bg-black/50 border border-hassan-green/30 text-hassan-green rounded-lg text-sm font-bold hover:bg-hassan-green/10 transition flex items-center justify-center gap-2"
                >
                  <FaPrint className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          ))}
          {enrolledCourses.filter(c => c.status === 'Completed').length === 0 && (
            <div className="col-span-2 text-center py-8 text-gray-400">
              <p>No certificates available yet. Complete your courses to earn certificates!</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Subscription View */}
      {activeTab === 'subscription' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Upgrade Your Learning</h2>
            <p className="text-gray-400">Choose the perfect plan for your journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.tier} className={`bg-black/60 backdrop-blur-sm border rounded-xl p-6 ${
                sub.tier === 'Gold' ? 'border-hassan-green shadow-lg shadow-hassan-green/20' : 'border-hassan-green/20'
              }`}>
                {sub.tier === 'Gold' && (
                  <div className="text-center mb-3">
                    <span className="px-3 py-1 bg-hassan-green text-black text-xs font-bold rounded-full">MOST POPULAR</span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white text-center">{sub.tier}</h3>
                <p className="text-3xl font-bold text-hassan-green text-center mt-2">${sub.price}<span className="text-sm text-gray-400">/mo</span></p>
                <ul className="mt-4 space-y-2">
                  {sub.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <FaCheckCircle className="text-hassan-green w-4 h-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleSubscribe(sub.tier)}
                  className={`w-full mt-4 py-2 rounded-lg font-bold transition ${
                    sub.tier === 'Gold' 
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
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/95 border border-hassan-green/30 rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Complete Payment</h3>
            <p className="text-gray-400 text-sm mb-4">Select your preferred payment method</p>
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
              onClick={() => setShowPaymentModal(false)}
              className="w-full mt-4 py-2 text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </Layout>
  )
}

export default StudentDashboard