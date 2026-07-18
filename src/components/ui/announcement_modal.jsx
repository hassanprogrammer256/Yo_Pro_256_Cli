// components/AnnouncementModal.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { toggleAnnouncementModal, updateAnnouncementData, resetAnnouncementData } from '../../store/slices/uiSlice'
import { createAnnouncement } from '../../store/slices/adminSlice'
import { toast } from 'react-toastify'

const AnnouncementModal = () => {
  const dispatch = useAppDispatch()
  const { showAnnouncementModal, announcementData } = useAppSelector((state) => state.ui)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createAnnouncement(announcementData)).unwrap()
      toast.success(`📢 Announcement sent to ${announcementData.recipients} recipients!`)
      dispatch(toggleAnnouncementModal(false))
      dispatch(resetAnnouncementData())
    } catch (error) {
      toast.error('Failed to send announcement')
    }
  }

  return (
    <AnimatePresence>
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/95 border border-hassan-green/30 rounded-2xl p-6 max-w-lg w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Create Announcement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Announcement Type</label>
                <select 
                  value={announcementData.type}
                  onChange={(e) => dispatch(updateAnnouncementData({ type: e.target.value }))}
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
                  onChange={(e) => dispatch(updateAnnouncementData({ recipients: e.target.value }))}
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
                  onChange={(e) => dispatch(updateAnnouncementData({ title: e.target.value }))}
                  className="w-full bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green"
                  placeholder="Announcement title"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Message</label>
                <textarea
                  value={announcementData.message}
                  onChange={(e) => dispatch(updateAnnouncementData({ message: e.target.value }))}
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
                  onChange={(e) => dispatch(updateAnnouncementData({ priority: e.target.value }))}
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
                  onClick={() => {
                    dispatch(toggleAnnouncementModal(false))
                    dispatch(resetAnnouncementData())
                  }}
                  className="flex-1 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AnnouncementModal