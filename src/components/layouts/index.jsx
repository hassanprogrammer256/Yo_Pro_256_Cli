// DashboardLayout.jsx - Shared layout component for all dashboards
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaUser,
  FaBell,
  FaComment,
  FaBullhorn,
  FaBook,
  FaGraduationCap,
  FaCreditCard,
  FaCalendarAlt,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUsers,
  FaDollarSign,
  FaFileAlt,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { user_data } from '../../features/authSlice'

const Layout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const {user} = useSelector((state) => state.auth)

  const getNavItems = () => {
    const commonItems = [
      { path: `/${role}/profile`, label: 'Profile', icon: FaUser },
      { path: `/${role}/notifications`, label: 'Notifications', icon: FaBell },
      { path: `/${role}/announcements`, label: 'Announcements', icon: FaBullhorn },
    ]

    if (role === 'student') {
      return [
        { path: '/student/dashboard', label: 'Dashboard', icon: FaHome },
        ...commonItems,
        { path: '/student/courses', label: 'My Courses', icon: FaBook },
        { path: '/student/progress', label: 'Progress & Transcripts', icon: FaGraduationCap },
        { path: '/student/certificates', label: 'Certificates', icon: FaFileAlt },
        { path: '/student/subscription', label: 'Subscription', icon: FaCreditCard },
        { path: '/student/feedback', label: 'Feedback', icon: FaComment },
      ]
    }

    if (role === 'instructor') {
      return [
        { path: '/instructor/dashboard', label: 'Dashboard', icon: FaHome },
        ...commonItems,
        { path: '/instructor/courses', label: 'My Courses', icon: FaBook },
        { path: '/instructor/schedule', label: 'Lesson Scheduling', icon: FaCalendarAlt },
        { path: '/instructor/grading', label: 'Grading & Progress', icon: FaClipboardList },
        { path: '/instructor/feedback', label: 'Feedback', icon: FaComment },
      ]
    }

    if (role === 'admin') {
      return [
        { path: '/admin/dashboard', label: 'Dashboard', icon: FaHome },
        ...commonItems,
        { path: '/admin/analytics', label: 'Analytics', icon: FaChartBar },
        { path: '/admin/financial', label: 'Financial Reports', icon: FaDollarSign },
        { path: '/admin/users', label: 'Users Management', icon: FaUsers },
        { path: '/admin/courses', label: 'Course Management', icon: FaBook },
        { path: '/admin/announcements', label: 'Announcements', icon: FaBullhorn },
        { path: '/admin/feedback', label: 'Feedback', icon: FaComment },
      ]
    }

    return []
  }

  const navItems = getNavItems()
  const dispatch = useDispatch()




  useEffect(() => {
dispatch(user_data())

    // setMobileOpen(false)
  }, [])

// console.log({user})

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-hassan-gray/20 flex">
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: mobileOpen ? 0 : sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:relative z-50 w-72 h-full bg-black/95 backdrop-blur-xl border-r border-hassan-green/20 p-4 flex flex-col ${
          mobileOpen ? 'left-0' : sidebarOpen ? 'left-0' : '-left-72'
        } md:left-0`}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-hassan-green/20">
          <div className="flex items-center gap-2">
            <span className="text-hassan-green text-2xl font-bold">&gt;</span>
            <span className="text-white font-bold">HASSAN256</span>
            <span className="text-xs text-hassan-green hidden lg:inline">[{role.toUpperCase()}]</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-400 hover:text-hassan-green"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-hassan-green/20 text-hassan-green border border-hassan-green/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-6 bg-hassan-green rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        <div className="pt-4 border-t border-hassan-green/20 space-y-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition w-full">
            <FaCog className="w-5 h-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition w-full">
            <FaSignOutAlt className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-hassan-green/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-400 hover:text-hassan-green"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block text-gray-400 hover:text-hassan-green"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-white">
              {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to={`/${role}/notifications`} className="relative p-2 rounded-lg hover:bg-white/5 transition">
              <FaBell className="w-5 h-5 text-gray-400 hover:text-hassan-green" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Link>
            <div className="flex items-center gap-2">
              <img
                src="https://ui-avatars.com/api/?name=Hassan+Programmer&background=00ff88&color=000&size=40"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-hassan-green"
              />
              <span className="text-sm text-gray-300 hidden sm:inline">Hassan</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout