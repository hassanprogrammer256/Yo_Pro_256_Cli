// components/ProgressView.jsx
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

const ProgressView = ({ courses }) => {
  return (
    <motion.div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">{course.title}</h3>
              <p className="text-xs text-gray-400">Instructor: {course.instructor}</p>
            </div>
            <span className="text-sm font-bold text-hassan-green">{course.progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-hassan-green rounded-full transition-all" style={{ width: `${course.progress}%` }} />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>{course.lessonsCompleted} of {course.totalLessons} lessons completed</span>
            <span>Grade: <span className="text-hassan-green font-bold">{course.grade}</span></span>
          </div>
          {course.status === 'Completed' && (
            <div className="mt-3 flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <FaCheckCircle className="text-green-500" />
              <span className="text-sm text-green-400">Course Completed! Certificate available.</span>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

export default ProgressView