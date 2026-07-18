import {motion} from 'framer-motion'
import { FaBell, FaBullhorn, FaChalkboardTeacher, FaCreditCard, FaFileAlt, FaVideo } from 'react-icons/fa'

const StudentDashboard = () => {
  return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses?.slice(0, 2).map((course) => (
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
  )
}

export default StudentDashboard
