import { motion } from 'framer-motion'
import {useDispatch, useSelector} from "react-redux"
import { useDashboardData } from '../../hooks'
import Layout from '../../components/layouts'
import StatsCards from '../../components/ui/stats_card'
import TabNavigation from '../../components/ui/tabs_navigation'
import { setStudentActiveTab } from '../../features/uiSlice'
import DashboardView from '../../components/common/dashboardview'
import CoursesView from '../../components/ui/courses_view'
import ProgressView from '../../components/ui/progress_view'
import CertificatesView from '../../components/ui/certificates_view'
import SubscriptionView from '../../components/ui/subscription_view'
import PaymentModal from '../../components/ui/payment_modal'

const StudentDashboard = () => {
  const dispatch = useDispatch()
  const { studentActiveTab } = useSelector((state) => state.ui)
  const { stats, enrolledCourses, notifications, announcements, plans, loading } = useDashboardData()

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-hassan-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <StatsCards stats={stats} enrolledCourses={enrolledCourses} />
      <TabNavigation studentActiveTab={studentActiveTab} onTabChange={(tab) => dispatch(setStudentActiveTab(tab))} />
      
      <motion.div
        key={studentActiveTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {studentActiveTab === 'dashboard' && (
          <DashboardView 
            enrolledCourses={enrolledCourses} 
            notifications={notifications}
            announcements={announcements}
          />
        )}
        {studentActiveTab === 'courses' && <CoursesView courses={enrolledCourses} />}
        {studentActiveTab === 'progress' && <ProgressView courses={enrolledCourses} />}
        {studentActiveTab === 'certificates' && <CertificatesView courses={enrolledCourses} />}
      </motion.div>

      <PaymentModal />
    </Layout>
  )
}

export default StudentDashboard