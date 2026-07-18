// AdminDashboard.jsx
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { setAdminActiveTab } from '../../store/slices/uiSlice'
import { fetchAdminStats, fetchRecentActivities, fetchAdminAnnouncements } from '../../store/slices/adminSlice'
import Layout from '../../components/layouts'
import AdminStatsCards from './components/AdminStatsCards'
import AdminTabNavigation from './components/AdminTabNavigation'
import AdminDashboardView from './components/AdminDashboardView'
import AdminAnalyticsView from './components/AdminAnalyticsView'
import AdminFinancialView from './components/AdminFinancialView'
import AdminUsersView from './components/AdminUsersView'
import AdminAnnouncementsView from './components/AdminAnnouncementsView'
import AnnouncementModal from './components/AnnouncementModal'
import { useAdminData } from '../../hooks/useAdminData'
import { useEffect } from 'react'

const AdminDashboard = () => {
  const dispatch = useAppDispatch()
  const { adminActiveTab } = useAppSelector((state) => state.ui)
  const { stats, recentActivities, announcements, users, revenueData, loading } = useAdminData()

  useEffect(() => {
    dispatch(fetchAdminStats())
    dispatch(fetchRecentActivities())
    dispatch(fetchAdminAnnouncements())
  }, [dispatch])

  if (loading) {
    return (
      <Layout role="admin">
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
    <Layout role="admin">
      <AdminStatsCards stats={stats} />
      <AdminTabNavigation 
        activeTab={adminActiveTab} 
        onTabChange={(tab) => dispatch(setAdminActiveTab(tab))} 
      />
      
      <motion.div
        key={adminActiveTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {adminActiveTab === 'dashboard' && (
          <AdminDashboardView 
            stats={stats}
            recentActivities={recentActivities}
            revenueData={revenueData}
          />
        )}
        {adminActiveTab === 'analytics' && (
          <AdminAnalyticsView stats={stats} />
        )}
        {adminActiveTab === 'financial' && (
          <AdminFinancialView stats={stats} revenueData={revenueData} />
        )}
        {adminActiveTab === 'users' && (
          <AdminUsersView users={users} />
        )}
        {adminActiveTab === 'announcements' && (
          <AdminAnnouncementsView announcements={announcements} />
        )}
        {adminActiveTab === 'feedback' && (
          <div className="text-center py-8 text-gray-400">
            <p>Feedback management coming soon...</p>
          </div>
        )}
      </motion.div>

      <AnnouncementModal />
    </Layout>
  )
}

export default AdminDashboard