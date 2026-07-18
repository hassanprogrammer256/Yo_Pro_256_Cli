// components/CertificatesView.jsx
import { motion } from 'framer-motion'
import { FaGraduationCap, FaDownload, FaPrint } from 'react-icons/fa'
import { toast } from 'react-toastify'

const CertificatesView = ({ courses }) => {
  const completedCourses = courses.filter(c => c.status === 'Completed')

  const handleDownloadCertificate = (course) => {
    // API call to download certificate
    toast.success(`📄 Certificate for "${course.title}" downloaded successfully!`)
  }

  const handlePrintCertificate = (course) => {
    toast.info('🖨️ Preparing certificate for printing...')
  }

  if (completedCourses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>No certificates available yet. Complete your courses to earn certificates!</p>
      </div>
    )
  }

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {completedCourses.map((course) => (
        <div key={course.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-6 text-center">
          <div className="w-20 h-20 mx-auto bg-hassan-green/10 rounded-full flex items-center justify-center border-2 border-hassan-green">
            <FaGraduationCap className="w-10 h-10 text-hassan-green" />
          </div>
          <h3 className="text-white font-bold mt-4">{course.title}</h3>
          <p className="text-sm text-gray-400">Certificate of Completion</p>
          <p className="text-xs text-gray-500 mt-1">Grade: {course.grade}</p>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => handleDownloadCertificate(course)}
              className="flex-1 py-2 bg-hassan-green text-black rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-hassan-green/20 transition flex items-center justify-center gap-2"
            >
              <FaDownload className="w-4 h-4" />
              Download
            </button>
            <button 
              onClick={() => handlePrintCertificate(course)}
              className="flex-1 py-2 bg-black/50 border border-hassan-green/30 text-hassan-green rounded-lg text-sm font-bold hover:bg-hassan-green/10 transition flex items-center justify-center gap-2"
            >
              <FaPrint className="w-4 h-4" />
              Print
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default CertificatesView