// components/CourseSearch.jsx
import { motion } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'

const CourseSearch = ({ searchTerm, setSearchTerm,clearSearchTerm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search courses by name, description, or instructor..."
          value={searchTerm}
          onChange={setSearchTerm}
          className="w-full px-4 py-3 pl-12 pr-12 bg-black/60 border border-[#ff3030]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#ff3030]/50 transition-colors"
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        
        {searchTerm !== "" && (
          <button
            onClick={clearSearchTerm}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default CourseSearch