import { FaBook, FaChartLine, FaCheckCircle, FaStar } from 'react-icons/fa'

const StatsCards = ({ stats, enrolledCourses }) => {
  const completedCount = enrolledCourses.filter(c => c.status === 'Completed').length
  const avgProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Enrolled Courses</p>
            <p className="text-2xl font-bold text-white">{enrolledCourses.length}</p>
          </div>
          <FaBook className="w-8 h-8 text-hassan-green opacity-50" />
        </div>
      </div>
      
      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Avg Progress</p>
            <p className="text-2xl font-bold text-white">{stats.avgProgress}%</p>
          </div>
          <FaChartLine className="w-8 h-8 text-yellow-400 opacity-50" />
        </div>
      </div>
      
      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-white">{stats.completedCoursesblender}</p>
          </div>
          <FaCheckCircle className="w-8 h-8 text-green-500 opacity-50" />
        </div>
      </div>
      
      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Overall Grade</p>
            <p className="text-2xl font-bold text-white">{stats.overallGrade}</p>
          </div>
          <FaStar className="w-8 h-8 text-yellow-400 opacity-50" />
        </div>
      </div>
    </div>
  )
}

export default StatsCards