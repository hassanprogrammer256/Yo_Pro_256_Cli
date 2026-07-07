import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import {
  FaUserGraduate,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaClock,

} from 'react-icons/fa'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Typography } from '@mui/joy'
import { courses } from '../configs'
import EnrollmentModal from '../components/ui/enrollment_modal'
import CourseSearch from '../components/ui/course_search'

// Individual Course Card Component
const CourseCard = ({ course, index, onEnroll }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative bg-black/60 backdrop-blur-sm rounded-2xl border border-[#ff3030]/20 cursor-pointer overflow-hidden hover:border-[#ff3030]/50 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${course.bgColor} opacity-60`} />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-amber-600 text-white text-sm font-bold rounded-full">
            {course.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <course.icon className={`w-6 h-6 ${course.color}`} />
            <h3 className="text-lg font-bold text-white group-hover:text-hassan-green transition-colors">
              {course.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-3 p-2 bg-white/5 rounded-lg">
          <img
            src={course.instructor.avatar}
            alt={course.instructor.name}
            className="w-10 h-10 rounded-full border-2 border-hassan-green object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {course.instructor.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {course.instructor.title}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <MdOutlineVideoLibrary className="w-4 h-4 text-hassan-green" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaClock className="w-4 h-4 text-hassan-green" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaUsers className="w-4 h-4 text-hassan-green" />
            <span>{course.enrolled.toLocaleString()}</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onEnroll(course)}
          className="w-full py-2.5 bg-gradient-to-r from-red to-redGlow text-white font-bold rounded-lg text-sm hover:shadow-lg hover:shadow-hassan-green/20 transition-all flex items-center justify-center gap-2"
        >
          <FaUserGraduate className="w-4 h-4" />
          Enroll Now
        </motion.button>
      </div>
    </motion.div>
  )
}

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter courses based on search term only
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses
    
    return courses.filter(course => {
      const searchLower = searchTerm.toLowerCase()
      return course.name.toLowerCase().includes(searchLower) ||
             course.description.toLowerCase().includes(searchLower) ||
             course.instructor.name.toLowerCase().includes(searchLower)
    })
  }, [searchTerm])

  const handleEnroll = (course) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCourse(null)
  }

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-black to-hassan-gray/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Typography
            level="h1"
            sx={{
              background: 'linear-gradient(135deg, #ff0000, #ff6b6b, #ffb400)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            Available Courses
          </Typography>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Master web development with Python and React through structured, project-based learning
          </p>
          
          {/* Stats Bar */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BsFillPeopleFill className="text-hassan-green" />
              <span className="font-bold text-white">{courses.reduce((acc, c) => acc + c.enrolled, 0).toLocaleString()}</span>
              Students Enrolled
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaBookOpen className="text-hassan-green" />
              <span className="font-bold text-white">{courses.length}</span>
              Courses Available
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaStar className="text-gold" />
              <span className="font-bold text-white">{(courses.reduce((acc, c) => acc + c.rating, 0) / courses.length).toFixed(1)}</span>
              Average Rating
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <CourseSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} onEnroll={handleEnroll} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No courses found matching your search</p>
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedCourse={selectedCourse}
        allCourses={courses}
      />
    </section>
  )
}

export default Courses