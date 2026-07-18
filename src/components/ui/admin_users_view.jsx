// components/AdminUsersView.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { useAppDispatch } from '../../hooks/useRedux'
import { updateUserStatus } from '../../store/slices/adminSlice'
import { toast } from 'react-toastify'

const AdminUsersView = ({ users }) => {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    try {
      await dispatch(updateUserStatus({ userId, status: newStatus })).unwrap()
      toast.success(`User status updated to ${newStatus}`)
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  return (
    <motion.div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Users Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border border-hassan-green/30 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-hassan-green text-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
          <button className="px-4 py-2 bg-hassan-green text-black rounded-lg text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-hassan-green/20 transition">
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
            {filteredUsers.map((user, i) => (
              <tr key={i} className="border-b border-hassan-green/10 hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=00ff88&color=000&size=32`} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full" 
                    />
                    <span className="text-sm text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{user.role}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleStatusToggle(user.id, user.status)}
                    className={`text-xs px-2 py-0.5 rounded-full transition ${
                      user.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{user.joined}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-hassan-green transition">
                      <FaEdit />
                    </button>
                    <button className="text-gray-400 hover:text-red-400 transition">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default AdminUsersView