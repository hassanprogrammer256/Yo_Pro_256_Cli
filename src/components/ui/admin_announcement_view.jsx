// components/AdminAnnouncementsView.jsx
import { motion } from 'framer-motion'
import { FaBullhorn } from 'react-icons/fa'
import { useAppDispatch } from '../../hooks/useRedux'
import { toggleAnnouncementModal } from '../../store/slices/uiSlice'

const AdminAnnouncementsView = ({ announcements }) => {
  const dispatch = useAppDispatch()

  return (
    <motion.div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Announcements</h2>
        <button 
          onClick={() => dispatch(toggleAnnouncementModal(true))}
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
  )
}

export default AdminAnnouncementsView