import { motion } from 'framer-motion'
import { FaCheckCircle, FaClock } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setSelectedCourse } from '../../features/uiSlice'
import { fetchCourseDetails } from '../../features/student/courseSlice'

const CoursesView = ({ courses }) => {
  const dispatch = useDispatch()

  const handleViewDetails = (courseId) => {
    dispatch(setSelectedCourse(courseId))
    dispatch(fetchCourseDetails(courseId))
  }

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl overflow-hidden">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-bold">{course.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <img src={course.instructorAvatar} alt={course.instructor} className="w-6 h-6 rounded-full" />
                  <span className="text-xs text-gray-400">{course.instructor}</span>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-hassan-green/20 text-hassan-green border border-hassan-green/30 rounded-full">
                {course.level}
              </span>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{course.progress}% Complete</span>
                <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-hassan-green rounded-full transition-all" style={{ width: `${course.progress}%` }} />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-xs font-medium text-gray-400">Syllabus Progress:</p>
              {course?.syllabus?.slice(0, 4)?.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {course.completedLessons.includes(item) ? (
                    <FaCheckCircle className="text-hassan-green w-3 h-3" />
                  ) : (
                    <FaClock className="text-gray-500 w-3 h-3" />
                  )}
                  <span className={course.completedLessons.includes(item) ? 'text-gray-300' : 'text-gray-500'}>
                    {item}
                  </span>
                </div>
              ))}
              {course?.syllabus?.length > 4 && (
                <span className="text-xs text-gray-600">+{course.syllabus.length - 4} more lessons</span>
              )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-hassan-green/10">
              <span className="text-sm text-gray-400">Grade: <span className="text-hassan-green font-bold">{course.grade}</span></span>
              <button 
                onClick={() => handleViewDetails(course.id)}
                className="text-xs text-hassan-green hover:underline"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default CoursesView