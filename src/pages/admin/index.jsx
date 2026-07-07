// AdminDashboard.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaChartBar, FaUsers, FaBook, FaDollarSign, 
  FaBullhorn, 
  FaDownload, FaPrint, 
//   FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle,
  FaEdit, FaTrash, FaPlus, FaSearch,
  FaRegArrowAltCircleUp
} from 'react-icons/fa'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { toast } from 'react-toastify'
import Layout from '../../components/layouts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false)
  const [announcementData, setAnnouncementData] = useState({
    type: 'broadcast',
    recipients: 'all',
    title: '',
    message: '',
    priority: 'normal'
  })

  // Mock statistics
  const stats = {
    totalUsers: 2847,
    totalStudents: 2678,
    totalInstructors: 169,
    totalCourses: 12,
    totalRevenue: 45290,
    monthlyRevenue: 12500,
    activeUsers: 342,
    completionRate: 68,
    averageRating: 4.7,
    pendingPayments: 23
  }

  // Chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [3200, 3800, 4500, 4200, 5100, 5800, 6200, 5900, 6500, 7200, 8100, 12500],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const enrollmentData = {
    labels: ['Python', 'Django', 'React', 'JavaScript', 'HTML/CSS', 'Tailwind', 'PostgreSQL', 'Docker'],
    datasets: [
      {
        label: 'Enrollments',
        data: [2847, 1956, 3124, 4231, 5678, 3456, 1234, 876],
        backgroundColor: [
          'rgba(0, 255, 136, 0.8)',
          'rgba(0, 255, 136, 0.7)',
          'rgba(0, 255, 136, 0.6)',
          'rgba(0, 255, 136, 0.5)',
          'rgba(0, 255, 136, 0.4)',
          'rgba(0, 255, 136, 0.3)',
          'rgba(0, 255, 136, 0.2)',
          'rgba(0, 255, 136, 0.1)',
        ],
        borderColor: '#00ff88',
        borderWidth: 1,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c0c0c0'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#c0c0c0'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      },
      y: {
        ticks: {
          color: '#c0c0c0'
        },
        grid: {
          color: 'rgba(255,255,255,0.05)'
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c0c0c0'
        }
      }
    }
  }

  // Mock recent activities
  const recentActivities = [
    { id: 1, user: 'Alice Johnson', action: 'Enrolled in React course', time: '5 minutes ago', type: 'enrollment' },
    { id: 2, user: 'Bob Smith', action: 'Completed Python course', time: '15 minutes ago', type: 'completion' },
    { id: 3, user: 'Carol White', action: 'Made payment of $99', time: '1 hour ago', type: 'payment' },
    { id: 4, user: 'David Brown', action: 'Submitted assignment', time: '2 hours ago', type: 'submission' },
  ]

  // Mock announcements
  const announcements = [
    { id: 1, title: 'New Course Launch', message: 'Docker & DevOps course now available', date: '2025-03-10', status: 'active' },
    { id: 2, title: 'System Maintenance', message: 'Server maintenance on March 15th', date: '2025-03-08', status: 'pending' },
  ]

  const handleSendAnnouncement = (e) => {
    e.preventDefault()
    toast.success(`📢 Announcement sent to ${announcementData.recipients} recipients!`)
    setShowAnnouncementModal(false)
  }

  return (
    <Layout role="admin">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <FaUsers className="w-8 h-8 text-hassan-green opacity-50" />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <FaRegArrowAltCircleUp className="text-green-500 w-3 h-3" />
            <span className="text-xs text-green-500">+12%</span>
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <FaDollarSign className="w-8 h-8 text-green-400 opacity-50" />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <FaRegArrowAltCircleUp className="text-green-500 w-3 h-3" />
            <span className="text-xs text-green-500">+23%</span>
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Courses</p>
              <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
            </div>
            <FaBook className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <FaRegArrowAltCircleUp className="text-green-500 w-3 h-3" />
            <span className="text-xs text-green-500">+2 new</span>
          </div>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-white">{stats.averageRating}</p>
            </div>
            <FaChartBar className="w-8 h-8 text-yellow-400 opacity-50" />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <FaRegArrowAltCircleUp className="text-green-500 w-3 h-3" />
            <span className="text-xs text-green-500">+0.3</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-hassan-green/20 pb-4">
        {['dashboard', 'analytics', 'financial', 'users', 'courses', 'announcements', 'feedback'].map((tab) => (
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
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-4">Revenue Trend</h3>
              <Line data={revenueData} options={chartOptions} />
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-4">Course Enrollments</h3>
              <Bar data={enrollmentData} options={chartOptions} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
            <h3 className="text-white font-bold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-sm text-white font-medium">{activity.user}</p>
                    <p className="text-xs text-gray-400">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activity.type === 'enrollment' ? 'bg-green-500/20 text-green-400' :
                      activity.type === 'completion' ? 'bg-blue-500/20 text-blue-400' :
                      activity.type === 'payment' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {activity.type}
                    </span>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-white">{stats.completionRate}%</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Pending Payments</p>
              <p className="text-2xl font-bold text-white">{stats.pendingPayments}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Monthly Growth</p>
              <p className="text-2xl font-bold text-green-500">+18%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-4">User Distribution</h3>
              <Doughnut 
                data={{
                  labels: ['Students', 'Instructors', 'Admins'],
                  datasets: [{
                    data: [stats.totalStudents, stats.totalInstructors, 5],
                    backgroundColor: ['#00ff88', '#ffb400', '#ff6b6b'],
                    borderColor: ['#00ff88', '#ffb400', '#ff6b6b'],
                    borderWidth: 2,
                  }]
                }}
                options={doughnutOptions}
              />
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <h3 className="text-white font-bold mb-4">Revenue Breakdown</h3>
              <Doughnut 
                data={{
                  labels: ['Silver', 'Gold', 'Platinum'],
                  datasets: [{
                    data: [12000, 25000, 8290],
                    backgroundColor: ['#c0c0c0', '#ffb400', '#00ff88'],
                    borderColor: ['#c0c0c0', '#ffb400', '#00ff88'],
                    borderWidth: 2,
                  }]
                }}
                options={doughnutOptions}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Financial Reports */}
      {activeTab === 'financial' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Financial Reports</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-hassan-green/20 text-hassan-green border border-hassan-green/30 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-hassan-green/30 transition">
                <FaDownload className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition">
                <FaPrint className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
            <h3 className="text-white font-bold mb-4">Monthly Revenue</h3>
            <Line data={revenueData} options={chartOptions} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">${stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
              <p className="text-xs text-gray-500">Average Transaction</p>
              <p className="text-2xl font-bold text-white">$76</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Users Management */}
      {activeTab === 'users' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Users Management</h2>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
              <button className="px-4 py-2 bg-hassan-green text-black rounded-lg text-sm font-bold flex items-center gap-2">
                <FaPlus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-hassan-green/20">
                <tr className="text-left text-xs text-gray-500">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Hassan Programmer', role: 'Admin', status: 'active', joined: '2024-01-15' },
                  { name: 'Alice Johnson', role: 'Student', status: 'active', joined: '2025-02-10' },
                  { name: 'Bob Smith', role: 'Student', status: 'inactive', joined: '2024-12-01' },
                  { name: 'Carol White', role: 'Instructor', status: 'active', joined: '2025-01-20' },
                ].map((user, i) => (
                  <tr key={i} className="border-b border-hassan-green/10 hover:bg-white/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=00ff88&color=000&size=32`} alt={user.name} className="w-8 h-8 rounded-full" />
                        <span className="text-sm text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{user.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-hassan-green transition"><FaEdit /></button>
                        <button className="text-gray-400 hover:text-red-400 transition"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Announcements */}
      {activeTab === 'announcements' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Announcements</h2>
            <button 
              onClick={() => setShowAnnouncementModal(true)}
              className="px-4 py-2 bg-hassan-green text-black rounded-lg text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-hassan-green/20 transition"
            >
              <FaBullhorn className="w-4 h-4" />
              New Announcement
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-bold">{ann.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{ann.message}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    ann.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {ann.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{ann.date}</span>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-hassan-green transition text-xs">Edit</button>
                    <button className="text-gray-400 hover:text-red-400 transition text-xs">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black/95 border border-hassan-green/30 rounded-2xl p-6 max-w-lg w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Create Announcement</h3>
            <form onSubmit={handleSendAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Announcement Type</label>
                <select 
                  value={announcementData.type}
                  onChange={(e) => setAnnouncementData({...announcementData, type: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-hassan-green"
                >
                  <option value="broadcast">Broadcast (All Users)</option>
                  <option value="unicast">Unicast (Specific Users)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Recipients</label>
                <select 
                  value={announcementData.recipients}
                  onChange={(e) => setAnnouncementData({...announcementData, recipients: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-hassan-green"
                >
                  <option value="all">All Users</option>
                  <option value="students">All Students</option>
                  <option value="instructors">All Instructors</option>
                  <option value="specific">Specific Users</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={announcementData.title}
                  onChange={(e) => setAnnouncementData({...announcementData, title: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green"
                  placeholder="Announcement title"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Message</label>
                <textarea
                  value={announcementData.message}
                  onChange={(e) => setAnnouncementData({...announcementData, message: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green resize-none"
                  rows="3"
                  placeholder="Your announcement message..."
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Priority</label>
                <select 
                  value={announcementData.priority}
                  onChange={(e) => setAnnouncementData({...announcementData, priority: e.target.value})}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-hassan-green"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-hassan-green text-black rounded-lg font-bold hover:shadow-lg hover:shadow-hassan-green/20 transition"
                >
                  Send Announcement
                </button>
                <button 
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
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

export default AdminDashboard