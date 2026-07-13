import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import {
  FaUserGraduate,
  FaBookOpen,
  FaUsers,
  FaStar,
  FaClock,
  FaBinoculars,

} from 'react-icons/fa'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Typography } from '@mui/joy'
import EnrollmentModal from '../components/ui/enrollment_modal'
import CourseSearch from '../components/ui/course_search'
import {useDispatch, useSelector} from "react-redux"
import { all_courses, clearSearchTerm, setSearchTerm } from '../features/courseSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




const CourseCard = ({ course, index, onEnroll }) => {
  const navigate = useNavigate()
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
          alt={course.title}
         
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 opacity-60`} />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-amber-600 text-white text-sm font-bold rounded-full">
            UGX: {course.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <FaBookOpen className={`w-6 h-6`} />
            <h3 className="text-lg font-bold text-white group-hover:text-hassan-green transition-colors capitalize">
              {course.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-3 line-clamp-2 capitalize">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-3 mb-3 p-2 bg-white/5 rounded-lg">
          <img
            src={course.instructor?.profile_pic}
            alt={course.instructor?.full_name}
            className="w-10 h-10 rounded-full border-2 border-hassan-green object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate capitalize">
              {course?.instructor?.full_name}
            </p>
            <p className="text-xs text-yellow-500 truncate capitalize">
             {course?.instructor?.title}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <MdOutlineVideoLibrary className="w-4 h-4 text-hassan-green" />
            <span>{course?.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaClock className="w-4 h-4 text-hassan-green" />
            <span>{course?.duration} hours</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FaUsers className="w-4 h-4 text-hassan-green" />
            <span>{course?.enrollments?.toLocaleString()} Students</span>
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {navigate(`/course/${course?.id}`)}}
          className="w-full py-2.5 mt-2 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-bold rounded-lg text-sm hover:shadow-lg hover:shadow-hassan-green/20 transition-all flex items-center justify-center gap-2"
        >
          <FaBinoculars className="w-4 h-4" />
          View More
        </motion.button>
      </div>
    </motion.div>
  )
}

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { courses, loading, error, searchTerm } = useSelector(
    (state) => state.courses
    
  );
const dispatch = useDispatch()
const {access} = useSelector((state) => state.auth)
const navigate = useNavigate()


 const fetchCourses = async () => {
    try {
      const result = await dispatch(all_courses()).unwrap();
      return result;
    } catch (error) {
      console.error("Course Data Error:", error);
      toast.error(error || "Failed to fetch courses data");
      return null;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []); 

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
  };
  const ClearSearchTerm = () => {
    dispatch(clearSearchTerm());
  };

  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    const searchLower = searchTerm.toLowerCase();
    return courses.filter((course) => {
      return (
        course.name?.toLowerCase().includes(searchLower) ||
        course.description?.toLowerCase().includes(searchLower) ||
        course.instructor?.name?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, courses]);

  useEffect(() => {
    // You can optionally dispatch an action to save filtered courses
    // Or just use the computed value directly in the component
  }, [filteredCourses]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="spinner-border animate-spin w-12 h-12 border-4 border-t-red rounded-full"></div>
    
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-lg">Error loading courses</p>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => fetchCourses()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // No courses state
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">No courses available</p>
      </div>
    );
  }

  const handleEnroll = (course) => {
    if (access != null){
  setSelectedCourse(course)
setIsModalOpen(true)
return;
    }else{
      navigate('/auth')
      toast.error("Please Login First to Enroll")
      return;
    }
  
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
              <span className="font-bold text-white">{courses.reduce((acc, c) => acc + c.enrollments, 0).toLocaleString()}</span>
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
        <CourseSearch searchTerm={searchTerm} setSearchTerm={handleSearchChange } clearSearchTerm={ClearSearchTerm} />

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