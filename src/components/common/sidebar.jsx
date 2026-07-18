import {motion} from 'framer-motion'
import { FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SideBar = ({mobileOpen,sidebarOpen,setMobileOpen,user,navItems}) => {
  return (
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: mobileOpen ? 0 : sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className={`fixed  md:relative z-50 w-72 h-full bg-black/95 mt-20 backdrop-blur-xl border-r border-hassan-green/20 p-4 flex-col ${
          mobileOpen ? 'left-0' : sidebarOpen ? 'left-0' : '-left-72'
        } md:left-0`}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-hassan-green/20">
          <div className="flex items-center gap-2">
          
            <span className="text-white font-bold">{user?.first_name} {user?.last_name}</span>
          </div>
          <button
            onClick={setMobileOpen}
            className=" text-gray-400 hover:text-hassan-green"
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
                      ? 'bg-red/30 text-white border border-red'
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
  )
}

export default SideBar
