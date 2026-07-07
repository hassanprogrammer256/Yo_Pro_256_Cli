// InstructorDashboard.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaBook, FaCalendarAlt, FaClipboardList, FaBell, 
  FaBullhorn, FaVideo, FaClock, 
 FaUsers, FaEdit, FaTrash
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import Layout from '../../components/layouts'

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showScheduleModal, setShowScheduleModal] = useState(false)
//   const [selectedCourse, setSelectedCourse] = useState(null)
  const [scheduleData, setScheduleData] = useState({
    course: '',
    title: '',
    date: '',
    time: '',
    duration: '',
    meetLink: '',
    description: ''
  })

  // Mock data
  const instructorCourses = [
    {
      id: 1,
      title: 'Python Programming Mastery',
      students: 47,
      progress: 78,
      syllabus: ['Python Basics', 'Data Structures', 'OOP', 'File I/O', 'Decorators', 'Web Scraping', 'Capstone'],
      completedSyllabus: ['Python Basics', 'Data Structures', 'OOP', 'File I/O']
    },
    {
      id: 2,
      title: 'Django Framework Pro',
      students: 32,
      progress: 45,
      syllabus: ['Django Basics', 'Views & Templates', 'Auth', 'REST API', 'Testing', 'Deployment', 'E-Commerce'],
      completedSyllabus: ['Django Basics', 'Views & Templates', 'Auth']
    },
  ]

  const scheduledLessons = [
    { id: 1, course: 'Python Programming Mastery', title: 'OOP in Python', date: '2025-03-15', time: '14:00', meetLink: 'https://meet.google.com/abc-def-ghi', students: 47 },
    { id: 2, course: 'Django Framework Pro', title: 'Django REST API', date: '2025-03-17', time: '16:00', meetLink: 'https://meet.google.com/jkl-mno-pqr', students: 32 },
  ]

  const studentSubmissions = [
    { id: 1, student: 'Alice Johnson', course: 'Python Programming Mastery', assignment: 'OOP Project', submitted: '2025-03-10', status: 'pending', grade: null },
    { id: 2, student: 'Bob Smith', course: 'Python Programming Mastery', assignment: 'OOP Project', submitted: '2025-03-09', status: 'graded', grade: 'A-' },
    { id: 3, student: 'Carol White', course: 'Django Framework Pro', assignment: 'Django Auth', submitted: '2025-03-08', status: 'pending', grade: null },
  ]

  const notifications = [
    { id: 1, title: 'Admin Announcement', message: 'New course materials available', time: '1 hour ago', read: false },
    { id: 2, title: 'Student Query', message: 'Alice Johnson asked about assignment deadline', time: '3 hours ago', read: false },
  ]

  const announcements = [
    { id: 1, from: 'Admin', message: 'Please submit final grades by end of month', date: '2025-03-10', type: 'broadcast' },
  ]

  const handleScheduleLesson = (e) => {
    e.preventDefault()
    toast.success(`✅ Lesson "${scheduleData.title}" scheduled for ${scheduleData.date} at ${scheduleData.time}`)
    setShowScheduleModal(false)
    setScheduleData({ course: '', title: '', date: '', time: '', duration: '', meetLink: '', description: '' })
  }

  const handleGradeSubmission = (submissionId, grade) => {
    toast.success(`📝 Grade ${grade} assigned to submission #${submissionId}`)
  }

//   const handleSendAnnouncement = (type, message) => {
//     toast.success(`📢 ${type} announcement sent successfully!`)
//   }

  return (
    <Layout role="instructor">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Courses</p>
              <p className="text-2xl font-bold text-white">{instructorCourses.length}</p>
            </div>
            <FaBook className="w-8 h-8 text-hassan-green opacity-50" />
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Students</p>
              <p className="text-2xl font-bold text-white">{instructorCourses.reduce((acc, c) => acc + c.students, 0)}</p>
            </div>
            <FaUsers className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Pending Grading</p>
              <p className="text-2xl font-bold text-white">{studentSubmissions.filter(s => s.status === 'pending').length}</p>
            </div>
            <FaClock className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Scheduled Lessons</p>
              <p className="text-2xl font-bold text-white">{scheduledLessons.length}</p>
            </div>
            <FaCalendarAlt className="w-8 h-8 text-purple-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-hassan-green/20 pb-4">
        {['dashboard', 'courses', 'schedule', 'grading'].map((tab) => (
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
            {instructorCourses.map((course) => (
              <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold">{course.title}</h3>
                    <p className="text-xs text-gray-400">{course.students} students enrolled</p>
                  </div>
                  <span className="text-xs text-hassan-green">{course.progress}% complete</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-hassan-green rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium text-gray-400">Syllabus Progress:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.syllabus.map((item, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${
                        course.completedSyllabus.includes(item)
                          ? 'bg-hassan-green/20 text-hassan-green border border-hassan-green/30'
                          : 'bg-white/5 text-gray-500'
                      }`}>
                        {item}
                      </span>
                    ))}
                  </div>
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
                {notifications.map((notif) => (
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
                {announcements.map((ann, i) => (
                  <div key={i} className="p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{ann.from}</span>
                      <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">broadcast</span>
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
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition"
            >
              <FaVideo className="w-6 h-6 text-hassan-green mx-auto mb-1" />
              <span className="text-xs text-gray-400">Schedule Lesson</span>
            </button>
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaClipboardList className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">Grade Submissions</span>
            </button>
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaUsers className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">Student Progress</span>
            </button>
            <button className="bg-black/60 border border-hassan-green/20 rounded-lg p-3 text-center hover:border-hassan-green/50 transition">
              <FaBullhorn className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <span className="text-xs text-gray-400">Make Announcement</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Schedule View */}
      {activeTab === 'schedule' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Scheduled Lessons</h2>
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 bg-hassan-green text-black rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-hassan-green/20 transition"
            >
              + Schedule New Lesson
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {scheduledLessons.map((lesson) => (
              <div key={lesson.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">{lesson.course}</p>
                  </div>
                  <span className="text-xs text-gray-500">{lesson.students} students</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    {lesson.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {lesson.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <a 
                    href={lesson.meetLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-hassan-green/20 text-hassan-green border border-hassan-green/30 rounded-lg text-xs font-medium hover:bg-hassan-green/30 transition"
                  >
                    <FaVideo className="inline mr-1" />
                    Join Google Meet
                  </a>
                  <button className="px-3 py-1 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-xs hover:bg-white/10 transition">
                    <FaEdit className="inline mr-1" />
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs hover:bg-red-500/20 transition">
                    <FaTrash className="inline mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grading View */}
      {activeTab === 'grading' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold text-white mb-4">Student Submissions</h2>
          <div className="space-y-4">
            {studentSubmissions.map((submission) => (
              <div key={submission.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{submission.student}</h3>
                      <span className="text-xs text-gray-500">{submission.course}</span>
                    </div>
                    <p className="text-sm text-gray-400">Assignment: {submission.assignment}</p>
                    <p className="text-xs text-gray-500">Submitted: {submission.submitted}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {submission.status.toUpperCase()}
                    </span>
                    {submission.grade && (
                      <p className="text-sm font-bold text-hassan-green mt-1">Grade: {submission.grade}</p>
                    )}
                  </div>
                </div>
                {submission.status === 'pending' && (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter grade (e.g., A, B+, C-)"
                      className="flex-1 bg-black/50 border border-hassan-green/30 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green"
                    />
                    <button 
                      onClick={() => handleGradeSubmission(submission.id, 'A')}
                      className="px-4 py-1.5 bg-hassan-green text-black rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-hassan-green/20 transition"
                    >
                      Submit Grade
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/95 border border-hassan-green/30 rounded-2xl p-6 max-w-lg w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Schedule New Lesson</h3>
            <form onSubmit={handleScheduleLesson} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Course</label>
                <select 
                  value={scheduleData.course}
                  onChange={(e) => setScheduleData({...scheduleData, course: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-hassan-green"
                  required
                >
                  <option value="">Select Course</option>
                  {instructorCourses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Lesson Title</label>
                <input
                  type="text"
                  value={scheduleData.title}
                  onChange={(e) => setScheduleData({...scheduleData, title: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green"
                  placeholder="e.g., Introduction to OOP"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduleData.date}
                    onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
                    className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-hassan-green"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Time</label>
                  <input
                    type="time"
                    value={scheduleData.time}
                    onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                    className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-hassan-green"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Duration (hours)</label>
                <input
                  type="number"
                  value={scheduleData.duration}
                  onChange={(e) => setScheduleData({...scheduleData, duration: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green"
                  placeholder="e.g., 1.5"
                  step="0.5"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Google Meet Link</label>
                <input
                  type="url"
                  value={scheduleData.meetLink}
                  onChange={(e) => setScheduleData({...scheduleData, meetLink: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Description</label>
                <textarea
                  value={scheduleData.description}
                  onChange={(e) => setScheduleData({...scheduleData, description: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green resize-none"
                  rows="2"
                  placeholder="What will be covered?"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-hassan-green text-black rounded-lg font-bold hover:shadow-lg hover:shadow-hassan-green/20 transition"
                >
                  Schedule Lesson
                </button>
                <button 
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </Layout>
  )
}

export default InstructorDashboard