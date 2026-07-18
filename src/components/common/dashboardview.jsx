// components/DashboardView.jsx
import { motion } from 'framer-motion'
import { FaBell, FaBullhorn, FaChevronRight } from 'react-icons/fa'

const DashboardView = ({ enrolledCourses, notifications, announcements }) => {
  const recentCourses = enrolledCourses.slice(0, 3)
  const unreadNotifications = notifications.filter(n => !n.read)

  return (
    <div className="space-y-6 mt-20">
      {/* Recent Courses */}
      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <h3 className="text-white font-bold mb-3">Continue Learning</h3>
        <div className="space-y-3">
          {recentCourses.map((course) => (
            <div key={course.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">{course.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-hassan-green rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-xs text-gray-400">{course.progress}%</span>
                </div>
              </div>
              <button className="text-hassan-green hover:underline text-sm">
                Resume <FaChevronRight className="inline w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications & Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Notifications */}
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <FaBell className="text-yellow-400" />
            <h3 className="text-white font-bold">Notifications</h3>
            {unreadNotifications.length > 0 && (
              <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                {unreadNotifications.length} new
              </span>
            )}
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className={`p-2 rounded-lg ${notif.read ? 'bg-white/5' : 'bg-hassan-green/10 border-l-2 border-hassan-green'}`}>
                <p className="text-sm text-white">{notif.title}</p>
                <p className="text-xs text-gray-400">{notif.message}</p>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <FaBullhorn className="text-hassan-green" />
            <h3 className="text-white font-bold">Announcements</h3>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {announcements.slice(0, 3).map((ann) => (
              <div key={ann.id} className="p-2 bg-white/5 rounded-lg">
                <p className="text-sm text-white">{ann.message}</p>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">From: {ann.from}</span>
                  <span className="text-xs text-gray-500">{ann.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView