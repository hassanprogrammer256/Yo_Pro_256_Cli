import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchStudentDashboardStats } from '../features/student/dashboardSlice'
import { fetchEnrolledCourses } from '../features/student/courseSlice'
import { fetchAnnouncements, fetchNotifications } from '../features/notifications'
import { fetchSubscriptions } from '../features/student/subscriptionSlice'


export const useDashboardData = () => {
  const dispatch = useDispatch()
  const { stats, loading: statsLoading } = useSelector((state) => state.studentDashboard)
  const { enrolledCourses, loading: coursesLoading } = useSelector((state) => state.studentCourse)
  const { notifications, announcements, loading: notifLoading } = useSelector((state) => state.notifications)
  const { plans, loading: subsLoading } = useSelector((state) => state.studentSubscription)

  useEffect(() => {
    dispatch(fetchStudentDashboardStats())
    dispatch(fetchEnrolledCourses())
    dispatch(fetchNotifications())
    dispatch(fetchAnnouncements())
    dispatch(fetchSubscriptions())
  }, [dispatch])

  return {
    stats,
    enrolledCourses,
    notifications,
    announcements,
    plans,
    loading: statsLoading || coursesLoading || notifLoading || subsLoading,
  }
}