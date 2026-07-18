// components/AdminDashboardView.jsx
import { Line, Bar } from 'react-chartjs-2'
import { motion } from 'framer-motion'

const AdminDashboardView = ({ stats, recentActivities, revenueData }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c0c0c0'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#c0c0c0' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#c0c0c0' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: revenueData?.monthly || [3200, 3800, 4500, 4200, 5100, 5800, 6200, 5900, 6500, 7200, 8100, 12500],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const enrollmentChartData = {
    labels: ['Python', 'Django', 'React', 'JavaScript', 'HTML/CSS', 'Tailwind', 'PostgreSQL', 'Docker'],
    datasets: [
      {
        label: 'Enrollments',
        data: [2847, 1956, 3124, 4231, 5678, 3456, 1234, 876],
        backgroundColor: [
          'rgba(0, 255, 136, 0.8)',
          'rgba(0, 255, 136, 0.7)',
          'rgba(0, 255, 136, 0.6)',
          'rgba(0, 255, 136, 0.5)',
          'rgba(0, 255, 136, 0.4)',
          'rgba(0, 255, 136, 0.3)',
          'rgba(0, 255, 136, 0.2)',
          'rgba(0, 255, 136, 0.1)',
        ],
        borderColor: '#00ff88',
        borderWidth: 1,
      }
    ]
  }

  const getActivityTypeColor = (type) => {
    const colors = {
      enrollment: 'bg-green-500/20 text-green-400',
      completion: 'bg-blue-500/20 text-blue-400',
      payment: 'bg-yellow-500/20 text-yellow-400',
      submission: 'bg-purple-500/20 text-purple-400'
    }
    return colors[type] || 'bg-gray-500/20 text-gray-400'
  }

  return (
    <motion.div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <h3 className="text-white font-bold mb-4">Revenue Trend</h3>
          <Line data={revenueChartData} options={chartOptions} />
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <h3 className="text-white font-bold mb-4">Course Enrollments</h3>
          <Bar data={enrollmentChartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <h3 className="text-white font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
              <div>
                <p className="text-sm text-white font-medium">{activity.user}</p>
                <p className="text-xs text-gray-400">{activity.action}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getActivityTypeColor(activity.type)}`}>
                  {activity.type}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboardView